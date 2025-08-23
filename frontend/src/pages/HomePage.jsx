import HeroSection from "components/templates/HeroSection";
import HandpickedSection from "components/templates/HandpickedSection";
import LocationsSection from "components/templates/LocationsSection";
import CounterSection from "components/templates/CounterSection";

const HomePage = ({ properties }) => {
  return (
    <>
      <HeroSection />
      <HandpickedSection properties={properties} />
      <LocationsSection />
      <CounterSection />
    </>
  );
};

export default HomePage;
