import { asyncHandler } from "../../middleware/errorHandler.js";
import * as propertyService from "./property.service.js";

// Get all properties with filters
export const getAllProperties = asyncHandler(async (req, res) => {
  const result = await propertyService.getAllProperties(req.query);

  res.status(200).json({
    success: true,
    message: "Properties retrieved successfully",
    data: result,
  });
});

// Get property by ID
export const getPropertyById = asyncHandler(async (req, res) => {
  const property = await propertyService.getPropertyById(req.params.id, true);

  res.status(200).json({
    success: true,
    message: "Property retrieved successfully",
    data: {
      property,
    },
  });
});

// Create new property
export const createProperty = asyncHandler(async (req, res) => {
  const imageUrls = req.body.imageUrls
    ? Array.isArray(req.body.imageUrls)
      ? req.body.imageUrls
      : [req.body.imageUrls]
    : [];

  const { imageUrls: _, ...propertyData } = req.body;

  const property = await propertyService.createProperty(
    propertyData,
    req.user._id,
    req.files || [],
    imageUrls
  );

  res.status(201).json({
    success: true,
    message: "Property created successfully",
    data: {
      property,
    },
  });
});

// Update property
export const updateProperty = asyncHandler(async (req, res) => {
  const property = await propertyService.updateProperty(
    req.params.id,
    req.body,
    req.user._id,
    req.user.role
  );

  res.status(200).json({
    success: true,
    message: "Property updated successfully",
    data: {
      property,
    },
  });
});

// Delete property (soft delete)
export const deleteProperty = asyncHandler(async (req, res) => {
  const result = await propertyService.deleteProperty(
    req.params.id,
    req.user._id,
    req.user.role
  );

  res.status(200).json({
    success: true,
    message: result.message,
  });
});

// Permanently delete property (admin only)
export const permanentlyDeleteProperty = asyncHandler(async (req, res) => {
  const result = await propertyService.permanentlyDeleteProperty(
    req.params.id,
    req.user._id,
    req.user.role
  );

  res.status(200).json({
    success: true,
    message: result.message,
  });
});

// Add images to property
export const addPropertyImages = asyncHandler(async (req, res) => {
  const imageUrls = req.body.imageUrls
    ? Array.isArray(req.body.imageUrls)
      ? req.body.imageUrls
      : [req.body.imageUrls]
    : [];

  const property = await propertyService.addPropertyImages(
    req.params.id,
    req.user._id,
    req.user.role,
    req.files || [],
    imageUrls
  );

  res.status(200).json({
    success: true,
    message: "Images added successfully",
    data: {
      property,
    },
  });
});

// Remove image from property
export const removePropertyImage = asyncHandler(async (req, res) => {
  const property = await propertyService.removePropertyImage(
    req.params.id,
    req.params.imageId,
    req.user._id,
    req.user.role
  );

  res.status(200).json({
    success: true,
    message: "Image removed successfully",
    data: {
      property,
    },
  });
});

// Set primary image
export const setPrimaryImage = asyncHandler(async (req, res) => {
  const property = await propertyService.setPrimaryImage(
    req.params.id,
    req.params.imageId,
    req.user._id,
    req.user.role
  );

  res.status(200).json({
    success: true,
    message: "Primary image updated successfully",
    data: {
      property,
    },
  });
});

// Get properties by owner
export const getPropertiesByOwner = asyncHandler(async (req, res) => {
  const result = await propertyService.getPropertiesByOwner(
    req.params.ownerId,
    req.query
  );

  res.status(200).json({
    success: true,
    message: "Properties retrieved successfully",
    data: result,
  });
});

// Get current user's properties
export const getMyProperties = asyncHandler(async (req, res) => {
  const result = await propertyService.getPropertiesByOwner(
    req.user._id,
    req.query
  );

  res.status(200).json({
    success: true,
    message: "Your properties retrieved successfully",
    data: result,
  });
});

// Get nearby properties
export const getNearbyProperties = asyncHandler(async (req, res) => {
  const { latitude, longitude, radius, limit } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({
      success: false,
      message: "Latitude and longitude are required",
    });
  }

  const properties = await propertyService.getNearbyProperties(
    parseFloat(latitude),
    parseFloat(longitude),
    radius ? parseInt(radius) : 10000,
    limit ? parseInt(limit) : 10
  );

  res.status(200).json({
    success: true,
    message: "Nearby properties retrieved successfully",
    data: {
      properties,
    },
  });
});

// Search properties
export const searchProperties = asyncHandler(async (req, res) => {
  const result = await propertyService.searchProperties(req.query);

  res.status(200).json({
    success: true,
    message: "Properties search completed successfully",
    data: result,
  });
});

// Get property statistics (admin and agent only)
export const getPropertyStats = asyncHandler(async (req, res) => {
  const stats = await propertyService.getPropertyStats();

  res.status(200).json({
    success: true,
    message: "Property statistics retrieved successfully",
    data: stats,
  });
});

// Update property status
export const updatePropertyStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const property = await propertyService.updatePropertyStatus(
    req.params.id,
    status,
    req.user._id,
    req.user.role
  );

  res.status(200).json({
    success: true,
    message: "Property status updated successfully",
    data: {
      property,
    },
  });
});

// Get featured properties
export const getFeaturedProperties = asyncHandler(async (req, res) => {
  const queryParams = {
    ...req.query,
    isFeatured: "true",
  };

  const result = await propertyService.getAllProperties(queryParams);

  res.status(200).json({
    success: true,
    message: "Featured properties retrieved successfully",
    data: result,
  });
});

// Toggle featured status (admin only)
export const toggleFeaturedStatus = asyncHandler(async (req, res) => {
  const property = await propertyService.getPropertyById(req.params.id);

  const updatedProperty = await propertyService.updateProperty(
    req.params.id,
    { isFeatured: !property.isFeatured },
    req.user._id,
    req.user.role
  );

  res.status(200).json({
    success: true,
    message: `Property ${
      updatedProperty.isFeatured ? "added to" : "removed from"
    } featured`,
    data: {
      property: updatedProperty,
    },
  });
});

// Get properties by type
export const getPropertiesByType = asyncHandler(async (req, res) => {
  const queryParams = {
    ...req.query,
    propertyType: req.params.type,
  };

  const result = await propertyService.getAllProperties(queryParams);

  res.status(200).json({
    success: true,
    message: `${req.params.type} properties retrieved successfully`,
    data: result,
  });
});

// Get properties by status
export const getPropertiesByStatus = asyncHandler(async (req, res) => {
  const queryParams = {
    ...req.query,
    status: req.params.status,
  };

  const result = await propertyService.getAllProperties(queryParams);

  res.status(200).json({
    success: true,
    message: `${req.params.status} properties retrieved successfully`,
    data: result,
  });
});

// Get properties by location
export const getPropertiesByLocation = asyncHandler(async (req, res) => {
  const { country, city } = req.params;
  const queryParams = {
    ...req.query,
    country,
    city,
  };

  const result = await propertyService.getAllProperties(queryParams);

  res.status(200).json({
    success: true,
    message: `Properties in ${city}, ${country} retrieved successfully`,
    data: result,
  });
});

// Bulk update properties (admin only)
export const bulkUpdateProperties = asyncHandler(async (req, res) => {
  const { propertyIds, updateData } = req.body;

  if (!propertyIds || !Array.isArray(propertyIds) || propertyIds.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Property IDs array is required",
    });
  }

  const updatePromises = propertyIds.map((id) =>
    propertyService.updateProperty(id, updateData, req.user._id, req.user.role)
  );

  const results = await Promise.allSettled(updatePromises);

  const successful = results.filter(
    (result) => result.status === "fulfilled"
  ).length;
  const failed = results.filter(
    (result) => result.status === "rejected"
  ).length;

  res.status(200).json({
    success: true,
    message: `Bulk update completed. ${successful} successful, ${failed} failed`,
    data: {
      successful,
      failed,
      results: results.map((result, index) => ({
        propertyId: propertyIds[index],
        status: result.status,
        error: result.status === "rejected" ? result.reason.message : null,
      })),
    },
  });
});
