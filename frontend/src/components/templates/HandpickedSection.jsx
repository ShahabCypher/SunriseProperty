import { useState } from "react";
import { motion } from "motion/react";

import PropertyCard from "components/public/PropertyCard";
import PropertyModal from "components/public/PropertyModal";

const HandpickedSection = ({ properties }) => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handlePropertyClick = (property) => {
    setSelectedProperty(property);
    setShowModal(true);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeIn" }}
      viewport={{ once: true }}
      className="w-full bg-light-blue-tint py-12 sm:py-16 lg:py-20 xl:py-24"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="text-sm sm:text-base lg:text-lg text-medium-gray tracking-wider sm:tracking-widest uppercase font-medium">
            Handpicked Collection
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold font-[Playfair_Display] text-primary-dark mt-4 sm:mt-6 lg:mt-8">
            Featured{" "}
            <span className="bg-gradient-to-r from-light-gold to-dark-gold text-transparent bg-clip-text">
              Luxury
            </span>{" "}
            Properties
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-medium-gray font-serif mt-4 sm:mt-6 lg:mt-8 max-w-2xl mx-auto leading-relaxed">
            Discover our curated selection of the most prestigious waterfront
            properties in the world's most desirable coastal destinations
          </p>
        </div>

        <div className="mt-8 sm:mt-12 lg:mt-16">
          {properties && properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 max-w-7xl mx-auto">
              {properties[0] && (
                <div className="animate-slide-up *:min-w-[100%] *:min-h-[100%]">
                  <PropertyCard
                    property={properties[0]}
                    onClick={() => handlePropertyClick(properties[0])}
                  />
                </div>
              )}
              {properties[1] && (
                <div
                  className="animate-slide-up *:min-w-[100%] *:min-h-[100%]"
                  style={{ animationDelay: "0.1s" }}
                >
                  <PropertyCard
                    property={properties[1]}
                    onClick={() => handlePropertyClick(properties[1])}
                  />
                </div>
              )}
              {properties[2] && (
                <div
                  className="md:col-span-2 xl:col-span-1 flex justify-center animate-slide-up *:min-w-[100%] *:min-h-[100%]"
                  style={{ animationDelay: "0.2s" }}
                >
                  <PropertyCard
                    property={properties[2]}
                    onClick={() => handlePropertyClick(properties[2])}
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-medium-gray text-lg">
                Loading featured properties...
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Property Modal */}
      {showModal && selectedProperty && (
        <PropertyModal
          property={selectedProperty}
          onClose={() => {
            setShowModal(false);
            setSelectedProperty(null);
          }}
        />
      )}
    </motion.section>
  );
};

export default HandpickedSection;
