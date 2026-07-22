import { useNavigate } from "react-router-dom";
import { FiHome, FiStar } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { motion } from "motion/react";

const LocationModal = ({ location, onClose }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-0 sm:p-4"
    >
      <div className="bg-pure-white rounded-none sm:rounded-lg max-w-none sm:max-w-4xl w-full h-full sm:h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative h-48 sm:h-64 bg-gradient-to-br from-ocean-blue to-teal-turquoise">
          <img
            src={`/images/${location.name.toLowerCase().replace(" ", "-")}.webp`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 p-2 rounded-lg z-20 h-full w-full"></div>
          <button
            onClick={onClose}
            className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-overlay-white backdrop-blur-sm p-1 sm:p-2 rounded-full hover:bg-white transition-colors text-shadow-[0_0_80px_#000] z-30"
          >
            <IoMdClose className="w-5 h-5 sm:w-6 sm:h-6 text-primary-dark" />
          </button>
          <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-white text-shadow-[0_0_10px_rgba(0,0,0,1)] z-30">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-[Playfair_Display] mb-1 sm:mb-2">
              {location.name}
            </h1>
            <p className="text-lg sm:text-xl text-gray-200">
              {location.country}
            </p>
            <p className="text-base sm:text-lg text-main-gold">
              {location.tagline}
            </p>
          </div>
        </div>

        <div className="p-4 sm:p-6">
          {/* Overview */}
          <div className="mb-6 sm:mb-8">
            <p className="text-medium-gray text-base sm:text-lg leading-relaxed">
              {location.description}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="bg-light-section-background p-3 sm:p-4 rounded-lg text-center">
              <div className="text-lg sm:text-2xl font-bold text-main-gold">
                {location.stats.averagePrice}
              </div>
              <div className="text-medium-gray text-xs sm:text-sm">
                Average Price
              </div>
            </div>
            <div className="bg-light-section-background p-3 sm:p-4 rounded-lg text-center">
              <div className="text-lg sm:text-2xl font-bold text-main-gold">
                {location.stats.properties}
              </div>
              <div className="text-medium-gray text-xs sm:text-sm">
                Properties
              </div>
            </div>
            <div className="bg-light-section-background p-3 sm:p-4 rounded-lg text-center">
              <div className="text-lg sm:text-2xl font-bold text-main-gold">
                {location.stats.appreciation}
              </div>
              <div className="text-medium-gray text-xs sm:text-sm">
                Yearly Growth
              </div>
            </div>
            <div className="bg-light-section-background p-3 sm:p-4 rounded-lg text-center">
              <div className="text-lg sm:text-2xl font-bold text-main-gold">
                {location.stats.roi}
              </div>
              <div className="text-medium-gray text-xs sm:text-sm">
                Expected ROI
              </div>
            </div>
          </div>

          {/* Property Types */}
          <div className="mb-6 sm:mb-8">
            <h3 className="text-lg sm:text-2xl font-semibold text-primary-dark mb-3 sm:mb-4">
              Property Types Available
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              {location.features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <FiHome className="w-4 h-4 sm:w-5 sm:h-5 text-main-gold mr-2 sm:mr-3 flex-shrink-0" />
                  <span className="text-medium-gray text-sm sm:text-base">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Why Choose */}
          <div className="mb-6 sm:mb-8">
            <h3 className="text-lg sm:text-2xl font-semibold text-primary-dark mb-3 sm:mb-4">
              Why Choose {location.name}?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              {location.whyChoose.map((reason, index) => (
                <div key={index} className="flex items-center">
                  <FiStar className="w-4 h-4 sm:w-5 sm:h-5 text-main-gold mr-2 sm:mr-3 flex-shrink-0" />
                  <span className="text-medium-gray text-sm sm:text-base">
                    {reason}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-ocean-blue to-teal-turquoise text-pure-white p-4 sm:p-6 rounded-lg">
            <h3 className="text-lg sm:text-xl font-semibold mb-2">
              Ready to Invest in {location.name}?
            </h3>
            <p className="mb-4 text-sm sm:text-base">
              Explore our exclusive property portfolio in this premium location.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  onClose();
                  navigate("/properties", {
                    state: { filterCity: location.name },
                  });
                }}
                className="bg-main-gold hover:bg-dark-gold text-pure-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-colors"
              >
                View Properties
              </button>
              <button
                onClick={() => {
                  onClose();
                  navigate("/contact");
                }}
                className="bg-overlay-white text-primary-dark hover:bg-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-colors"
              >
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LocationModal;
