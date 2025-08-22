import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-header-background fixed top-0 left-0 right-0 z-50 w-full shadow-lg">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center h-25">
        <h1 className="text-4xl font-extrabold font-[Playfair_Display] bg-gradient-to-r from-light-gold to-dark-gold text-transparent bg-clip-text">
          <Link to="/">Sunrise Property</Link>
        </h1>
        <div className="flex gap-10 *:hover:text-light-gold *:transition-all *:duration-300">
          <Link>Home</Link>
          <Link>Properties</Link>
          <Link>Locations</Link>
          <Link>Contact</Link>
        </div>
        <div className="flex gap-4">
          <Link
            to="/signin"
            className="text-dark-gold border-2 border-light-gold px-7 py-5 rounded-full hover:bg-gradient-to-r hover:from-light-gold hover:to-dark-gold hover:text-white transform hover:translate-y-[-5px] transition-all duration-300 ease-in-out"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="bg-gradient-to-r from-light-gold to-dark-gold text-white text-lg px-7 py-5 rounded-full transform hover:translate-y-[-5px] transition-all duration-300 ease-in-out"
          >
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
