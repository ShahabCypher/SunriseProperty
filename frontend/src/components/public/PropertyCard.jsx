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
        className="bg-pure-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col sm:flex-row"
        onClick={onClick}
      >
        <div className="w-full sm:w-80 h-48 sm:h-48 flex-shrink-0">
          {primaryImage ? (
            <img
              src={`${import.meta.env.VITE_API_URL}${primaryImage.url}`}
              alt={property.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-light-section-background flex items-center justify-center">
              <FiHome className="h-8 w-8 sm:h-12 sm:w-12 text-medium-gray" />
            </div>
          )}
        </div>

        <div className="flex-1 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 sm:mb-4">
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl font-semibold text-primary-dark mb-2">
                {property.name}
              </h3>
              <p className="text-medium-gray flex items-center mb-2 text-sm sm:text-base">
                <FiMapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                {property.location?.city}, {property.location?.country}
              </p>
            </div>
            {property.isFeatured && (
              <span className="px-2 sm:px-3 py-1 bg-main-gold text-pure-white rounded-full text-xs sm:text-sm font-medium flex items-center mt-2 sm:mt-0 self-start">
                <FiStar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                Featured
              </span>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-4 text-medium-gray mb-3 sm:mb-4 text-xs sm:text-sm">
            <div className="flex items-center">
              <FaBed className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span>{property.details?.bedrooms || 0} beds</span>
            </div>
            <div className="flex items-center">
              <FaBath className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span>{property.details?.bathrooms || 0} baths</span>
            </div>
            <div className="flex items-center">
              <FiSquare className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="truncate">
                {property.details?.area?.value || 0}{" "}
                {property.details?.area?.unit}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <span className="text-lg sm:text-2xl font-bold text-main-gold">
              {formatPrice(property.price)}
            </span>
            <span className="text-medium-gray capitalize bg-light-section-background px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm self-start">
              {property.propertyType}
            </span>
          </div>

          {property.description && (
            <p className="text-medium-gray text-xs sm:text-sm mt-3 line-clamp-2">
              {property.description}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Use the handpicked section card design for grid view
  return (
    <div
      className="bg-white rounded-2xl shadow-[0_0_10px_rgba(0,0,0,0.1)] transform hover:translate-y-[-10px] hover:scale-105 hover:shadow-[0_0_30px_5px_rgba(0,0,0,0.2)] transition-all duration-300 ease-in-out cursor-pointer"
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative h-48 sm:h-56 md:h-64">
        {primaryImage ? (
          <img
            src={`${import.meta.env.VITE_API_URL}${primaryImage.url}`}
            alt={property.name}
            className="w-full h-full object-cover rounded-t-2xl"
          />
        ) : (
          <div className="w-full h-full bg-light-section-background flex items-center justify-center rounded-t-2xl">
            <FiHome className="h-8 w-8 sm:h-12 sm:w-12 text-medium-gray" />
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
      </div>

      {/* Details */}
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="font-bold text-xl sm:text-2xl lg:text-3xl tracking-wide bg-gradient-to-r from-light-gold to-dark-gold text-transparent bg-clip-text">
          {formatPrice(property.price)}
        </div>
        <div className="text-primary-dark font-[Playfair_Display] font-semibold text-lg sm:text-xl tracking-wider mt-3 sm:mt-4 line-clamp-1">
          {property.name}
        </div>
        <div className="text-medium-gray tracking-wider mt-2 sm:mt-4 flex items-center text-sm sm:text-base">
          <FiMapPin className="w-4 h-4 mr-1 text-main-gold" />
          {property.location?.city}, {property.location?.country}
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-4 mt-4 sm:mt-6 border-t border-light-gold/30 pt-4 sm:pt-6 text-xs sm:text-sm text-medium-gray">
          <div className="flex items-center">
            <FaBed className="w-3 h-3 mr-1 text-main-gold" />
            <span>{property.details?.bedrooms || 0} beds</span>
          </div>
          <div className="flex items-center">
            <FaBath className="w-3 h-3 mr-1 text-main-gold" />
            <span>{property.details?.bathrooms || 0} baths</span>
          </div>
          <div className="flex items-center">
            <FiSquare className="w-3 h-3 mr-1 text-main-gold" />
            <span>
              {property.details?.area?.value || 0}{" "}
              {property.details?.area?.unit}
            </span>
          </div>
          <div className="flex items-center text-ocean-blue">
            <span className="capitalize">{property.propertyType}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
