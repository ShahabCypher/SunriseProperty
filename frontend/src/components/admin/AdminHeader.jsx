import { useState } from "react";
import { FiUser, FiLogOut } from "react-icons/fi";
import { useAppSelector } from "store/hooks";
import { selectUser } from "store/slices/authSlice";
import { useAuth } from "hooks/useAuth";

const AdminHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const user = useAppSelector(selectUser);
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="bg-pure-white border-b border-gray-200 h-16 flex items-center justify-between px-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold text-primary-dark">
          Property Management
        </h1>
      </div>

      <div className="flex items-center">
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-light-section-background transition-colors"
          >
            <div className="w-8 h-8 bg-main-gold rounded-full flex items-center justify-center">
              <FiUser className="h-4 w-4 text-pure-white" />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-primary-dark">
                {user?.name}
              </p>
              <p className="text-xs text-medium-gray capitalize">
                {user?.role}
              </p>
            </div>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-pure-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-sm text-medium-gray hover:bg-light-section-background hover:text-primary-dark"
              >
                <FiLogOut className="mr-3 h-4 w-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
