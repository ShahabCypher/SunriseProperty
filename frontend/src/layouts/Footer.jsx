import { Link } from "react-router-dom";
import { MdOutlineMail, MdOutlineSmartphone } from "react-icons/md";
import { CiGlobe } from "react-icons/ci";
import { PiHouseLineLight } from "react-icons/pi";
import { motion } from "motion/react";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeIn" }}
      viewport={{ once: true }}
      className="bg-primary-dark pb-20"
    >
      <div className="container mx-auto flex flex-wrap justify-between px-15 *:w-100 *:mt-20">
        <div>
          <h5 className="text-main-gold text-2xl font-[Playfair_Display] font-[500]">
            Sunrise Property
          </h5>
          <p className="text-gray-300 mt-5">
            Your gateway to the world's most exclusive coastal properties. We
            specialize in luxury real estate across Dubai, Los Angeles, and
            Miami's most prestigious waterfront communities.
          </p>
          <p className="text-main-gold font-[Playfair_Display] text-lg mt-5">
            🏆 Luxury Real Estate Excellence Award 2024
          </p>
        </div>
        <div>
          <h5 className="text-main-gold text-2xl font-[Playfair_Display] font-[500]">
            Luxury Markets
          </h5>
          <div className="mt-5 flex flex-col gap-2 *:text-gray-300  *:hover:text-main-gold *:transform *:hover:translate-x-2 *:transition-all *:duration-300 *:w-fit">
            <a href="/properties?city=Dubai">🏝️ Dubai Properties</a>
            <a href="/properties?city=Los Angeles">🌴 Los Angeles Properties</a>
            <a href="/properties?city=Miami">🏖️ Miami Properties</a>
            <a href="/properties?city=Malibu">🌊 Malibu Beach Houses</a>
          </div>
        </div>
        <div>
          <h5 className="text-main-gold text-2xl font-[Playfair_Display] font-[500]">
            Connect With Us
          </h5>
          <div className="mt-5 flex flex-col gap-2 *:flex *:items-center *:gap-2 *:text-gray-300">
            <a href="mailto:sunrise@property.com">
              📧 contact@sunriseproperty.com
            </a>
            <a href="tel:+15550001111">📞 +1 555-000-1111</a>
            <p>🌐 Available 24/7 Worldwide</p>
          </div>
          <div className="mt-5 flex justify-between w-1/2 **:hover:text-main-gold **:transform **:hover:scale-110 **:transition-all **:duration-300">
            <a href="tel:+15550001111">
              <MdOutlineSmartphone className="text-gray-300 text-3xl" />
            </a>
            <Link to="/">
              <PiHouseLineLight className="text-gray-300 text-3xl" />
            </Link>
            <Link to="/">
              <CiGlobe className="text-gray-300 text-3xl" />
            </Link>
            <a href="mailto:sunrise@property.com">
              <MdOutlineMail className="text-gray-300 text-3xl" />
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
