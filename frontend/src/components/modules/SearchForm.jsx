const SearchForm = () => {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="bg-pure-white/90 sm:bg-off-white/75 backdrop-blur-md rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl border border-white/20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Location Select */}
          <div className="space-y-2 sm:space-y-3">
            <label
              htmlFor="location"
              className="block text-sm sm:text-base font-medium text-secondary-dark"
            >
              Luxury Location
            </label>
            <select
              name="location"
              id="location"
              className="w-full border-2 border-light-gold/35 focus:border-light-gold focus:ring-2 focus:ring-light-gold/20 focus:shadow-[0_0_8px_rgba(212,175,55,0.3)] rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-white transition-all duration-300 outline-none"
            >
              <option value="all">Select City</option>
              <option value="miami">🏖️ Miami, FL</option>
              <option value="los-angeles">🌴 Los Angeles, CA</option>
              <option value="dubai">🏝️ Dubai, UAE</option>
              <option value="malibu">🌊 Malibu, CA</option>
              <option value="beverly-hills">🏛️ Beverly Hills, CA</option>
            </select>
          </div>

          {/* Property Type Select */}
          <div className="space-y-2 sm:space-y-3">
            <label
              htmlFor="propertyType"
              className="block text-sm sm:text-base font-medium text-secondary-dark"
            >
              Property Type
            </label>
            <select
              name="propertyType"
              id="propertyType"
              className="w-full border-2 border-light-gold/35 focus:border-light-gold focus:ring-2 focus:ring-light-gold/20 focus:shadow-[0_0_8px_rgba(212,175,55,0.3)] rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-white transition-all duration-300 outline-none"
            >
              <option value="all">All Luxury Types</option>
              <option value="beachfront">Beachfront</option>
              <option value="villa">Villa</option>
              <option value="mansion">Mansion</option>
              <option value="penthouse">Penthouse</option>
            </select>
          </div>

          {/* Price Range Select */}
          <div className="space-y-2 sm:space-y-3 sm:col-span-2 lg:col-span-1">
            <label
              htmlFor="priceRange"
              className="block text-sm sm:text-base font-medium text-secondary-dark"
            >
              Price Range
            </label>
            <select
              name="priceRange"
              id="priceRange"
              className="w-full border-2 border-light-gold/35 focus:border-light-gold focus:ring-2 focus:ring-light-gold/20 focus:shadow-[0_0_8px_rgba(212,175,55,0.3)] rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-white transition-all duration-300 outline-none"
            >
              <option value="all">Luxury Budget</option>
              <option value="1000000-3000000">$1M - $3M</option>
              <option value="3000000-7000000">$3M - $7M</option>
              <option value="7000000-15000000">$7M - $15M</option>
              <option value="15000000+">$15M+</option>
            </select>
          </div>
        </div>

        {/* Search Button */}
        <div className="mt-6 sm:mt-8 flex justify-center">
          <button className="w-full sm:w-auto bg-gradient-to-r from-light-gold to-dark-gold text-white text-sm sm:text-base lg:text-lg font-bold px-6 sm:px-8 lg:px-12 py-3 sm:py-4 rounded-lg transform hover:translate-y-[-3px] hover:shadow-xl transition-all duration-300 ease-in-out min-w-[200px]">
            Explore Properties
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
