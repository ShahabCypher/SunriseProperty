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
    <div className="bg-pure-white rounded-lg shadow-md border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-medium-gray">{title}</p>
          <p className="text-2xl font-bold text-primary-dark mt-1">{value}</p>
        </div>
        <div
          className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center`}
        >
          <Icon className="w-6 h-6 text-pure-white" />
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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-primary-dark">Dashboard</h1>
        <p className="text-medium-gray mt-1">
          Overview of your property management system
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-pure-white rounded-lg shadow-md border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-primary-dark mb-4">
            Property Types
          </h3>
          <div className="space-y-3">
            {typeStats.map((type) => (
              <div key={type._id} className="flex items-center justify-between">
                <span className="text-medium-gray capitalize">{type._id}</span>
                <span className="font-semibold text-primary-dark">
                  {type.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-pure-white rounded-lg shadow-md border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-primary-dark mb-4">
            Quick Stats
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-medium-gray">Average Price</span>
              <span className="font-semibold text-primary-dark">
                ${overallStats.averagePrice?.toLocaleString() || 0}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-medium-gray">Rented Properties</span>
              <span className="font-semibold text-primary-dark">
                {overallStats.rentedProperties || 0}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-pure-white rounded-lg shadow-md border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-primary-dark">
            Recent Properties
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-medium-gray">
                  Property
                </th>
                <th className="text-left py-3 px-4 font-medium text-medium-gray">
                  Type
                </th>
                <th className="text-left py-3 px-4 font-medium text-medium-gray">
                  Price
                </th>
                <th className="text-left py-3 px-4 font-medium text-medium-gray">
                  Status
                </th>
                <th className="text-left py-3 px-4 font-medium text-medium-gray">
                  Created
                </th>
              </tr>
            </thead>
            <tbody>
              {recentProperties.map((property) => (
                <tr key={property._id} className="border-b border-gray-100">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-light-section-background rounded-lg flex items-center justify-center mr-3">
                        <FiHome className="w-5 h-5 text-medium-gray" />
                      </div>
                      <div>
                        <p className="font-medium text-primary-dark">
                          {property.name}
                        </p>
                        <p className="text-sm text-medium-gray">
                          {property.location?.city}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 capitalize text-medium-gray">
                    {property.propertyType}
                  </td>
                  <td className="py-3 px-4 font-semibold text-primary-dark">
                    {formatPrice(property.price)}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        property.status === "available"
                          ? "bg-green-100 text-green-800"
                          : property.status === "sold"
                          ? "bg-red-100 text-red-800"
                          : property.status === "rented"
                          ? "bg-blue-100 text-blue-800"
                          : property.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {property.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-medium-gray">
                    {new Date(property.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
