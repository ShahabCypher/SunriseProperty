import { motion } from "motion/react";

const CityCard = ({ city, emoji, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeIn" }}
      viewport={{ once: true }}
      className="city-card user-select-none hover:shadow-[0_0_40px_#d4af3760] w-full max-w-sm mx-auto"
    >
      <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 lg:mb-8">
        {emoji}
      </div>

      <div className="text-xl sm:text-2xl lg:text-3xl font-[Playfair_Display] text-light-gold mb-4 sm:mb-6 lg:mb-8">
        {city}
      </div>

      <div className="text-sm sm:text-base text-gray-300 leading-relaxed px-2">
        {description}
      </div>
    </motion.div>
  );
};

export default CityCard;
