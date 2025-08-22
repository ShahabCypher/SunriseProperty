import { FiLoader } from "react-icons/fi";

const AdminLoadingState = ({ message = "Loading..." }) => {
  return (
    <div className="flex items-center justify-center h-64 bg-pure-white rounded-lg shadow-md border border-gray-200">
      <div className="text-center">
        <FiLoader className="w-8 h-8 text-main-gold mx-auto mb-4 animate-spin" />
        <p className="text-medium-gray">{message}</p>
      </div>
    </div>
  );
};

export default AdminLoadingState;
