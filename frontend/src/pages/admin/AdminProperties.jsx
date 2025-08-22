import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiPlus, FiSearch, FiFilter, FiGrid, FiList } from "react-icons/fi";
import { useAdmin } from "hooks/useAdmin";
import PropertyCard from "components/admin/PropertyCard";

const AdminProperties = () => {
  const [properties, setProperties] = useState([]);
  const [pagination, setPagination] = useState({});
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    propertyType: "all",
    isFeatured: "",
    sortBy: "createdAt",
    sortOrder: "desc",
    page: 1,
    limit: 12,
  });
  const [viewMode, setViewMode] = useState("grid");

  const { getAllProperties, deleteProperty, loading, error } = useAdmin();

  useEffect(() => {
    loadProperties();
  }, [filters]);

  const loadProperties = async () => {
    try {
      const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(
          ([key, value]) => value !== "" && value !== "all"
        )
      );

      // If no status is specified, don't filter by status at all (show all statuses)
      const response = await getAllProperties(cleanFilters);
      setProperties(response.data.properties);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error("Failed to load properties:", error);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1, // Reset to first page when filtering
    }));
  };

  const handleDelete = async (propertyId) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        await deleteProperty(propertyId);
        loadProperties();
      } catch (error) {
        console.error("Failed to delete property:", error);
      }
    }
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const propertyTypes = [
    "house",
    "apartment",
    "condo",
    "townhouse",
    "villa",
    "studio",
    "commercial",
    "land",
  ];

  const statusOptions = [
    "available",
    "sold",
    "rented",
    "pending",
    "off-market",
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary-dark">Properties</h1>
          <p className="text-medium-gray mt-1">
            Manage all property listings ({pagination.total || 0} total)
          </p>
        </div>

        <Link
          to="/admin/properties/create"
          className="flex items-center px-4 py-2 bg-main-gold text-pure-white rounded-lg hover:bg-dark-gold transition-colors"
        >
          <FiPlus className="w-4 h-4 mr-2" />
          Add Property
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-pure-white rounded-lg shadow-md border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
          {/* Search */}
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-medium-gray w-4 h-4" />
            <input
              type="text"
              placeholder="Search properties..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main-gold focus:border-main-gold"
            />
          </div>

          {/* Status Filter */}
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main-gold focus:border-main-gold"
          >
            <option value="all">All Status</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>

          {/* Type Filter */}
          <select
            value={filters.propertyType}
            onChange={(e) => handleFilterChange("propertyType", e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main-gold focus:border-main-gold"
          >
            <option value="all">All Types</option>
            {propertyTypes.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>

          {/* Featured Filter */}
          <select
            value={filters.isFeatured}
            onChange={(e) => handleFilterChange("isFeatured", e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main-gold focus:border-main-gold"
          >
            <option value="">All Properties</option>
            <option value="true">Featured Only</option>
            <option value="false">Non-Featured</option>
          </select>

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
            <option value="price.amount-desc">Price: High to Low</option>
            <option value="price.amount-asc">Price: Low to High</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
          </select>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FiFilter className="w-4 h-4 text-medium-gray" />
            <span className="text-sm text-medium-gray">
              Showing {properties.length} of {pagination.total || 0} properties
            </span>
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

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-2 border-main-gold border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Properties Grid */}
      {!loading && properties.length > 0 && (
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
              onUpdate={loadProperties}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && properties.length === 0 && (
        <div className="text-center py-12 bg-pure-white rounded-lg shadow-md border border-gray-200">
          <FiGrid className="w-16 h-16 text-medium-gray mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-primary-dark mb-2">
            No Properties Found
          </h3>
          <p className="text-medium-gray mb-4">
            {Object.values(filters).some(
              (v) => v !== "" && v !== "all" && v !== 1 && v !== 12
            )
              ? "Try adjusting your filters to see more results."
              : "Get started by adding your first property."}
          </p>
          <Link
            to="/admin/properties/create"
            className="inline-flex items-center px-4 py-2 bg-main-gold text-pure-white rounded-lg hover:bg-dark-gold transition-colors"
          >
            <FiPlus className="w-4 h-4 mr-2" />
            Add Property
          </Link>
        </div>
      )}

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2">
          <button
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={pagination.page <= 1}
            className="px-3 py-2 border border-gray-300 rounded-lg text-medium-gray hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          {Array.from(
            { length: Math.min(5, pagination.totalPages) },
            (_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`px-3 py-2 rounded-lg ${
                    pageNum === pagination.page
                      ? "bg-main-gold text-pure-white"
                      : "border border-gray-300 text-medium-gray hover:bg-gray-50"
                  }`}
                >
                  {pageNum}
                </button>
              );
            }
          )}

          <button
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={pagination.page >= pagination.totalPages}
            className="px-3 py-2 border border-gray-300 rounded-lg text-medium-gray hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminProperties;
