import SearchForm from "components/modules/SearchForm";

const HeroSection = () => {
  return (
    <section className="w-full">
      <div className="bg-[url('/images/hero-bg.jpg')] bg-center bg-cover min-h-screen sm:h-[calc(100vh-4rem)] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40 sm:bg-gradient-to-r sm:from-black/30 sm:to-transparent"></div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-screen sm:h-[calc(100vh-4rem)]">
          {/* Hero Content Card */}
          <div className="w-full max-w-4xl mx-auto text-center">
            <div className="bg-pure-white/90 sm:bg-off-white/75 backdrop-blur-md rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl border border-white/20 animate-fade-in">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold font-[Playfair_Display] text-primary-dark leading-tight">
                Discover{" "}
                <span className="bg-gradient-to-r from-light-gold to-dark-gold text-transparent bg-clip-text">
                  Luxury
                </span>
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>
                Coastal Properties
              </h1>

              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-medium-gray mt-4 sm:mt-6 lg:mt-8 max-w-3xl mx-auto leading-relaxed">
                Experience the finest waterfront estates in Dubai, Los Angeles,
                and Miami with unparalleled ocean views and sophisticated
                amenities
              </p>
            </div>
          </div>

          {/* Search Form */}
          <div className="w-full max-w-5xl mx-auto mt-6 sm:mt-8 lg:mt-12">
            <SearchForm />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:block">
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
