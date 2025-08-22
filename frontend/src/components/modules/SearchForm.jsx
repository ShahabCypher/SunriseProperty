const SearchForm = () => {
  return (
    <div className="flex items-center flex-wrap justify-between mt-10 w-[50%] bg-off-white/65 backdrop-blur-sm rounded-lg p-10 **:outline-none shadow-[0_0_10px_rgba(0,0,0,0.2)]">
      <div className="flex flex-col justify-center items-center">
        <label htmlFor="location" className="text-secondary-dark">
          Luxary Location
        </label>
        <select
          name="location"
          id="location"
          className="border-2 border-light-gold/35 focus:border-light-gold focus:shadow-[0_0_5px_rgba(0,0,0,0.2)] rounded-lg px-5 py-3 mt-3 w-53 transition-all duration-300"
        >
          <option value="all">Select City</option>
          <option value="miami">🏖️ Miami, FL</option>
          <option value="los-angeles">🌴 Los Angeles, CA</option>
          <option value="dubai">🏝️ Dubai, UAE</option>
          <option value="malibu">🌊 Malibu, CA</option>
          <option value="beverly-hills">🏛️ Beverly Hills, CA</option>
        </select>
      </div>

      <div className="flex flex-col justify-center items-center">
        <label htmlFor="propertyType" className="text-secondary-dark">
          Property Type
        </label>
        <select
          name="propertyType"
          id="propertyType"
          className="border-2 border-light-gold/35 focus:border-light-gold focus:shadow-[0_0_5px_rgba(0,0,0,0.2)] rounded-lg px-5 py-3 mt-3 w-53 transition-all duration-300"
        >
          <option value="all">All Luxary Types</option>
          <option value="beachfront">Beachfront</option>
          <option value="villa">Villa</option>
          <option value="mansion">Mansion</option>
          <option value="penthouse">Penthouse</option>
        </select>
      </div>

      <div className="flex flex-col justify-center items-center">
        <label htmlFor="propertyStatus" className="text-secondary-dark">
          Property Status
        </label>
        <select
          name="propertyStatus"
          id="propertyStatus"
          className="border-2 border-light-gold/35 focus:border-light-gold focus:shadow-[0_0_5px_rgba(0,0,0,0.2)] rounded-lg px-5 py-3 mt-3 w-53 transition-all duration-300"
        >
          <option value="all">Luxary Budget</option>
          <option value="1000000-3000000">$1m - $3m</option>
          <option value="3000000-7000000">$3m - $7m</option>
          <option value="7000000-15000000">$7m - $15m</option>
          <option value="15000000+">$15m+</option>
        </select>
      </div>
      <button className="mx-auto mt-5 bg-gradient-to-r from-light-gold to-dark-gold text-white text-lg font-bold px-8 py-3 rounded-lg cursor-pointer transform hover:translate-y-[-5px] transition-all duration-300 ease-in-out">
        Explore Properties
      </button>
    </div>
  );
};

export default SearchForm;
