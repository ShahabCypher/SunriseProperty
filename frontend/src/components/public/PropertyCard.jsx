import { FiMapPin, FiHome, FiStar, FiSquare } from "react-icons/fi";
import { FaBath, FaBed } from "react-icons/fa";

const PropertyCard = ({ property, viewMode = "grid", onClick }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: price.currency || "USD",
      minimumFractionDigits: 0,
    }).format(price.amount);
  };

  const primaryImage =
    property.images?.find((img) => img.isPrimary) || property.images?.[0];

  if (viewMode === "list") {
    return (
      <div
        className="bg-pure-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer flex"
        onClick={onClick}
      >
        <div className="w-80 h-48 flex-shrink-0">
          {primaryImage ? (
            <img
              src={`${import.meta.env.VITE_API_URL}${primaryImage.url}`}
              alt={property.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-light-section-background flex items-center justify-center">
              <FiHome className="h-12 w-12 text-medium-gray" />
            </div>
          )}
        </div>

        <div className="flex-1 p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold text-primary-dark mb-2">
                {property.name}
              </h3>
              <p className="text-medium-gray flex items-center mb-2">
                <FiMapPin className="w-4 h-4 mr-1" />
                {property.location?.city}, {property.location?.country}
              </p>
            </div>
            {property.isFeatured && (
              <span className="px-3 py-1 bg-main-gold text-pure-white rounded-full text-sm font-medium flex items-center">
                <FiStar className="w-4 h-4 mr-1" />
                Featured
              </span>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4 text-medium-gray mb-4">
            <div className="flex items-center">
              <FaBed className="w-4 h-4 mr-2" />
              <span>{property.details?.bedrooms || 0} beds</span>
            </div>
            <div className="flex items-center">
              <FaBath className="w-4 h-4 mr-2" />
              <span>{property.details?.bathrooms || 0} baths</span>
            </div>
            <div className="flex items-center">
              <FiSquare className="w-4 h-4 mr-2" />
              <span>
                {property.details?.area?.value || 0}{" "}
                {property.details?.area?.unit}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-main-gold">
              {formatPrice(property.price)}
            </span>
            <span className="text-medium-gray capitalize bg-light-section-background px-3 py-1 rounded-full">
              {property.propertyType}
            </span>
          </div>

          {property.description && (
            <p className="text-medium-gray text-sm mt-3 line-clamp-2">
              {property.description}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-pure-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:-translate-y-1"
      onClick={onClick}
    >
      <div className="relative">
        {primaryImage ? (
          <img
            src={`${import.meta.env.VITE_API_URL}${primaryImage.url}`}
            alt={property.name}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-light-section-background flex items-center justify-center">
            <FiHome className="h-12 w-12 text-medium-gray" />
          </div>
        )}

        {property.isFeatured && (
          <div className="absolute top-3 right-3">
            <span className="px-2 py-1 bg-main-gold text-pure-white rounded-full text-xs font-medium flex items-center">
              <FiStar className="w-3 h-3 mr-1" />
              Featured
            </span>
          </div>
        )}

        <div className="absolute bottom-3 left-3 right-3">
          <div className="bg-overlay-white backdrop-blur-sm rounded-lg p-2">
            <span className="text-lg font-bold text-primary-dark">
              {formatPrice(property.price)}
            </span>
          </div>
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

        <div className="grid grid-cols-3 gap-2 text-xs text-medium-gray mb-3">
          <div className="flex items-center">
            <FaBed className="w-3 h-3 mr-1" />
            <span>{property.details?.bedrooms || 0}</span>
          </div>
          <div className="flex items-center">
            <FaBath className="w-3 h-3 mr-1" />
            <span>{property.details?.bathrooms || 0}</span>
          </div>
          <div className="flex items-center">
            <FiSquare className="w-3 h-3 mr-1" />
            <span>{property.details?.area?.value || 0}</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-medium-gray capitalize bg-light-section-background px-2 py-1 rounded">
            {property.propertyType}
          </span>
          <button className="text-main-gold hover:text-dark-gold font-medium text-sm">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
