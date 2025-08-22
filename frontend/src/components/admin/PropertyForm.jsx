import { useState, useRef } from "react";
import { FiUpload, FiX, FiImage } from "react-icons/fi";
import { useAdmin } from "hooks/useAdmin";

const PropertyForm = ({ property = null, onSuccess, onCancel }) => {
  const fileInputRef = useRef(null);
  const { createProperty, updateProperty, loading } = useAdmin();

  const [formData, setFormData] = useState({
    name: property?.name || "",
    description: property?.description || "",
    propertyType: property?.propertyType || "house",
    status: property?.status || "available",
    price: {
      amount: property?.price?.amount || "",
      currency: "USD",
      type: "sale",
    },
    location: {
      address: property?.location?.address || "",
      city: property?.location?.city || "",
      country: property?.location?.country || "",
      zipCode: property?.location?.zipCode || "",
      coordinates: {
        latitude: property?.location?.coordinates?.latitude || "",
        longitude: property?.location?.coordinates?.longitude || "",
      },
    },
    details: {
      bedrooms: property?.details?.bedrooms || "",
      bathrooms: property?.details?.bathrooms || "",
      area: {
        value: property?.details?.area?.value || "",
        unit: "sqft",
      },
      floors: property?.details?.floors || "",
      buildYear: property?.details?.buildYear || "",
      parking: property?.details?.parking || "",
    },
    features: property?.features?.join(", ") || "",
    isFeatured: property?.isFeatured || false,
  });

  const [selectedImages, setSelectedImages] = useState([]);
  const [errors, setErrors] = useState({});

  const propertyTypes = [
    "house",
    "apartment",
    "condo",
    "townhouse",
    "villa",
    "studio",
    "commercial",
    "land",
  ];

  const statusOptions = [
    "available",
    "sold",
    "rented",
    "pending",
    "off-market",
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes(".")) {
      const [parent, child, grandchild] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: grandchild
            ? {
                ...prev[parent][child],
                [grandchild]: type === "checkbox" ? checked : value,
              }
            : type === "checkbox"
            ? checked
            : value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Property name is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.price.amount) newErrors.priceAmount = "Price is required";
    if (!formData.location.address.trim())
      newErrors.address = "Address is required";
    if (!formData.location.city.trim()) newErrors.city = "City is required";
    if (!formData.location.country.trim())
      newErrors.country = "Country is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      // Convert features string to array
      const featuresArray = formData.features
        .split(",")
        .map((f) => f.trim())
        .filter((f) => f.length > 0);

      const propertyData = {
        ...formData,
        features: featuresArray,
        price: {
          ...formData.price,
          amount: parseFloat(formData.price.amount),
        },
        details: {
          ...formData.details,
          bedrooms: parseInt(formData.details.bedrooms) || 0,
          bathrooms: parseFloat(formData.details.bathrooms) || 0,
          floors: parseInt(formData.details.floors) || 1,
          buildYear:
            parseInt(formData.details.buildYear) || new Date().getFullYear(),
          parking: parseInt(formData.details.parking) || 0,
          area: {
            ...formData.details.area,
            value: parseFloat(formData.details.area.value) || 0,
          },
        },
        location: {
          ...formData.location,
          coordinates: {
            latitude: parseFloat(formData.location.coordinates.latitude) || 0,
            longitude: parseFloat(formData.location.coordinates.longitude) || 0,
          },
        },
      };

      if (property) {
        await updateProperty(property._id, propertyData);
      } else {
        const submitData = new FormData();

        // Handle nested objects properly for FormData
        submitData.append("name", propertyData.name);
        submitData.append("description", propertyData.description);
        submitData.append("propertyType", propertyData.propertyType);
        submitData.append("status", propertyData.status);
        submitData.append("isFeatured", propertyData.isFeatured);

        // Price fields
        submitData.append("price.amount", propertyData.price.amount);
        submitData.append("price.currency", propertyData.price.currency);
        submitData.append("price.type", propertyData.price.type);

        // Location fields
        submitData.append("location.address", propertyData.location.address);
        submitData.append("location.city", propertyData.location.city);
        submitData.append("location.country", propertyData.location.country);
        submitData.append(
          "location.zipCode",
          propertyData.location.zipCode || ""
        );
        submitData.append(
          "location.coordinates.latitude",
          propertyData.location.coordinates.latitude
        );
        submitData.append(
          "location.coordinates.longitude",
          propertyData.location.coordinates.longitude
        );

        // Details fields
        submitData.append("details.bedrooms", propertyData.details.bedrooms);
        submitData.append("details.bathrooms", propertyData.details.bathrooms);
        submitData.append(
          "details.area.value",
          propertyData.details.area.value
        );
        submitData.append("details.area.unit", propertyData.details.area.unit);
        submitData.append("details.floors", propertyData.details.floors);
        submitData.append("details.buildYear", propertyData.details.buildYear);
        submitData.append("details.parking", propertyData.details.parking);

        // Features array
        propertyData.features.forEach((feature, index) => {
          submitData.append(`features[${index}]`, feature);
        });

        // Images
        selectedImages.forEach((image) => {
          submitData.append("images", image);
        });

        await createProperty(submitData);
      }

      onSuccess();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <div className="bg-pure-white rounded-lg shadow-md border border-gray-200 p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-primary-dark">
            Basic Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-secondary-dark mb-1">
                Property Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-main-gold focus:border-main-gold ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter property name"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-dark mb-1">
                Property Type
              </label>
              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-gold focus:border-main-gold"
              >
                {propertyTypes.map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-dark mb-1">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-main-gold focus:border-main-gold ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Describe the property..."
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description}</p>
            )}
          </div>
        </div>

        {/* Price Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-primary-dark">
            Price Information
          </h3>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-secondary-dark mb-1">
                Price *
              </label>
              <input
                type="number"
                name="price.amount"
                value={formData.price.amount}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-main-gold focus:border-main-gold ${
                  errors.priceAmount ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter price in USD"
              />
              {errors.priceAmount && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.priceAmount}
                </p>
              )}
              <p className="text-xs text-medium-gray mt-1">
                Price will be in USD for sale
              </p>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-primary-dark">Location</h3>

          <div>
            <label className="block text-sm font-medium text-secondary-dark mb-1">
              Address *
            </label>
            <input
              type="text"
              name="location.address"
              value={formData.location.address}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-main-gold focus:border-main-gold ${
                errors.address ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter full address"
            />
            {errors.address && (
              <p className="text-red-500 text-xs mt-1">{errors.address}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-secondary-dark mb-1">
                City *
              </label>
              <input
                type="text"
                name="location.city"
                value={formData.location.city}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-main-gold focus:border-main-gold ${
                  errors.city ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="City"
              />
              {errors.city && (
                <p className="text-red-500 text-xs mt-1">{errors.city}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-dark mb-1">
                Country *
              </label>
              <input
                type="text"
                name="location.country"
                value={formData.location.country}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-main-gold focus:border-main-gold ${
                  errors.country ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Country"
              />
              {errors.country && (
                <p className="text-red-500 text-xs mt-1">{errors.country}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-secondary-dark mb-1">
                Latitude (optional)
              </label>
              <input
                type="number"
                step="any"
                name="location.coordinates.latitude"
                value={formData.location.coordinates.latitude}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-gold focus:border-main-gold"
                placeholder="0.0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-dark mb-1">
                Longitude (optional)
              </label>
              <input
                type="number"
                step="any"
                name="location.coordinates.longitude"
                value={formData.location.coordinates.longitude}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-gold focus:border-main-gold"
                placeholder="0.0"
              />
            </div>
          </div>
        </div>

        {/* Property Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-primary-dark">
            Property Details
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-secondary-dark mb-1">
                Bedrooms
              </label>
              <input
                type="number"
                name="details.bedrooms"
                value={formData.details.bedrooms}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-gold focus:border-main-gold"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-dark mb-1">
                Bathrooms
              </label>
              <input
                type="number"
                step="0.5"
                name="details.bathrooms"
                value={formData.details.bathrooms}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-gold focus:border-main-gold"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-dark mb-1">
                Area (sq ft)
              </label>
              <input
                type="number"
                name="details.area.value"
                value={formData.details.area.value}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-gold focus:border-main-gold"
                placeholder="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-secondary-dark mb-1">
                Build Year
              </label>
              <input
                type="number"
                name="details.buildYear"
                value={formData.details.buildYear}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-gold focus:border-main-gold"
                placeholder="YYYY"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-dark mb-1">
                Parking Spots
              </label>
              <input
                type="number"
                name="details.parking"
                value={formData.details.parking}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-gold focus:border-main-gold"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-dark mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-gold focus:border-main-gold"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-dark mb-1">
              Features (comma-separated)
            </label>
            <input
              type="text"
              name="features"
              value={formData.features}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-gold focus:border-main-gold"
              placeholder="e.g., Pool, Garage, Garden, Fireplace"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleInputChange}
              className="h-4 w-4 text-main-gold focus:ring-main-gold border-gray-300 rounded"
            />
            <label className="ml-2 text-sm text-secondary-dark">
              Featured Property
            </label>
          </div>
        </div>

        {/* Images */}
        {!property && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary-dark">Images</h3>

            <div>
              <input
                type="file"
                ref={fileInputRef}
                multiple
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg hover:border-main-gold transition-colors"
              >
                <div className="text-center">
                  <FiUpload className="h-8 w-8 text-medium-gray mx-auto mb-2" />
                  <p className="text-medium-gray">Click to upload images</p>
                </div>
              </button>
            </div>

            {selectedImages.length > 0 && (
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                {selectedImages.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-20 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <FiX className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 text-medium-gray rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-main-gold text-pure-white rounded-lg hover:bg-dark-gold transition-colors disabled:opacity-50"
          >
            {loading
              ? "Saving..."
              : property
              ? "Update Property"
              : "Create Property"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PropertyForm;
