import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiFilter,
  FiGrid,
  FiList,
  FiMapPin,
  FiHome,
  FiStar,
} from "react-icons/fi";
import PropertyService from "services/propertyService";
import PropertyCard from "components/public/PropertyCard";
import PropertyModal from "components/public/PropertyModal";

const PropertiesPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState("grid");

  // Initialize filters with city from location state if available
  const [filters, setFilters] = useState({
    search: "",
    city: location.state?.filterCity || "",
    propertyType: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    bathrooms: "",
    sortBy: "createdAt",
    sortOrder: "desc",
    page: 1,
    limit: 12,
  });

  const cities = ["Los Angeles", "Dubai", "Miami"];
  const propertyTypes = [
    "house",
    "apartment",
    "condo",
    "townhouse",
    "villa",
    "studio",
  ];

  useEffect(() => {
    loadProperties();
  }, [filters]);

  // Handle city filter from location state
  useEffect(() => {
    if (location.state?.filterCity) {
      setFilters((prev) => ({
        ...prev,
        city: location.state.filterCity,
      }));
    }
  }, [location.state]);

  const loadProperties = async () => {
    setLoading(true);
    try {
      const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(([key, value]) => value !== "")
      );

      const response = await PropertyService.getAllProperties(cleanFilters);
      setProperties(response.data.properties);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error("Failed to load properties:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1,
    }));
  };

  const handlePropertyClick = (property) => {
    setSelectedProperty(property);
    setShowModal(true);
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const renderPagination = () => {
    if (!pagination.totalPages || pagination.totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    const start = Math.max(
      1,
      pagination.currentPage - Math.floor(maxVisiblePages / 2)
    );
    const end = Math.min(pagination.totalPages, start + maxVisiblePages - 1);

    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-4 py-2 rounded-lg ${
            i === pagination.currentPage
              ? "bg-main-gold text-pure-white"
              : "bg-pure-white text-medium-gray hover:bg-light-section-background"
          }`}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="flex justify-center items-center space-x-2 mt-8">
        {pagination.currentPage > 1 && (
          <button
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            className="px-4 py-2 bg-pure-white text-medium-gray rounded-lg hover:bg-light-section-background"
          >
            Previous
          </button>
        )}
        {pages}
        {pagination.currentPage < pagination.totalPages && (
          <button
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            className="px-4 py-2 bg-pure-white text-medium-gray rounded-lg hover:bg-light-section-background"
          >
            Next
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-off-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-ocean-blue to-teal-turquoise text-pure-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold font-[Playfair_Display] mb-4">
            Discover Your Dream Property
          </h1>
          <p className="text-xl text-gray-100 max-w-2xl mx-auto mb-6">
            Explore our exclusive collection of luxury properties in the world's
            most desirable coastal destinations
          </p>
          {location.state?.filterCity && (
            <div className="inline-flex items-center bg-main-gold text-primary-dark px-6 py-2 rounded-full font-medium">
              <FiMapPin className="w-4 h-4 mr-2" />
              Showing properties in {location.state.filterCity}
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Filters */}
        <div className="bg-pure-white rounded-lg shadow-md border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-4">
            {/* Search */}
            <div className="relative col-span-2">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-medium-gray w-4 h-4" />
              <input
                type="text"
                placeholder="Search properties..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main-gold focus:border-main-gold"
              />
            </div>

            {/* City Filter */}
            <select
              value={filters.city}
              onChange={(e) => handleFilterChange("city", e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main-gold focus:border-main-gold"
            >
              <option value="">All Cities</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>

            {/* Type Filter */}
            <select
              value={filters.propertyType}
              onChange={(e) =>
                handleFilterChange("propertyType", e.target.value)
              }
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main-gold focus:border-main-gold"
            >
              <option value="">All Types</option>
              {propertyTypes.map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>

            {/* Bedrooms */}
            <select
              value={filters.bedrooms}
              onChange={(e) => handleFilterChange("bedrooms", e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main-gold focus:border-main-gold"
            >
              <option value="">Any Beds</option>
              <option value="1">1+ Bed</option>
              <option value="2">2+ Beds</option>
              <option value="3">3+ Beds</option>
              <option value="4">4+ Beds</option>
              <option value="5">5+ Beds</option>
            </select>

            {/* Bathrooms */}
            <select
              value={filters.bathrooms}
              onChange={(e) => handleFilterChange("bathrooms", e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main-gold focus:border-main-gold"
            >
              <option value="">Any Baths</option>
              <option value="1">1+ Bath</option>
              <option value="2">2+ Baths</option>
              <option value="3">3+ Baths</option>
              <option value="4">4+ Baths</option>
            </select>
          </div>

          {/* Price Range */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input
              type="number"
              placeholder="Min Price"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange("minPrice", e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main-gold focus:border-main-gold"
            />
            <input
              type="number"
              placeholder="Max Price"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main-gold focus:border-main-gold"
            />

            {/* Sort */}
            <select
              value={`${filters.sortBy}-${filters.sortOrder}`}
              onChange={(e) => {
                const [sortBy, sortOrder] = e.target.value.split("-");
                handleFilterChange("sortBy", sortBy);
                handleFilterChange("sortOrder", sortOrder);
              }}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main-gold focus:border-main-gold"
            >
              <option value="createdAt-desc">Newest First</option>
              <option value="createdAt-asc">Oldest First</option>
              <option value="price.amount-asc">Price: Low to High</option>
              <option value="price.amount-desc">Price: High to Low</option>
              <option value="name-asc">Name A-Z</option>
              <option value="name-desc">Name Z-A</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex justify-between items-center">
            <div className="text-medium-gray">
              {pagination.total || 0} properties found
              {filters.city && (
                <span className="ml-2 text-main-gold">in {filters.city}</span>
              )}
            </div>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 ${
                  viewMode === "grid"
                    ? "bg-main-gold text-pure-white"
                    : "bg-pure-white text-medium-gray hover:bg-gray-50"
                }`}
              >
                <FiGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 ${
                  viewMode === "list"
                    ? "bg-main-gold text-pure-white"
                    : "bg-pure-white text-medium-gray hover:bg-gray-50"
                }`}
              >
                <FiList className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-2 border-main-gold border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Properties Grid */}
        {!loading && properties.length > 0 && (
          <>
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-4"
              }
            >
              {properties.map((property) => (
                <PropertyCard
                  key={property._id}
                  property={property}
                  viewMode={viewMode}
                  onClick={() => handlePropertyClick(property)}
                />
              ))}
            </div>

            {renderPagination()}
          </>
        )}

        {/* Empty State */}
        {!loading && properties.length === 0 && (
          <div className="text-center py-16">
            <FiHome className="w-16 h-16 text-medium-gray mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-primary-dark mb-2">
              No Properties Found
            </h3>
            <p className="text-medium-gray mb-6">
              Try adjusting your search criteria to find more properties.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => navigate("/locations")}
                className="bg-main-gold hover:bg-dark-gold text-pure-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Explore Locations
              </button>
              <button
                onClick={() => navigate("/contact")}
                className="bg-pure-white text-main-gold border border-main-gold hover:bg-main-gold hover:text-pure-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Contact Us
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Property Modal */}
      {showModal && selectedProperty && (
        <PropertyModal
          property={selectedProperty}
          onClose={() => {
            setShowModal(false);
            setSelectedProperty(null);
          }}
        />
      )}
    </div>
  );
};

export default PropertiesPage;
