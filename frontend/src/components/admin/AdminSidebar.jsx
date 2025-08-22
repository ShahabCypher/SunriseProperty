import { Link, useLocation } from "react-router-dom";
import { FiHome, FiGrid, FiPlus } from "react-icons/fi";

const AdminSidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navigationItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: FiHome,
    },
    {
      name: "Properties",
      path: "/admin/properties",
      icon: FiGrid,
    },
    {
      name: "Add Property",
      path: "/admin/properties/create",
      icon: FiPlus,
    },
  ];

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const handleLinkClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 fixed left-0 top-0 h-full z-30">
        <div className="w-64 bg-pure-white border-r border-gray-200 h-full">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-primary-dark">Admin Panel</h2>
            <p className="text-sm text-medium-gray mt-1">Property Management</p>
          </div>

          <nav className="mt-6">
            <ul className="space-y-1 px-4">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = isActivePath(item.path);

                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? "bg-main-gold text-pure-white shadow-md"
                          : "text-medium-gray hover:bg-light-section-background hover:text-primary-dark"
                      }`}
                    >
                      <Icon
                        className={`mr-3 h-5 w-5 ${
                          isActive ? "text-pure-white" : "text-current"
                        }`}
                      />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`lg:hidden fixed left-0 top-0 h-full w-64 bg-pure-white border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <h2 className="text-lg sm:text-xl font-bold text-primary-dark">
            Admin Panel
          </h2>
          <p className="text-xs sm:text-sm text-medium-gray mt-1">
            Property Management
          </p>
        </div>

        <nav className="mt-4 sm:mt-6">
          <ul className="space-y-1 px-3 sm:px-4">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = isActivePath(item.path);

              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={handleLinkClick}
                    className={`flex items-center px-3 sm:px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-main-gold text-pure-white shadow-md"
                        : "text-medium-gray hover:bg-light-section-background hover:text-primary-dark"
                    }`}
                  >
                    <Icon
                      className={`mr-3 h-5 w-5 ${
                        isActive ? "text-pure-white" : "text-current"
                      }`}
                    />
                    <span className="font-medium text-sm sm:text-base">
                      {item.name}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default AdminSidebar;
