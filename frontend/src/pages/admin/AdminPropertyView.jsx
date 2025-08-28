import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiEdit, FiMapPin, FiStar } from "react-icons/fi";

import { useAdmin } from "hooks/useAdmin";
import PropertyMap from "components/public/PropertyMap";

const AdminPropertyView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const { getProperty, loading } = useAdmin();

  useEffect(() => {
    loadProperty();
  }, [id]);

  const loadProperty = async () => {
    try {
      const response = await getProperty(id);
      setProperty(response.data.property);
    } catch (error) {
      console.error("Failed to load property:", error);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: price.currency || "USD",
    }).format(price.amount);
  };

  const getStatusColor = (status) => {
    const colors = {
      available: "bg-green-100 text-green-800",
      sold: "bg-red-100 text-red-800",
      rented: "bg-blue-100 text-blue-800",
      pending: "bg-yellow-100 text-yellow-800",
      "off-market": "bg-gray-100 text-gray-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-main-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold text-primary-dark mb-2">
          Property Not Found
        </h3>
        <button
          onClick={() => navigate("/admin/properties")}
          className="text-main-gold hover:text-dark-gold"
        >
          Back to Properties
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/admin/properties")}
            className="p-2 text-medium-gray hover:text-primary-dark hover:bg-light-section-background rounded-lg transition-colors"
          >
            <FiArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-primary-dark">
              {property.name}
            </h1>
            <p className="text-medium-gray mt-1">Property Details</p>
          </div>
        </div>

        <button
          onClick={() => navigate(`/admin/properties/${id}/edit`)}
          className="flex items-center px-4 py-2 bg-main-gold text-pure-white rounded-lg hover:bg-dark-gold transition-colors"
        >
          <FiEdit className="w-4 h-4 mr-2" />
          Edit Property
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Images */}
          {property.images && property.images.length > 0 && (
            <div className="bg-pure-white rounded-lg shadow-md border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-primary-dark mb-4">
                Images
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {property.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={`${import.meta.env.VITE_API_URL}${image.url}`}
                      alt={image.alt || `${property.name} image ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    {image.isPrimary && (
                      <span className="absolute top-2 left-2 bg-main-gold text-pure-white px-2 py-1 rounded text-xs">
                        Primary
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="bg-pure-white rounded-lg shadow-md border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-primary-dark mb-4">
              Description
            </h3>
            <p className="text-medium-gray leading-relaxed">
              {property.description}
            </p>
          </div>

          {property.location?.coordinates?.coordinates && (
            <div className="mb-4 sm:mb-6 bg-pure-white rounded-lg shadow-md border border-gray-200 p-6">
              <h3 className="text-lg sm:text-xl font-semibold text-primary-dark mb-3 flex items-center">
                <FiMapPin className="w-5 h-5 mr-2" /> Map
              </h3>
              <PropertyMap
                property={property}
                className="h-56 sm:h-72 md:h-80"
              />
            </div>
          )}

          {/* Features */}
          {property.features && property.features.length > 0 && (
            <div className="bg-pure-white rounded-lg shadow-md border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-primary-dark mb-4">
                Features
              </h3>
              <div className="flex flex-wrap gap-2">
                {property.features.map((feature, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-light-section-background text-secondary-dark rounded-full text-sm"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {/* Basic Info */}
          <div className="bg-pure-white rounded-lg shadow-md border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-primary-dark">
                Property Info
              </h3>
              <div className="flex gap-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    property.status
                  )}`}
                >
                  {property.status}
                </span>
                {property.isFeatured && (
                  <span className="px-2 py-1 bg-main-gold text-pure-white rounded-full text-xs font-medium flex items-center">
                    <FiStar className="w-3 h-3 mr-1" />
                    Featured
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-medium-gray">Price</span>
                <span className="font-bold text-main-gold text-lg">
                  {formatPrice(property.price)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-medium-gray">Type</span>
                <span className="text-primary-dark capitalize">
                  {property.propertyType}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-medium-gray">Views</span>
                <span className="text-primary-dark">{property.views || 0}</span>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="bg-pure-white rounded-lg shadow-md border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-primary-dark mb-4 flex items-center">
              <FiMapPin className="w-5 h-5 mr-2" />
              Location
            </h3>
            <div className="space-y-2">
              <p className="text-primary-dark">{property.location.address}</p>
              <p className="text-medium-gray">
                {property.location.city}, {property.location.country}
              </p>
              {property.location.zipCode && (
                <p className="text-medium-gray">{property.location.zipCode}</p>
              )}
            </div>
          </div>

          {/* Property Details */}
          <div className="bg-pure-white rounded-lg shadow-md border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-primary-dark mb-4">
              Details
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-medium-gray">Bedrooms</span>
                <span className="text-primary-dark">
                  {property.details?.bedrooms || 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-medium-gray">Bathrooms</span>
                <span className="text-primary-dark">
                  {property.details?.bathrooms || 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-medium-gray">Area</span>
                <span className="text-primary-dark">
                  {property.details?.area?.value || 0}{" "}
                  {property.details?.area?.unit || "sq ft"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-medium-gray">Build Year</span>
                <span className="text-primary-dark">
                  {property.details?.buildYear || "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-medium-gray">Parking</span>
                <span className="text-primary-dark">
                  {property.details?.parking || 0} spots
                </span>
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="bg-pure-white rounded-lg shadow-md border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-primary-dark mb-4">
              Timeline
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-medium-gray">Listed</span>
                <span className="text-primary-dark">
                  {new Date(property.listedAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-medium-gray">Created</span>
                <span className="text-primary-dark">
                  {new Date(property.createdAt).toLocaleDateString()}
                </span>
              </div>
              {property.soldAt && (
                <div className="flex justify-between">
                  <span className="text-medium-gray">Sold</span>
                  <span className="text-primary-dark">
                    {new Date(property.soldAt).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPropertyView;
