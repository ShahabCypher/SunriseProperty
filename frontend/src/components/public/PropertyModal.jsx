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
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-pure-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-pure-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-primary-dark">
            {property.name}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FiX className="w-6 h-6 text-medium-gray" />
          </button>
        </div>

        {/* Image Gallery */}
        {property.images && property.images.length > 0 && (
          <div className="relative">
            <img
              src={`${import.meta.env.VITE_API_URL}${
                property.images[currentImageIndex].url
              }`}
              alt={property.name}
              className="w-full h-80 object-cover"
            />

            {property.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-overlay-white backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                >
                  <FiChevronLeft className="w-6 h-6 text-primary-dark" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-overlay-white backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                >
                  <FiChevronRight className="w-6 h-6 text-primary-dark" />
                </button>

                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {property.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full ${
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
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-main-gold text-pure-white rounded-full text-sm font-medium flex items-center">
                  <FiStar className="w-4 h-4 mr-1" />
                  Featured
                </span>
              </div>
            )}
          </div>
        )}

        <div className="p-6">
          {/* Price and Location */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="text-3xl font-bold text-main-gold mb-2">
                {formatPrice(property.price)}
              </div>
              <p className="text-medium-gray flex items-center">
                <FiMapPin className="w-5 h-5 mr-2" />
                {property.location?.address}, {property.location?.city},{" "}
                {property.location?.country}
              </p>
            </div>
            <span className="text-medium-gray capitalize bg-light-section-background px-4 py-2 rounded-full">
              {property.propertyType}
            </span>
          </div>

          {/* Property Details */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-light-section-background p-4 rounded-lg text-center">
              <FaBed className="w-8 h-8 text-main-gold mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary-dark">
                {property.details?.bedrooms || 0}
              </div>
              <div className="text-medium-gray">Bedrooms</div>
            </div>
            <div className="bg-light-section-background p-4 rounded-lg text-center">
              <FaBath className="w-8 h-8 text-main-gold mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary-dark">
                {property.details?.bathrooms || 0}
              </div>
              <div className="text-medium-gray">Bathrooms</div>
            </div>
            <div className="bg-light-section-background p-4 rounded-lg text-center">
              <FiSquare className="w-8 h-8 text-main-gold mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary-dark">
                {property.details?.area?.value || 0}
              </div>
              <div className="text-medium-gray">
                {property.details?.area?.unit || "sqft"}
              </div>
            </div>
            <div className="bg-light-section-background p-4 rounded-lg text-center">
              <FiCalendar className="w-8 h-8 text-main-gold mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary-dark">
                {property.details?.buildYear || "N/A"}
              </div>
              <div className="text-medium-gray">Built Year</div>
            </div>
          </div>

          {/* Description */}
          {property.description && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-primary-dark mb-3">
                Description
              </h3>
              <p className="text-medium-gray leading-relaxed">
                {property.description}
              </p>
            </div>
          )}

          {/* Features */}
          {property.features && property.features.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-primary-dark mb-3">
                Features
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {property.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-main-gold rounded-full mr-3"></div>
                    <span className="text-medium-gray capitalize">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Additional Details */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-xl font-semibold text-primary-dark mb-3">
              Property Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-medium-gray">
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

          {/* Contact CTA */}
          <div className="mt-8 bg-gradient-to-r from-ocean-blue to-teal-turquoise text-pure-white p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">
              Interested in this property?
            </h3>
            <p className="mb-4">
              Contact our expert team to schedule a viewing or get more
              information.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleScheduleViewing}
                className="bg-main-gold hover:bg-dark-gold text-pure-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Schedule Viewing
              </button>
              <button
                onClick={handleRequestInfo}
                className="bg-overlay-white text-primary-dark hover:bg-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Request Info
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyModal;
