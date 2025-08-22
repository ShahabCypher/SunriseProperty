import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiSettings, FiMenu, FiX } from "react-icons/fi";
import { useAuth } from "hooks/useAuth";

const Header = () => {
  const { isAuthenticated, user, logout, loading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const canAccessAdmin = user?.role === "admin" || user?.role === "agent";

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-pure-white/95 backdrop-blur-md shadow-lg"
          : "bg-off-white"
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-extrabold font-[Playfair_Display] bg-gradient-to-r from-light-gold to-dark-gold text-transparent bg-clip-text drop-shadow-[0_0_5px_rgba(0,0,0,0.1)]">
              <Link to="/" onClick={closeMobileMenu} className="block">
                <span className="hidden sm:inline">Sunrise Property</span>
                <span className="sm:hidden">Sunrise</span>
              </Link>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
            <nav className="flex space-x-4 lg:space-x-6 xl:space-x-8">
              {[
                { to: "/", label: "Home" },
                { to: "/properties", label: "Properties" },
                { to: "/locations", label: "Locations" },
                { to: "/contact", label: "Contact" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm lg:text-base text-secondary-dark hover:text-light-gold transition-all duration-300 font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Authentication */}
            <div className="flex items-center space-x-3">
              {loading ? (
                <div className="w-20 lg:w-24 h-8 lg:h-10 bg-gray-200 animate-pulse rounded-full"></div>
              ) : isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <span className="hidden lg:block text-sm text-secondary-dark font-medium max-w-32 truncate">
                    Welcome, {user?.name}
                  </span>

                  {canAccessAdmin && (
                    <Link
                      to="/admin"
                      className="flex items-center text-xs lg:text-sm text-dark-gold border-2 border-light-gold px-3 lg:px-4 py-2 lg:py-2.5 rounded-full hover:bg-gradient-to-r hover:from-light-gold hover:to-dark-gold hover:text-white transform hover:translate-y-[-2px] transition-all duration-300 ease-in-out"
                      title="Admin Panel"
                    >
                      <FiSettings className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" />
                      <span className="hidden lg:inline">Admin</span>
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="text-xs lg:text-sm text-dark-gold border-2 border-light-gold px-3 lg:px-4 py-2 lg:py-2.5 rounded-full hover:bg-gradient-to-r hover:from-light-gold hover:to-dark-gold hover:text-white transform hover:translate-y-[-2px] transition-all duration-300 ease-in-out"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2 lg:space-x-3">
                  <Link
                    to="/auth/signin"
                    className="text-xs lg:text-sm text-dark-gold border-2 border-light-gold px-3 lg:px-4 py-2 lg:py-2.5 rounded-full hover:bg-gradient-to-r hover:from-light-gold hover:to-dark-gold hover:text-white transform hover:translate-y-[-2px] transition-all duration-300 ease-in-out"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/auth/signup"
                    className="text-xs lg:text-sm bg-gradient-to-r from-light-gold to-dark-gold text-white px-3 lg:px-4 py-2 lg:py-2.5 rounded-full transform hover:translate-y-[-2px] transition-all duration-300 ease-in-out hover:shadow-lg"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <FiX className="w-6 h-6 text-secondary-dark" />
            ) : (
              <FiMenu className="w-6 h-6 text-secondary-dark" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-screen opacity-100 visible"
              : "max-h-0 opacity-0 invisible overflow-hidden"
          }`}
        >
          <div className="pb-4 space-y-1">
            {/* Mobile Navigation Links */}
            <div className="pt-4 pb-3 space-y-1">
              {[
                { to: "/", label: "Home" },
                { to: "/properties", label: "Properties" },
                { to: "/locations", label: "Locations" },
                { to: "/contact", label: "Contact" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={closeMobileMenu}
                  className="block px-4 py-3 text-base text-secondary-dark hover:text-light-gold hover:bg-light-section-background transition-all duration-200 rounded-lg mx-2"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile Authentication Section */}
            <div className="border-t border-gray-200 pt-4 px-2">
              {loading ? (
                <div className="w-full h-12 bg-gray-200 animate-pulse rounded-lg"></div>
              ) : isAuthenticated ? (
                <div className="space-y-3">
                  {user && (
                    <div className="px-4 py-2 text-secondary-dark font-medium text-center bg-light-section-background rounded-lg">
                      Welcome, {user.name}
                    </div>
                  )}

                  {canAccessAdmin && (
                    <Link
                      to="/admin"
                      onClick={closeMobileMenu}
                      className="flex items-center justify-center text-dark-gold border-2 border-light-gold px-4 py-3 rounded-lg hover:bg-gradient-to-r hover:from-light-gold hover:to-dark-gold hover:text-white transition-all duration-300 ease-in-out"
                    >
                      <FiSettings className="w-4 h-4 mr-2" />
                      Admin Panel
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full text-dark-gold border-2 border-light-gold px-4 py-3 rounded-lg hover:bg-gradient-to-r hover:from-light-gold hover:to-dark-gold hover:text-white transition-all duration-300 ease-in-out"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Link
                    to="/auth/signin"
                    onClick={closeMobileMenu}
                    className="block text-center text-dark-gold border-2 border-light-gold px-4 py-3 rounded-lg hover:bg-gradient-to-r hover:from-light-gold hover:to-dark-gold hover:text-white transition-all duration-300 ease-in-out"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/auth/signup"
                    onClick={closeMobileMenu}
                    className="block text-center bg-gradient-to-r from-light-gold to-dark-gold text-white px-4 py-3 rounded-lg transition-all duration-300 ease-in-out hover:shadow-lg"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
