import SearchForm from "components/modules/SearchForm";

const HeroSection = () => {
  return (
    <section className="w-full">
      <div className="container mx-auto bg-[url('images/hero-bg.jpg')] h-150 bg-cover bg-center flex flex-col items-center">
        {/* Card */}
        <div className="flex flex-col items-center mt-15 w-3/5 bg-off-white/65 backdrop-blur-sm rounded-lg p-10 text-center shadow-[0_0_10px_rgba(0,0,0,0.2)]">
          <h1 className="text-5xl font-extrabold font-[Playfair_Display] text-primary-dark">
            Discover{" "}
            <span className="bg-gradient-to-r from-light-gold to-dark-gold text-transparent bg-clip-text">
              Luxury
            </span>{" "}
            Coastal Properties
          </h1>
          <p className="text-lg text-medium-gray mt-5 w-4/5">
            Experience the finest waterfront estates in Dubai, Los Angeles, and
            Miami with unparalleled ocean views and sophisticated amenities
          </p>
        </div>

        <SearchForm />
      </div>
    </section>
  );
};

export default HeroSection;
