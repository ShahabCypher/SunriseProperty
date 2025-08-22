import CityCard from "components/modules/CityCard";

const LocationsSection = () => {
  return (
    <section className="w-full bg-primary-dark py-20">
      <div className="container mx-auto flex flex-col items-center">
        <div className="text-xl text-light-gray tracking-widest uppercase">
          Prime Destinations
        </div>
        <h2 className="text-5xl font-semibold font-[Playfair_Display] text-coastal-tint mt-10">
          Luxury{" "}
          <span className="bg-gradient-to-r from-light-gold to-dark-gold text-transparent bg-clip-text">
            Coastal
          </span>{" "}
          Markets
        </h2>
        <p className="text-lg text-light-gray font-serif mt-10 w-1/2 text-center">
          Explore the world's most prestigious waterfront communities where
          luxury meets lifestyle
        </p>

        <div className="grid grid-cols-3 gap-10 mt-10 px-10">
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
          <CityCard
            city="Miami"
            emoji="🏖️"
            description="Miami is a city of contrasts, where the ancient and the modern, the traditional and the futuristic, come together to create a unique and vibrant cityscape."
          />
        </div>
      </div>
    </section>
  );
};

export default LocationsSection;
