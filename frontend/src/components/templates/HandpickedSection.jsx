import PropertCard from "components/modules/PropertCard";

const HandpickedSection = () => {
  return (
    <section className="w-full bg-light-blue-tint py-20">
      <div className="container mx-auto flex flex-col items-center">
        <div className="text-xl text-medium-gray tracking-widest uppercase">
          Handpicked Collection
        </div>
        <h2 className="text-5xl font-semibold font-[Playfair_Display] text-primary-dark mt-10">
          Featured{" "}
          <span className="bg-gradient-to-r from-light-gold to-dark-gold text-transparent bg-clip-text">
            Luxury
          </span>{" "}
          Properties
        </h2>
        <p className="text-lg text-medium-gray font-serif mt-10 w-1/2 text-center">
          Discover our curated selection of the most prestigious waterfront
          properties in the world's most desirable coastal destinations
        </p>
        <div className="grid grid-cols-3 gap-15 mt-10 px-10">
          <PropertCard />
          <PropertCard />
          <PropertCard />
        </div>
      </div>
    </section>
  );
};

export default HandpickedSection;
