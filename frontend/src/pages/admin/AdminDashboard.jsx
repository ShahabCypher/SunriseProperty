import { useState, useEffect } from "react";
import { FiHome, FiDollarSign, FiEye, FiStar } from "react-icons/fi";
import { useAdmin } from "hooks/useAdmin";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentProperties, setRecentProperties] = useState([]);
  const { getPropertyStats, getAllProperties, loading } = useAdmin();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [statsResponse, propertiesResponse] = await Promise.all([
        getPropertyStats(),
        getAllProperties({ limit: 5, sortBy: "createdAt", sortOrder: "desc" }),
      ]);

      setStats(statsResponse.data);
      setRecentProperties(propertiesResponse.data.properties);
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-pure-white rounded-xl shadow-md border border-gray-200 p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs sm:text-sm font-medium text-medium-gray">
            {title}
          </p>
          <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary-dark mt-1">
            {value}
          </p>
        </div>
        <div
          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${color} flex items-center justify-center`}
        >
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-pure-white" />
        </div>
      </div>
    </div>
  );

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: price.currency || "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price.amount);
  };

  if (loading && !stats) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-main-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const overallStats = stats?.overall || {};
  const typeStats = stats?.byType || [];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-dark">
          Dashboard
        </h1>
        <p className="text-medium-gray mt-1 sm:mt-2 text-sm sm:text-base">
          Overview of your property management system
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Total Properties"
          value={overallStats.totalProperties || 0}
          icon={FiHome}
          color="bg-blue-500"
        />
        <StatCard
          title="Available Properties"
          value={overallStats.availableProperties || 0}
          icon={FiDollarSign}
          color="bg-green-500"
        />
        <StatCard
          title="Sold Properties"
          value={overallStats.soldProperties || 0}
          icon={FiStar}
          color="bg-main-gold"
        />
        <StatCard
          title="Total Views"
          value={overallStats.totalViews || 0}
          icon={FiEye}
          color="bg-purple-500"
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
        {/* Property Types */}
        <div className="bg-pure-white rounded-xl shadow-md border border-gray-200 p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-semibold text-primary-dark mb-4 sm:mb-6">
            Property Types
          </h3>
          <div className="space-y-3 sm:space-y-4">
            {typeStats.map((type) => (
              <div key={type._id} className="flex items-center justify-between">
                <span className="text-medium-gray capitalize text-sm sm:text-base">
                  {type._id}
                </span>
                <span className="font-semibold text-primary-dark text-sm sm:text-base">
                  {type.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-pure-white rounded-xl shadow-md border border-gray-200 p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-semibold text-primary-dark mb-4 sm:mb-6">
            Quick Stats
          </h3>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-medium-gray text-sm sm:text-base">
                Average Price
              </span>
              <span className="font-semibold text-primary-dark text-sm sm:text-base">
                ${overallStats.averagePrice?.toLocaleString() || 0}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-medium-gray text-sm sm:text-base">
                Rented Properties
              </span>
              <span className="font-semibold text-primary-dark text-sm sm:text-base">
                {overallStats.rentedProperties || 0}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Properties */}
      <div className="bg-pure-white rounded-xl shadow-md border border-gray-200 p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl font-semibold text-primary-dark">
            Recent Properties
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-2 sm:px-4 font-medium text-medium-gray text-sm sm:text-base">
                  Property
                </th>
                <th className="text-left py-3 px-2 sm:px-4 font-medium text-medium-gray text-sm sm:text-base">
                  Price
                </th>
                <th className="text-left py-3 px-2 sm:px-4 font-medium text-medium-gray text-sm sm:text-base">
                  Status
                </th>
                <th className="text-left py-3 px-2 sm:px-4 font-medium text-medium-gray text-sm sm:text-base">
                  Views
                </th>
                <th className="text-left py-3 px-2 sm:px-4 font-medium text-medium-gray text-sm sm:text-base">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {recentProperties.map((property) => (
                <tr
                  key={property._id}
                  className="border-b border-gray-100 hover:bg-light-section-background transition-colors"
                >
                  <td className="py-3 px-2 sm:px-4">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-very-light-blue rounded-lg flex items-center justify-center">
                        🏠
                      </div>
                      <div>
                        <p className="font-semibold text-primary-dark text-sm sm:text-base line-clamp-1">
                          {property.title}
                        </p>
                        <p className="text-medium-gray text-xs sm:text-sm">
                          {property.location?.city}, {property.location?.state}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-2 sm:px-4 text-sm sm:text-base font-semibold text-primary-dark">
                    {formatPrice(property.price)}
                  </td>
                  <td className="py-3 px-2 sm:px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        property.status === "available"
                          ? "bg-green-100 text-green-800"
                          : property.status === "sold"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {property.status}
                    </span>
                  </td>
                  <td className="py-3 px-2 sm:px-4 text-sm sm:text-base text-medium-gray">
                    {property.views || 0}
                  </td>
                  <td className="py-3 px-2 sm:px-4 text-sm sm:text-base text-medium-gray">
                    {new Date(property.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {recentProperties.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <p className="text-medium-gray text-sm sm:text-base">
              No properties found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
