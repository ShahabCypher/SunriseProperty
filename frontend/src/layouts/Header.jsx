import { Link } from "react-router-dom";
import { useAuth } from "hooks/useAuth";

const Header = () => {
  const { isAuthenticated, user, logout, loading } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="bg-white/50 backdrop-blur-md fixed top-0 left-0 right-0 z-50 w-full shadow-lg">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center h-25">
        <h1 className="text-4xl font-extrabold font-[Playfair_Display] bg-gradient-to-r from-light-gold to-dark-gold text-transparent bg-clip-text drop-shadow-[0_0_5px_rgba(0,0,0,0.1)]">
          <Link to="/">Sunrise Property</Link>
        </h1>
        <div className="flex gap-10 text-secondary-dark *:hover:text-light-gold *:transition-all *:duration-300">
          <Link to="/">Home</Link>
          <Link>Properties</Link>
          <Link>Locations</Link>
          <Link>Contact</Link>
        </div>

        {/* Authentication Section */}
        <div className="flex gap-4 items-center">
          {loading ? (
            <div className="w-24 h-10 bg-gray-200 animate-pulse rounded-full"></div>
          ) : isAuthenticated ? (
            <div className="flex items-center gap-4">
              {user && (
                <span className="text-secondary-dark font-medium">
                  Welcome, {user.name}
                </span>
              )}
              <button
                onClick={handleLogout}
                className="text-dark-gold border-2 border-light-gold px-7 py-5 rounded-full hover:bg-gradient-to-r hover:from-light-gold hover:to-dark-gold hover:text-white transform hover:translate-y-[-5px] transition-all duration-300 ease-in-out"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/auth/signin"
                className="text-dark-gold border-2 border-light-gold px-7 py-5 rounded-full hover:bg-gradient-to-r hover:from-light-gold hover:to-dark-gold hover:text-white transform hover:translate-y-[-5px] transition-all duration-300 ease-in-out"
              >
                Sign In
              </Link>
              <Link
                to="/auth/signup"
                className="bg-gradient-to-r from-light-gold to-dark-gold text-white text-lg px-7 py-5 rounded-full transform hover:translate-y-[-5px] transition-all duration-300 ease-in-out"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
