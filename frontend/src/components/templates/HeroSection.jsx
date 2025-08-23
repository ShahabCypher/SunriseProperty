import SearchForm from "components/modules/SearchForm";

const HeroSection = () => {
  return (
    <section className="w-full">
      <div className="bg-[url('/images/hero-bg.jpg')] bg-center bg-cover min-h-screen md:h-fit pb-5 md:py-15">
        <div className="container mx-auto flex flex-col items-center md:justify-center  h-full">
          {/* Card */}
          <div className="flex flex-col items-center mx-5 mt-10 md:m-0 md:w-3/5 bg-off-white/65 backdrop-blur-sm rounded-2xl p-4 md:p-10 text-center shadow-[0_0_10px_rgba(0,0,0,0.2)]">
            <h1 className="text-4xl md:text-5xl font-extrabold font-[Playfair_Display] text-primary-dark">
              Discover{" "}
              <span className="bg-gradient-to-r from-light-gold to-dark-gold text-transparent bg-clip-text">
                Luxury
              </span>{" "}
              Coastal Properties
            </h1>
            <p className="text-lg text-medium-gray mt-5 px-2 md:px-0 md:w-4/5">
              Experience the finest waterfront estates in Dubai, Los Angeles,
              and Miami with unparalleled ocean views and sophisticated
              amenities
            </p>
          </div>

          <div className="w-[90%] mt-10 md:mt-20">
            <SearchForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
