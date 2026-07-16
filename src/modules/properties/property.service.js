import Property from "./property.model.js";
import { AppError } from "../../middleware/errorHandler.js";
import { deleteFromLocal, getImageUrl } from "../../middleware/upload.js";

// Get all properties with filtering, pagination, and search
export const getAllProperties = async (queryParams) => {
  const {
    page = 1,
    limit = 12,
    search,
    country,
    city,
    propertyType,
    status = "available",
    minPrice,
    maxPrice,
    bedrooms,
    bathrooms,
    minArea,
    maxArea,
    buildYear,
    features,
    isFeatured,
    sortBy = "createdAt",
    sortOrder = "desc",
    latitude,
    longitude,
    radius = 10000, // 10km default
  } = queryParams;

  // Build filter object
  const filter = { isActive: true };

  if (status && status !== "all") {
    filter.status = status;
  }

  if (country) {
    filter["location.country"] = new RegExp(country, "i");
  }

  if (city) {
    filter["location.city"] = new RegExp(city, "i");
  }

  if (propertyType) {
    filter.propertyType = propertyType;
  }

  // Price filtering
  if (minPrice || maxPrice) {
    filter["price.amount"] = {};
    if (minPrice) filter["price.amount"].$gte = parseFloat(minPrice);
    if (maxPrice) filter["price.amount"].$lte = parseFloat(maxPrice);
  }

  // Property details filtering
  if (bedrooms) {
    filter["details.bedrooms"] = parseInt(bedrooms);
  }

  if (bathrooms) {
    filter["details.bathrooms"] = { $gte: parseFloat(bathrooms) };
  }

  if (minArea || maxArea) {
    filter["details.area.value"] = {};
    if (minArea) filter["details.area.value"].$gte = parseFloat(minArea);
    if (maxArea) filter["details.area.value"].$lte = parseFloat(maxArea);
  }

  if (buildYear) {
    filter["details.buildYear"] = parseInt(buildYear);
  }

  if (features && features.length > 0) {
    const featuresArray = Array.isArray(features) ? features : [features];
    filter.features = { $in: featuresArray };
  }

  if (isFeatured !== undefined) {
    filter.isFeatured = isFeatured === "true";
  }

  // Text search
  if (search) {
    filter.$text = { $search: search };
  }

  // Geospatial search
  if (latitude && longitude) {
    filter["location.coordinates"] = {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [parseFloat(longitude), parseFloat(latitude)],
        },
        $maxDistance: parseInt(radius),
      },
    };
  }

  // Calculate pagination
  const skip = (parseInt(page) - 1) * parseInt(limit);

  // Build sort object
  const sort = {};
  if (search && !sortBy) {
    sort.score = { $meta: "textScore" };
  } else {
    sort[sortBy] = sortOrder === "desc" ? -1 : 1;
  }

  try {
    // Execute query with aggregation for better performance
    const [properties, totalCount] = await Promise.all([
      Property.find(filter)
        .populate("owner", "name email")
        .populate("agent", "name email")
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit)),
      Property.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalCount / parseInt(limit));

    return {
      properties,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalCount,
        hasNextPage: parseInt(page) < totalPages,
        hasPrevPage: parseInt(page) > 1,
      },
    };
  } catch (error) {
    throw new AppError("Failed to fetch properties", 500);
  }
};

// Get property by ID
export const getPropertyById = async (propertyId, incrementView = false) => {
  try {
    const property = await Property.findOne({
      _id: propertyId,
      isActive: true,
    })
      .populate("owner", "name email role")
      .populate("agent", "name email role");

    if (!property) {
      throw new AppError("Property not found", 404);
    }

    // Increment views if requested
    if (incrementView) {
      await property.incrementViews();
    }

    return property;
  } catch (error) {
    if (error.name === "CastError") {
      throw new AppError("Invalid property ID", 400);
    }
    throw error;
  }
};

// Create new property
export const createProperty = async (propertyData, ownerId, files = [], imageUrls = []) => {
  try {
    // Process uploaded images
    const uploadedImages = files.map((file) => ({
      url: getImageUrl(file.filename),
      filename: file.filename,
      originalName: file.originalname,
      alt: `${propertyData.name} image`,
      isPrimary: false,
    }));

    // Process URL-based images
    const urlImages = imageUrls.map((imageUrl) => ({
      url: imageUrl,
      filename: "",
      originalName: "",
      alt: `${propertyData.name} image`,
      isPrimary: false,
    }));

    const images = [...uploadedImages, ...urlImages];

    // Set first image as primary
    if (images.length > 0) {
      images[0].isPrimary = true;
    }

    const property = new Property({
      ...propertyData,
      owner: ownerId,
      images,
    });

    await property.save();

    // Populate owner and agent data
    await property.populate("owner", "name email");
    if (property.agent) {
      await property.populate("agent", "name email");
    }

    return property;
  } catch (error) {
    // Clean up uploaded images if property creation fails
    if (files && files.length > 0) {
      await Promise.allSettled(
        files.map((file) => deleteFromLocal(file.filename))
      );
    }
    throw error;
  }
};

// Update property
export const updateProperty = async (
  propertyId,
  updateData,
  userId,
  userRole
) => {
  try {
    const property = await Property.findOne({
      _id: propertyId,
      isActive: true,
    });

    if (!property) {
      throw new AppError("Property not found", 404);
    }

    // Check authorization
    const isOwner = property.owner.toString() === userId;
    const isAgent = property.agent && property.agent.toString() === userId;
    const isAdmin = userRole === "admin";

    if (!isOwner && !isAgent && !isAdmin) {
      throw new AppError("Not authorized to update this property", 403);
    }

    // Update property
    Object.assign(property, updateData);
    await property.save();

    await property.populate("owner", "name email");
    if (property.agent) {
      await property.populate("agent", "name email");
    }

    return property;
  } catch (error) {
    if (error.name === "CastError") {
      throw new AppError("Invalid property ID", 400);
    }
    throw error;
  }
};

// Delete property (soft delete)
export const deleteProperty = async (propertyId, userId, userRole) => {
  try {
    const property = await Property.findOne({
      _id: propertyId,
      isActive: true,
    });

    if (!property) {
      throw new AppError("Property not found", 404);
    }

    // Check authorization
    const isOwner = property.owner.toString() === userId;
    const isAdmin = userRole === "admin";

    if (!isOwner && !isAdmin) {
      throw new AppError("Not authorized to delete this property", 403);
    }

    property.isActive = false;
    await property.save();

    return { message: "Property deleted successfully" };
  } catch (error) {
    if (error.name === "CastError") {
      throw new AppError("Invalid property ID", 400);
    }
    throw error;
  }
};

// Permanently delete property
export const permanentlyDeleteProperty = async (
  propertyId,
  userId,
  userRole
) => {
  try {
    const property = await Property.findById(propertyId);

    if (!property) {
      throw new AppError("Property not found", 404);
    }

    // Check authorization (admin only for permanent delete)
    if (userRole !== "admin") {
      throw new AppError(
        "Not authorized to permanently delete properties",
        403
      );
    }

    // Delete images from local storage (skip URL-based images)
    if (property.images && property.images.length > 0) {
      await Promise.allSettled(
        property.images
          .filter((image) => image.filename)
          .map((image) => deleteFromLocal(image.filename))
      );
    }

    await Property.findByIdAndDelete(propertyId);

    return { message: "Property permanently deleted successfully" };
  } catch (error) {
    if (error.name === "CastError") {
      throw new AppError("Invalid property ID", 400);
    }
    throw error;
  }
};

// Add images to property
export const addPropertyImages = async (
  propertyId,
  userId,
  userRole,
  files = [],
  imageUrls = []
) => {
  try {
    const property = await Property.findOne({
      _id: propertyId,
      isActive: true,
    });

    if (!property) {
      throw new AppError("Property not found", 404);
    }

    // Check authorization
    const isOwner = property.owner.toString() === userId;
    const isAgent = property.agent && property.agent.toString() === userId;
    const isAdmin = userRole === "admin";

    if (!isOwner && !isAgent && !isAdmin) {
      throw new AppError("Not authorized to modify this property", 403);
    }

    // Check image limit
    if (property.images.length + files.length + imageUrls.length > 10) {
      throw new AppError("Maximum 10 images allowed per property", 400);
    }

    // Process uploaded images
    const uploadedImages = files.map((file) => ({
      url: getImageUrl(file.filename),
      filename: file.filename,
      originalName: file.originalname,
      alt: `${property.name} image`,
      isPrimary: false,
    }));

    // Process URL-based images
    const urlImages = imageUrls.map((imageUrl) => ({
      url: imageUrl,
      filename: "",
      originalName: "",
      alt: `${property.name} image`,
      isPrimary: false,
    }));

    property.images.push(...uploadedImages, ...urlImages);
    await property.save();

    return property;
  } catch (error) {
    // Clean up uploaded images if adding fails
    if (files && files.length > 0) {
      await Promise.allSettled(
        files.map((file) => deleteFromLocal(file.filename))
      );
    }
    throw error;
  }
};

// Remove image from property
export const removePropertyImage = async (
  propertyId,
  imageId,
  userId,
  userRole
) => {
  try {
    const property = await Property.findOne({
      _id: propertyId,
      isActive: true,
    });

    if (!property) {
      throw new AppError("Property not found", 404);
    }

    // Check authorization
    const isOwner = property.owner.toString() === userId;
    const isAgent = property.agent && property.agent.toString() === userId;
    const isAdmin = userRole === "admin";

    if (!isOwner && !isAgent && !isAdmin) {
      throw new AppError("Not authorized to modify this property", 403);
    }

    const image = property.images.id(imageId);
    if (!image) {
      throw new AppError("Image not found", 404);
    }

    // Don't allow removing the last image
    if (property.images.length === 1) {
      throw new AppError("Cannot remove the last image", 400);
    }

    // Delete from local storage (skip for URL-based images)
    if (image.filename) {
      await deleteFromLocal(image.filename);
    }

    // Remove from property
    property.images.pull(imageId);

    // If removed image was primary, set first remaining image as primary
    if (image.isPrimary && property.images.length > 0) {
      property.images[0].isPrimary = true;
    }

    await property.save();

    return property;
  } catch (error) {
    if (error.name === "CastError") {
      throw new AppError("Invalid ID", 400);
    }
    throw error;
  }
};

// Set primary image
export const setPrimaryImage = async (
  propertyId,
  imageId,
  userId,
  userRole
) => {
  try {
    const property = await Property.findOne({
      _id: propertyId,
      isActive: true,
    });

    if (!property) {
      throw new AppError("Property not found", 404);
    }

    // Check authorization
    const isOwner = property.owner.toString() === userId;
    const isAgent = property.agent && property.agent.toString() === userId;
    const isAdmin = userRole === "admin";

    if (!isOwner && !isAgent && !isAdmin) {
      throw new AppError("Not authorized to modify this property", 403);
    }

    await property.setPrimaryImage(imageId);

    return property;
  } catch (error) {
    if (error.name === "CastError") {
      throw new AppError("Invalid ID", 400);
    }
    throw error;
  }
};

// Get properties by owner
export const getPropertiesByOwner = async (ownerId, queryParams) => {
  const { page = 1, limit = 12, status } = queryParams;

  const filter = { owner: ownerId, isActive: true };

  if (status && status !== "all") {
    filter.status = status;
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);

  try {
    const [properties, totalCount] = await Promise.all([
      Property.find(filter)
        .populate("agent", "name email")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Property.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalCount / parseInt(limit));

    return {
      properties,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalCount,
        hasNextPage: parseInt(page) < totalPages,
        hasPrevPage: parseInt(page) > 1,
      },
    };
  } catch (error) {
    throw new AppError("Failed to fetch properties", 500);
  }
};

// Get nearby properties
export const getNearbyProperties = async (
  latitude,
  longitude,
  maxDistance = 10000,
  limit = 10
) => {
  try {
    const properties = await Property.findNearby(
      latitude,
      longitude,
      maxDistance
    )
      .populate("owner", "name email")
      .populate("agent", "name email")
      .limit(parseInt(limit));

    return properties;
  } catch (error) {
    throw new AppError("Failed to fetch nearby properties", 500);
  }
};

// Get property statistics
export const getPropertyStats = async () => {
  try {
    const stats = await Property.aggregate([
      {
        $match: { isActive: true },
      },
      {
        $group: {
          _id: null,
          totalProperties: { $sum: 1 },
          availableProperties: {
            $sum: { $cond: [{ $eq: ["$status", "available"] }, 1, 0] },
          },
          soldProperties: {
            $sum: { $cond: [{ $eq: ["$status", "sold"] }, 1, 0] },
          },
          rentedProperties: {
            $sum: { $cond: [{ $eq: ["$status", "rented"] }, 1, 0] },
          },
          averagePrice: { $avg: "$price.amount" },
          totalViews: { $sum: "$views" },
        },
      },
      {
        $project: {
          _id: 0,
          totalProperties: 1,
          availableProperties: 1,
          soldProperties: 1,
          rentedProperties: 1,
          averagePrice: { $round: ["$averagePrice", 2] },
          totalViews: 1,
        },
      },
    ]);

    // Get property type distribution
    const typeStats = await Property.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: "$propertyType", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    // Get location distribution
    const locationStats = await Property.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: "$location.city", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    return {
      overall: stats[0] || {},
      byType: typeStats,
      byLocation: locationStats,
    };
  } catch (error) {
    throw new AppError("Failed to fetch property statistics", 500);
  }
};

// Search properties with advanced filters
export const searchProperties = async (searchParams) => {
  return await getAllProperties(searchParams);
};

// Update property status
export const updatePropertyStatus = async (
  propertyId,
  status,
  userId,
  userRole
) => {
  try {
    const property = await Property.findOne({
      _id: propertyId,
      isActive: true,
    });

    if (!property) {
      throw new AppError("Property not found", 404);
    }

    // Check authorization
    const isOwner = property.owner.toString() === userId;
    const isAgent = property.agent && property.agent.toString() === userId;
    const isAdmin = userRole === "admin";

    if (!isOwner && !isAgent && !isAdmin) {
      throw new AppError("Not authorized to update this property", 403);
    }

    property.status = status;

    // Set soldAt date if status is sold
    if (status === "sold") {
      property.soldAt = new Date();
    } else if (property.soldAt && status !== "sold") {
      property.soldAt = null;
    }

    await property.save();

    return property;
  } catch (error) {
    if (error.name === "CastError") {
      throw new AppError("Invalid property ID", 400);
    }
    throw error;
  }
};
