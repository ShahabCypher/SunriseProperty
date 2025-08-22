const CityCard = ({ city, emoji, description }) => {
  return (
    <div className="city-card user-select-none hover:shadow-[0_0_40px_#d4af3760]">
      <div className="text-5xl font-bold">{emoji}</div>
      <div className="text-3xl mt-10 font-[Playfair_Display] text-light-gold">
        {city}
      </div>
      <div className="text-gray-300 mt-10">{description}</div>
    </div>
  );
};

export default CityCard;
