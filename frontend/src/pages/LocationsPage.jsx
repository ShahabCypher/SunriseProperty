import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiMapPin,
  FiStar,
  FiTrendingUp,
  FiHome,
  FiSun,
  FiWifi,
  FiShield,
  FiAward,
} from "react-icons/fi";

const LocationsPage = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const navigate = useNavigate();

  const locations = [
    {
      id: 1,
      name: "Los Angeles",
      country: "United States",
      tagline: "Where Dreams Meet the Pacific",
      image: "/api/placeholder/800/600",
      description:
        "Experience the glamour of Hollywood and the serenity of Malibu beaches. Los Angeles offers year-round perfect weather, world-class entertainment, and stunning oceanfront properties.",
      highlights: [
        "Year-round Mediterranean climate",
        "World-renowned entertainment industry",
        "Premium beachfront properties",
        "High investment returns",
        "Luxury lifestyle amenities",
      ],
      stats: {
        averagePrice: "$2.8M",
        properties: "150+",
        appreciation: "+12%",
        roi: "8.5%",
      },
      features: [
        "Beverly Hills luxury estates",
        "Malibu beachfront homes",
        "Hollywood Hills modern villas",
        "Santa Monica coastal condos",
        "Venice Beach lofts",
      ],
      whyChoose: [
        "Consistent property value appreciation",
        "Strong rental market demand",
        "World-class dining and entertainment",
        "Premier educational institutions",
        "Diverse cultural attractions",
      ],
    },
    {
      id: 2,
      name: "Dubai",
      country: "United Arab Emirates",
      tagline: "The Future of Luxury Living",
      image: "/api/placeholder/800/600",
      description:
        "Dubai represents the pinnacle of modern luxury and innovation. With its iconic skyline, pristine beaches, and world-class infrastructure, it's the ultimate destination for discerning property investors.",
      highlights: [
        "Tax-free property ownership",
        "Ultra-modern architecture",
        "Strategic global location",
        "Highest ROI potential",
        "Luxury resort-style living",
      ],
      stats: {
        averagePrice: "$1.5M",
        properties: "200+",
        appreciation: "+15%",
        roi: "12%",
      },
      features: [
        "Dubai Marina waterfront towers",
        "Palm Jumeirah exclusive villas",
        "Downtown Dubai luxury apartments",
        "Business Bay modern high-rises",
        "Jumeirah Beach residences",
      ],
      whyChoose: [
        "Zero property taxes and capital gains",
        "Booming tourism and business hub",
        "World-class infrastructure",
        "High rental yields",
        "Strategic investment location",
      ],
    },
    {
      id: 3,
      name: "Miami",
      country: "United States",
      tagline: "Tropical Paradise Redefined",
      image: "/api/placeholder/800/600",
      description:
        "Miami combines Latin vibrancy with American sophistication. From South Beach art deco to Brickell's modern skyline, Miami offers diverse luxury properties in a tropical paradise.",
      highlights: [
        "Vibrant cultural scene",
        "No state income tax",
        "International business gateway",
        "Art deco architecture",
        "Exclusive island communities",
      ],
      stats: {
        averagePrice: "$1.8M",
        properties: "180+",
        appreciation: "+10%",
        roi: "9.5%",
      },
      features: [
        "South Beach oceanfront condos",
        "Brickell luxury high-rises",
        "Coral Gables historic estates",
        "Key Biscayne island homes",
        "Coconut Grove waterfront properties",
      ],
      whyChoose: [
        "Gateway to Latin America",
        "Strong international investment",
        "Year-round tropical climate",
        "Vibrant nightlife and culture",
        "Excellent dining and shopping",
      ],
    },
  ];

  const LocationCard = ({ location, onClick }) => (
    <div
      className="group relative overflow-hidden rounded-xl cursor-pointer transform transition-all duration-300 hover:scale-105"
      onClick={() => onClick(location)}
    >
      <div className="aspect-[4/3] bg-gradient-to-br from-ocean-blue to-teal-turquoise relative">
        <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-2xl font-bold font-[Playfair_Display] mb-2">
            {location.name}
          </h3>
          <p className="text-gray-200 mb-3">{location.tagline}</p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-main-gold">Avg. Price:</span>{" "}
              {location.stats.averagePrice}
            </div>
            <div>
              <span className="text-main-gold">Properties:</span>{" "}
              {location.stats.properties}
            </div>
            <div>
              <span className="text-main-gold">Appreciation:</span>{" "}
              {location.stats.appreciation}
            </div>
            <div>
              <span className="text-main-gold">ROI:</span> {location.stats.roi}
            </div>
          </div>
        </div>
        <div className="absolute top-4 right-4">
          <div className="bg-overlay-white backdrop-blur-sm rounded-full px-3 py-1 text-primary-dark text-sm font-medium">
            Premium Location
          </div>
        </div>
      </div>
    </div>
  );

  const LocationModal = ({ location, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-pure-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative h-64 bg-gradient-to-br from-ocean-blue to-teal-turquoise">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-overlay-white backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
          >
            <FiMapPin className="w-6 h-6 text-primary-dark" />
          </button>
          <div className="absolute bottom-6 left-6 text-white">
            <h1 className="text-4xl font-bold font-[Playfair_Display] mb-2">
              {location.name}
            </h1>
            <p className="text-xl text-gray-200">{location.country}</p>
            <p className="text-lg text-main-gold">{location.tagline}</p>
          </div>
        </div>

        <div className="p-6">
          {/* Overview */}
          <div className="mb-8">
            <p className="text-medium-gray text-lg leading-relaxed">
              {location.description}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-light-section-background p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-main-gold">
                {location.stats.averagePrice}
              </div>
              <div className="text-medium-gray">Average Price</div>
            </div>
            <div className="bg-light-section-background p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-main-gold">
                {location.stats.properties}
              </div>
              <div className="text-medium-gray">Properties</div>
            </div>
            <div className="bg-light-section-background p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-main-gold">
                {location.stats.appreciation}
              </div>
              <div className="text-medium-gray">Yearly Growth</div>
            </div>
            <div className="bg-light-section-background p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-main-gold">
                {location.stats.roi}
              </div>
              <div className="text-medium-gray">Expected ROI</div>
            </div>
          </div>

          {/* Property Types */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-primary-dark mb-4">
              Property Types Available
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {location.features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <FiHome className="w-5 h-5 text-main-gold mr-3" />
                  <span className="text-medium-gray">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Why Choose */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-primary-dark mb-4">
              Why Choose {location.name}?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {location.whyChoose.map((reason, index) => (
                <div key={index} className="flex items-center">
                  <FiStar className="w-5 h-5 text-main-gold mr-3" />
                  <span className="text-medium-gray">{reason}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-ocean-blue to-teal-turquoise text-pure-white p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">
              Ready to Invest in {location.name}?
            </h3>
            <p className="mb-4">
              Explore our exclusive property portfolio in this premium location.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  onClose();
                  navigate("/properties", {
                    state: { filterCity: location.name },
                  });
                }}
                className="bg-main-gold hover:bg-dark-gold text-pure-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                View Properties
              </button>
              <button
                onClick={() => {
                  onClose();
                  navigate("/contact");
                }}
                className="bg-overlay-white text-primary-dark hover:bg-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-off-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-ocean-blue to-teal-turquoise text-pure-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold font-[Playfair_Display] mb-4">
            Premium Coastal Destinations
          </h1>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto mb-8">
            Discover why these three coastal cities represent the pinnacle of
            luxury real estate investment opportunities
          </p>
          <div className="flex justify-center items-center space-x-8 text-sm">
            <div className="flex items-center">
              <FiTrendingUp className="w-5 h-5 mr-2" />
              <span>High ROI Potential</span>
            </div>
            <div className="flex items-center">
              <FiShield className="w-5 h-5 mr-2" />
              <span>Secure Investment</span>
            </div>
            <div className="flex items-center">
              <FiAward className="w-5 h-5 mr-2" />
              <span>Premium Locations</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        {/* Why Coastal Cities */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-[Playfair_Display] text-primary-dark mb-6">
            Why Coastal Properties?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-main-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-primary-dark mb-2">
                Higher Appreciation
              </h3>
              <p className="text-medium-gray">
                Coastal properties typically appreciate 2-3x faster than inland
                properties
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-main-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <FiSun className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-primary-dark mb-2">
                Lifestyle Premium
              </h3>
              <p className="text-medium-gray">
                Unmatched quality of life with year-round outdoor activities
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-main-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <FiShield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-primary-dark mb-2">
                Limited Supply
              </h3>
              <p className="text-medium-gray">
                Finite oceanfront land ensures long-term value preservation
              </p>
            </div>
          </div>
        </div>

        {/* Locations Grid */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold font-[Playfair_Display] text-primary-dark text-center mb-12">
            Our Premium Locations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {locations.map((location) => (
              <LocationCard
                key={location.id}
                location={location}
                onClick={setSelectedLocation}
              />
            ))}
          </div>
        </div>

        {/* Why Choose Sunrise Property */}
        <div className="bg-pure-white rounded-xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold font-[Playfair_Display] text-primary-dark text-center mb-8">
            Why Choose Sunrise Property for Coastal Investments?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-main-gold rounded-full flex items-center justify-center mx-auto mb-3">
                <FiAward className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-primary-dark mb-2">
                Local Expertise
              </h3>
              <p className="text-medium-gray text-sm">
                15+ years specializing in luxury coastal properties
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-main-gold rounded-full flex items-center justify-center mx-auto mb-3">
                <FiWifi className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-primary-dark mb-2">
                Global Network
              </h3>
              <p className="text-medium-gray text-sm">
                International partnerships for seamless transactions
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-main-gold rounded-full flex items-center justify-center mx-auto mb-3">
                <FiShield className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-primary-dark mb-2">
                Proven Results
              </h3>
              <p className="text-medium-gray text-sm">
                $2B+ in successful coastal property transactions
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-main-gold rounded-full flex items-center justify-center mx-auto mb-3">
                <FiStar className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-primary-dark mb-2">
                White-Glove Service
              </h3>
              <p className="text-medium-gray text-sm">
                Personalized concierge service for every client
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-ocean-blue to-teal-turquoise text-pure-white p-8 rounded-xl">
            <h2 className="text-3xl font-bold font-[Playfair_Display] mb-4">
              Ready to Invest in Paradise?
            </h2>
            <p className="text-xl mb-6 max-w-2xl mx-auto">
              Contact our coastal property specialists today to explore
              exclusive opportunities in these premium destinations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/properties")}
                className="bg-main-gold hover:bg-dark-gold text-pure-white px-8 py-4 rounded-lg font-medium text-lg transition-colors"
              >
                Browse All Properties
              </button>
              <button
                onClick={() => navigate("/contact")}
                className="bg-overlay-white text-primary-dark hover:bg-white px-8 py-4 rounded-lg font-medium text-lg transition-colors"
              >
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Location Modal */}
      {selectedLocation && (
        <LocationModal
          location={selectedLocation}
          onClose={() => setSelectedLocation(null)}
        />
      )}
    </div>
  );
};

export default LocationsPage;
