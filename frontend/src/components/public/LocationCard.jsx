import { motion } from "motion/react";

const LocationCard = ({ location, onClick }) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.3, ease: "easeIn" }}
    viewport={{ once: true }}
    className="group relative overflow-hidden rounded-xl cursor-pointer transform transition-all duration-300 hover:scale-105"
    onClick={() => onClick(location)}
  >
    <div className="aspect-[4/3] bg-gradient-to-br from-ocean-blue to-teal-turquoise relative overflow-hidden">
      <img
        src={`/images/${location.name.toLowerCase().replace(" ", "-")}.webp`}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 lg:p-6 text-white bg-gradient-to-t from-black/80 via-black/40 to-transparent">
        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold font-[Playfair_Display] mb-1 sm:mb-2 drop-shadow-lg">
          {location.name}
        </h3>
        <p className="text-gray-100 mb-2 sm:mb-3 text-sm sm:text-base drop-shadow-md">
          {location.tagline}
        </p>
        <div className="grid grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm drop-shadow-md">
          <div>
            <span className="text-main-gold">Avg. Price:</span>{" "}
            {location.stats.averagePrice}
          </div>
          <div>
            <span className="text-main-gold">Properties:</span>{" "}
            {location.stats.properties}
          </div>
          <div>
            <span className="text-main-gold">Appreciation:</span>{" "}
            {location.stats.appreciation}
          </div>
          <div>
            <span className="text-main-gold">ROI:</span> {location.stats.roi}
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

export default LocationCard;
