import PropertCard from "components/modules/PropertCard";

const HandpickedSection = () => {
  return (
    <section className="w-full bg-light-blue-tint py-12 sm:py-16 lg:py-20 xl:py-24">
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
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 max-w-7xl mx-auto">
            <div className="animate-slide-up">
              <PropertCard />
            </div>
            <div
              className="animate-slide-up"
              style={{ animationDelay: "0.1s" }}
            >
              <PropertCard />
            </div>
            <div
              className="md:col-span-2 xl:col-span-1 flex justify-center animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              <PropertCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HandpickedSection;
