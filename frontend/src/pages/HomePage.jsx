import HeroSection from "components/templates/HeroSection";
import HandpickedSection from "components/templates/HandpickedSection";
import LocationsSection from "components/templates/LocationsSection";
import CounterSection from "components/templates/CounterSection";

const HomePage = ({ properties, filters, setFilters }) => {
  return (
    <>
      <HeroSection filters={filters} setFilters={setFilters} />
      <HandpickedSection properties={properties} />
      <LocationsSection />
      <CounterSection />
    </>
  );
};

export default HomePage;
