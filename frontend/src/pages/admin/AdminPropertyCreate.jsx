import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import PropertyForm from "components/admin/PropertyForm";

const AdminPropertyCreate = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate("/admin/properties");
  };

  const handleCancel = () => {
    navigate("/admin/properties");
  };

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
            Add New Property
          </h1>
          <p className="text-medium-gray mt-1">Create a new property listing</p>
        </div>
      </div>

      <PropertyForm onSuccess={handleSuccess} onCancel={handleCancel} />
    </div>
  );
};

export default AdminPropertyCreate;
