import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { useAdmin } from "hooks/useAdmin";
import PropertyForm from "components/admin/PropertyForm";

const AdminPropertyEdit = () => {
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

  const handleSuccess = () => {
    navigate("/admin/properties");
  };

  const handleCancel = () => {
    navigate("/admin/properties");
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
      <div className="flex items-center gap-4">
        <button
          onClick={handleCancel}
          className="p-2 text-medium-gray hover:text-primary-dark hover:bg-light-section-background rounded-lg transition-colors"
        >
          <FiArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-primary-dark">
            Edit Property
          </h1>
          <p className="text-medium-gray mt-1">Update property information</p>
        </div>
      </div>

      <PropertyForm
        property={property}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default AdminPropertyEdit;
