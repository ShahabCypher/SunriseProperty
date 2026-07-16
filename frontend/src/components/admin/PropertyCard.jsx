import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiEdit,
  FiTrash2,
  FiEye,
  FiStar,
  FiMapPin,
  FiHome,
} from "react-icons/fi";
import { getImageSrc } from "utils/imageUrl";
import { useAdmin } from "hooks/useAdmin";

const PropertyCard = ({ property, onUpdate, onDelete }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { toggleFeaturedStatus, updatePropertyStatus } = useAdmin();

  const handleToggleFeatured = async () => {
    setIsLoading(true);
    try {
      await toggleFeaturedStatus(property._id);
      onUpdate();
    } catch (error) {
      console.error("Failed to toggle featured status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    setIsLoading(true);
    try {
      await updatePropertyStatus(property._id, newStatus);
      onUpdate();
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewProperty = () => {
    navigate(`/admin/properties/${property._id}/view`);
  };

  const handleEditProperty = () => {
    navigate(`/admin/properties/${property._id}/edit`);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: price.currency || "USD",
      minimumFractionDigits: 0,
    }).format(price.amount);
  };

  const getStatusColor = (status) => {
    const colors = {
      available: "bg-green-100 text-green-800",
      sold: "bg-red-100 text-red-800",
      rented: "bg-blue-100 text-blue-800",
      pending: "bg-yellow-100 text-yellow-800",
      "off-market": "bg-gray-100 text-gray-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const primaryImage =
    property.images?.find((img) => img.isPrimary) || property.images?.[0];

  return (
    <div className="bg-pure-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="relative">
        {primaryImage ? (
          <img
            src={getImageSrc(primaryImage.url)}
            alt={property.name}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-light-section-background flex items-center justify-center">
            <FiHome className="h-12 w-12 text-medium-gray" />
          </div>
        )}

        <div className="absolute top-3 left-3 flex gap-2">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
              property.status
            )}`}
          >
            {property.status}
          </span>
          {property.isFeatured && (
            <span className="px-2 py-1 bg-main-gold text-pure-white rounded-full text-xs font-medium flex items-center">
              <FiStar className="w-3 h-3 mr-1" />
              Featured
            </span>
          )}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-primary-dark mb-2 truncate">
          {property.name}
        </h3>

        <p className="text-medium-gray text-sm mb-3 flex items-center">
          <FiMapPin className="w-4 h-4 mr-1" />
          {property.location?.city}, {property.location?.country}
        </p>

        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-bold text-main-gold">
            {formatPrice(property.price)}
          </span>
          <span className="text-sm text-medium-gray capitalize">
            {property.propertyType}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-xs text-medium-gray mb-4">
          <span>{property.details?.bedrooms || 0} beds</span>
          <span>{property.details?.bathrooms || 0} baths</span>
          <span>
            {property.details?.area?.value || 0} {property.details?.area?.unit}
          </span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
          <select
            value={property.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            disabled={isLoading}
            className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-main-gold"
          >
            <option value="available">Available</option>
            <option value="pending">Pending</option>
            <option value="sold">Sold</option>
            <option value="rented">Rented</option>
            <option value="off-market">Off Market</option>
          </select>

          <div className="flex gap-2">
            <button
              onClick={handleToggleFeatured}
              disabled={isLoading}
              className={`p-2 rounded-lg transition-colors ${
                property.isFeatured
                  ? "bg-main-gold text-pure-white"
                  : "bg-gray-100 text-medium-gray hover:bg-gray-200"
              }`}
              title="Toggle Featured"
            >
              <FiStar className="w-4 h-4" />
            </button>

            <button
              onClick={handleViewProperty}
              className="p-2 bg-gray-100 text-medium-gray rounded-lg hover:bg-gray-200 transition-colors"
              title="View Details"
            >
              <FiEye className="w-4 h-4" />
            </button>

            <button
              onClick={handleEditProperty}
              className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
              title="Edit Property"
            >
              <FiEdit className="w-4 h-4" />
            </button>

            <button
              onClick={() => onDelete(property._id)}
              className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
              title="Delete Property"
            >
              <FiTrash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
