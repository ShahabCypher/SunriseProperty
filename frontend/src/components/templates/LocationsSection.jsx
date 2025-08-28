import { motion } from "motion/react";

import CityCard from "components/modules/CityCard";

const LocationsSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeIn" }}
      viewport={{ once: true }}
      className="w-full bg-primary-dark py-12 sm:py-16 lg:py-20 xl:py-24"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="text-sm sm:text-base lg:text-lg text-light-gray tracking-wider sm:tracking-widest uppercase font-medium">
            Prime Destinations
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold font-[Playfair_Display] text-coastal-tint mt-4 sm:mt-6 lg:mt-8">
            Luxury{" "}
            <span className="bg-gradient-to-r from-light-gold to-dark-gold text-transparent bg-clip-text">
              Coastal
            </span>{" "}
            Markets
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-light-gray font-serif mt-4 sm:mt-6 lg:mt-8 max-w-2xl mx-auto leading-relaxed">
            Explore the world's most prestigious waterfront communities where
            luxury meets lifestyle
          </p>
        </div>

        <div className="mt-8 sm:mt-12 lg:mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 max-w-7xl mx-auto">
            <CityCard
              city="Dubai"
              emoji="🏝️"
              description="Dubai is a city of contrasts, where the ancient and the modern, the traditional and the futuristic, come together to create a unique and vibrant cityscape."
            />
            <CityCard
              city="Los Angeles"
              emoji="🌴"
              description="Los Angeles is a city of contrasts, where the ancient and the modern, the traditional and the futuristic, come together to create a unique and vibrant cityscape."
            />
            <div className="md:col-span-2 xl:col-span-1 flex justify-center">
              <CityCard
                city="Miami"
                emoji="🏖️"
                description="Miami is a city of contrasts, where the ancient and the modern, the traditional and the futuristic, come together to create a unique and vibrant cityscape."
              />
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default LocationsSection;
