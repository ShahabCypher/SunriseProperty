import { useState } from "react";
import { FiUser, FiLogOut, FiMenu } from "react-icons/fi";
import { useAppSelector } from "store/hooks";
import { selectUser } from "store/slices/authSlice";
import { useAuth } from "hooks/useAuth";

const AdminHeader = ({ onToggleSidebar }) => {
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
    <header className="bg-pure-white border-b border-gray-200 h-16 sm:h-18 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-20">
      <div className="flex items-center space-x-3">
        {/* Mobile Menu Button */}
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-lg hover:bg-light-section-background transition-colors"
          aria-label="Toggle sidebar"
        >
          <FiMenu className="h-5 w-5 text-primary-dark" />
        </button>

        <h1 className="text-base sm:text-lg font-semibold text-primary-dark">
          Property Management
        </h1>
      </div>

      <div className="flex items-center">
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg hover:bg-light-section-background transition-colors"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-main-gold rounded-full flex items-center justify-center">
              <FiUser className="h-3 w-3 sm:h-4 sm:w-4 text-pure-white" />
            </div>
            <div className="text-left hidden sm:block">
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
              {/* Mobile user info */}
              <div className="sm:hidden px-4 py-3 border-b border-gray-200">
                <p className="text-sm font-medium text-primary-dark">
                  {user?.name}
                </p>
                <p className="text-xs text-medium-gray capitalize">
                  {user?.role}
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-sm text-medium-gray hover:bg-light-section-background hover:text-primary-dark transition-colors"
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
