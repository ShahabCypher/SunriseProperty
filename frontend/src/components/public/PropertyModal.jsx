import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiX,
  FiMapPin,
  FiSquare,
  FiCalendar,
  FiStar,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { FaBath, FaBed } from "react-icons/fa";
import { motion } from "motion/react";

import PropertyMap from "./PropertyMap";
import { getImageSrc } from "utils/imageUrl";

const PropertyModal = ({ property, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: price.currency || "USD",
      minimumFractionDigits: 0,
    }).format(price.amount);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleScheduleViewing = () => {
    onClose();
    navigate("/contact");
  };

  const handleRequestInfo = () => {
    onClose();
    navigate("/contact");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-0"
    >
      <div className="bg-white max-w-none sm:max-w-4xl w-full h-full overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-pure-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center z-10">
          <h2 className="text-lg sm:text-2xl font-bold text-primary-dark truncate pr-4">
            {property.name}
          </h2>
          <button
            onClick={onClose}
            className="p-1 sm:p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
          >
            <FiX className="w-5 h-5 sm:w-6 sm:h-6 text-medium-gray" />
          </button>
        </div>

        {/* Image Gallery */}
        {property.images && property.images.length > 0 && (
          <div className="relative">
            <img
              src={getImageSrc(property.images[currentImageIndex].url)}
              alt={property.name}
              className="w-full h-48 sm:h-64 md:h-80 object-cover"
            />

            {property.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-overlay-white backdrop-blur-sm p-1 sm:p-2 rounded-full hover:bg-white transition-colors"
                >
                  <FiChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 text-primary-dark" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-overlay-white backdrop-blur-sm p-1 sm:p-2 rounded-full hover:bg-white transition-colors"
                >
                  <FiChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-primary-dark" />
                </button>

                <div className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {property.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
                        index === currentImageIndex
                          ? "bg-main-gold"
                          : "bg-white bg-opacity-50"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}

            {property.isFeatured && (
              <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                <span className="px-2 sm:px-3 py-1 bg-main-gold text-pure-white rounded-full text-xs sm:text-sm font-medium flex items-center">
                  <FiStar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  Featured
                </span>
              </div>
            )}
          </div>
        )}

        <div className="p-4 sm:p-6">
          {/* Price and Location */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4 sm:mb-6">
            <div className="flex-1">
              <div className="text-2xl sm:text-3xl font-bold text-main-gold mb-2">
                {formatPrice(property.price)}
              </div>
              <p className="text-medium-gray flex items-start text-sm sm:text-base">
                <FiMapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 mt-0.5 flex-shrink-0" />
                <span className="break-words">
                  {property.location?.address}, {property.location?.city},{" "}
                  {property.location?.country}
                </span>
              </p>
            </div>
            <span className="text-medium-gray capitalize bg-light-section-background px-3 sm:px-4 py-2 rounded-full text-sm self-start">
              {property.propertyType}
            </span>
          </div>

          {/* Property Details */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 mb-4 sm:mb-6">
            <div className="bg-light-section-background p-3 sm:p-4 rounded-lg text-center">
              <FaBed className="w-6 h-6 sm:w-8 sm:h-8 text-main-gold mx-auto mb-2" />
              <div className="text-lg sm:text-2xl font-bold text-primary-dark">
                {property.details?.bedrooms || 0}
              </div>
              <div className="text-medium-gray text-xs sm:text-sm">
                Bedrooms
              </div>
            </div>
            <div className="bg-light-section-background p-3 sm:p-4 rounded-lg text-center">
              <FaBath className="w-6 h-6 sm:w-8 sm:h-8 text-main-gold mx-auto mb-2" />
              <div className="text-lg sm:text-2xl font-bold text-primary-dark">
                {property.details?.bathrooms || 0}
              </div>
              <div className="text-medium-gray text-xs sm:text-sm">
                Bathrooms
              </div>
            </div>
            <div className="bg-light-section-background p-3 sm:p-4 rounded-lg text-center">
              <FiSquare className="w-6 h-6 sm:w-8 sm:h-8 text-main-gold mx-auto mb-2" />
              <div className="text-lg sm:text-2xl font-bold text-primary-dark">
                {property.details?.area?.value || 0}
              </div>
              <div className="text-medium-gray text-xs sm:text-sm">
                {property.details?.area?.unit || "sqft"}
              </div>
            </div>
            <div className="bg-light-section-background p-3 sm:p-4 rounded-lg text-center">
              <FiCalendar className="w-6 h-6 sm:w-8 sm:h-8 text-main-gold mx-auto mb-2" />
              <div className="text-lg sm:text-2xl font-bold text-primary-dark">
                {property.details?.buildYear || "N/A"}
              </div>
              <div className="text-medium-gray text-xs sm:text-sm">
                Built Year
              </div>
            </div>
          </div>

          {/* Description */}
          {property.description && (
            <div className="mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-semibold text-primary-dark mb-3">
                Description
              </h3>
              <p className="text-medium-gray leading-relaxed text-sm sm:text-base">
                {property.description}
              </p>
            </div>
          )}

          {/* Features */}
          {property.features && property.features.length > 0 && (
            <div className="mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-semibold text-primary-dark mb-3">
                Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                {property.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-main-gold rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-medium-gray capitalize text-sm sm:text-base">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Additional Details */}
          <div className="border-t border-gray-200 pt-4 sm:pt-6 mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-xl font-semibold text-primary-dark mb-3">
              Property Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-medium-gray text-sm sm:text-base">
              {property.details?.parkingSpaces && (
                <div>
                  <span className="font-medium">Parking Spaces:</span>{" "}
                  {property.details.parkingSpaces}
                </div>
              )}
              {property.details?.totalFloors && (
                <div>
                  <span className="font-medium">Total Floors:</span>{" "}
                  {property.details.totalFloors}
                </div>
              )}
              {property.details?.floor && (
                <div>
                  <span className="font-medium">Floor:</span>{" "}
                  {property.details.floor}
                </div>
              )}
              {property.price?.pricePerSqft && (
                <div>
                  <span className="font-medium">Price per sqft:</span> $
                  {property.price.pricePerSqft}
                </div>
              )}
              <div>
                <span className="font-medium">Status:</span>
                <span className="capitalize ml-1">{property.status}</span>
              </div>
              <div>
                <span className="font-medium">Listed:</span>{" "}
                {formatDate(property.createdAt)}
              </div>
            </div>
          </div>

          {/* Property Location Map */}
          {property.location?.coordinates?.coordinates && (
            <div className="mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-semibold text-primary-dark mb-3">
                Location
              </h3>
              <PropertyMap
                property={property}
                className="h-56 sm:h-72 md:h-80"
              />
            </div>
          )}

          {/* Contact CTA */}
          <div className="bg-gradient-to-r from-ocean-blue to-teal-turquoise text-pure-white p-4 sm:p-6 rounded-lg mb-5 sm:mb-0">
            <h3 className="text-lg sm:text-xl font-semibold mb-2">
              Interested in this property?
            </h3>
            <p className="mb-4 text-sm sm:text-base">
              Contact our expert team to schedule a viewing or get more
              information.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleScheduleViewing}
                className="bg-main-gold hover:bg-dark-gold text-pure-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-colors"
              >
                Schedule Viewing
              </button>
              <button
                onClick={handleRequestInfo}
                className="bg-overlay-white text-primary-dark hover:bg-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-colors"
              >
                Request Info
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyModal;
