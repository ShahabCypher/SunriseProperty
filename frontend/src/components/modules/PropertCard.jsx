const PropertCard = () => {
  return (
    <div className="bg-white rounded-2xl shadow-[0_0_10px_rgba(0,0,0,0.1)] transform hover:translate-y-[-5px] sm:hover:translate-y-[-10px] hover:scale-[1.02] sm:hover:scale-105 hover:shadow-[0_0_30px_5px_rgba(0,0,0,0.2)] transition-all duration-300 ease-in-out w-full max-w-sm mx-auto h-auto">
      {/* Image */}
      <div className="relative overflow-hidden rounded-t-2xl">
        <img
          src="/images/hero-bg.jpg"
          alt="Palazzo Oceanfront Villa"
          className="w-full h-48 sm:h-56 lg:h-64 object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute top-3 right-3">
          <span className="bg-main-gold text-white text-xs sm:text-sm font-semibold px-2 py-1 rounded-full">
            Featured
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="font-bold text-xl sm:text-2xl lg:text-3xl tracking-wide bg-gradient-to-r from-light-gold to-dark-gold text-transparent bg-clip-text">
          $4.2M
        </div>

        <div className="text-primary-dark font-[Playfair_Display] font-semibold text-base sm:text-lg lg:text-xl tracking-wider mt-2 sm:mt-3 lg:mt-4 line-clamp-2">
          Palazzo Oceanfront Villa
        </div>

        <div className="text-medium-gray tracking-wider mt-2 sm:mt-3 lg:mt-4 text-sm sm:text-base">
          🏝️ Palm Jumeirah, Dubai
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3 lg:gap-4 mt-4 sm:mt-5 lg:mt-6 border-t border-light-gold/30 pt-3 sm:pt-4 lg:pt-6 text-xs sm:text-sm text-medium-gray">
          <span className="flex items-center">🛏️ 5 beds</span>
          <span className="flex items-center">🚿 6 baths</span>
          <span className="hidden sm:flex items-center">📐 4,800 sqft</span>
          <span className="flex items-center">🌊 Ocean View</span>
        </div>

        {/* Action Button */}
        <button className="w-full mt-4 sm:mt-5 lg:mt-6 bg-gradient-to-r from-light-gold to-dark-gold text-white text-sm sm:text-base font-semibold py-2 sm:py-3 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:translate-y-[-2px]">
          View Details
        </button>
      </div>
    </div>
  );
};

export default PropertCard;
