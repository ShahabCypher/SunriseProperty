const PropertCard = () => {
  return (
    <div className="bg-white rounded-2xl shadow-[0_0_10px_rgba(0,0,0,0.1)] transform hover:translate-y-[-10px] hover:scale-105 hover:shadow-[0_0_30px_5px_rgba(0,0,0,0.2)] transition-all duration-300 ease-in-out">
      {/* Image */}
      <div className="h-1/2">
        <img
          src="/images/hero-bg.jpg"
          className="w-full h-full object-cover rounded-t-2xl"
        />
      </div>

      {/* Details */}
      <div className="h-1/2 p-10">
        <div className="font-bold text-3xl tracking-wide bg-gradient-to-r from-light-gold to-dark-gold text-transparent bg-clip-text">
          $4.2M
        </div>
        <div className="text-primary-dark font-[Playfair_Display] font-semibold text-xl tracking-wider mt-4">
          Palazzo Oceanfront Villa
        </div>
        <div className="text-medium-gray tracking-wider mt-4">
          🏝️ Palm Jumeirah, Dubai
        </div>

        <div className="flex gap-4 mt-6 border-t border-light-gold/30 pt-6 text-sm text-medium-gray">
          <p>🛏️ 5 beds</p>
          <p>🚿 6 baths</p>
          <p>📐 4,800 sqft</p>
          <p>🌊 Ocean View</p>
        </div>
      </div>
    </div>
  );
};

export default PropertCard;
