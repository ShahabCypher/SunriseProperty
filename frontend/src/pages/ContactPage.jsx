import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiClock,
  FiUser,
  FiMessageSquare,
  FiSend,
  FiGlobe,
} from "react-icons/fi";
import { FaBuilding } from "react-icons/fa";
import { motion } from "motion/react";

const ContactPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    propertyInterest: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        propertyInterest: "",
      });

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }, 2000);
  };

  const scrollToForm = () => {
    const formElement = document.getElementById("contact-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const contactInfo = [
    {
      icon: FiPhone,
      title: "Phone",
      details: ["+971 4 123 4567", "+1 (555) 123-4567"],
      description: "Available 24/7 for urgent inquiries",
    },
    {
      icon: FiMail,
      title: "Email",
      details: ["info@sunriseproperty.com", "luxury@sunriseproperty.com"],
      description: "We respond within 2 hours",
    },
    {
      icon: FiGlobe,
      title: "Website",
      details: ["www.sunriseproperty.com"],
      description: "Explore our full portfolio online",
    },
  ];

  const offices = [
    {
      city: "Dubai",
      country: "United Arab Emirates",
      address: "Level 42, Burj Khalifa Tower, Downtown Dubai",
      phone: "+971 4 123 4567",
      email: "dubai@sunriseproperty.com",
      hours: "Sunday - Thursday: 9:00 AM - 6:00 PM",
      description:
        "Our flagship office in the heart of Dubai's business district",
      isHeadquarters: true,
    },
    {
      city: "Los Angeles",
      country: "United States",
      address: "9465 Wilshire Blvd, Suite 300, Beverly Hills, CA 90212",
      phone: "+1 (310) 555-0123",
      email: "la@sunriseproperty.com",
      hours: "Monday - Friday: 9:00 AM - 6:00 PM",
      description: "Serving the greater Los Angeles and Malibu areas",
    },
    {
      city: "Miami",
      country: "United States",
      address: "1000 Brickell Avenue, Suite 715, Miami, FL 33131",
      phone: "+1 (305) 555-0123",
      email: "miami@sunriseproperty.com",
      hours: "Monday - Friday: 9:00 AM - 6:00 PM",
      description: "Your gateway to South Florida luxury properties",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeIn" }}
      className="min-h-screen bg-off-white"
    >
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-ocean-blue to-teal-turquoise text-pure-white py-16 sm:py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-[Playfair_Display] mb-4 sm:mb-6 animate-fade-in">
            Get in Touch
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed">
            Connect with our luxury property experts. We're here to help you
            find your perfect coastal investment.
          </p>

          <button
            onClick={scrollToForm}
            className="mt-8 sm:mt-10 bg-main-gold hover:bg-dark-gold text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-full transform hover:translate-y-[-2px] transition-all duration-300 shadow-[0_0_10px_rgba(0,0,0,0.1)] hover:shadow-xl"
          >
            Start Conversation
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Contact Methods */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mb-16 sm:mb-20">
          {contactInfo.map((info, index) => {
            const IconComponent = info.icon;
            return (
              <div
                key={index}
                className="bg-pure-white p-6 sm:p-8 lg:p-10 rounded-2xl shadow-[0_0_10px_rgba(0,0,0,0.1)] hover:shadow-xl transition-all duration-300 text-center group hover:transform hover:translate-y-[-4px]"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-main-gold to-dark-gold rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-primary-dark mb-3 sm:mb-4">
                  {info.title}
                </h3>
                <div className="space-y-2">
                  {info.details.map((detail, idx) => (
                    <p
                      key={idx}
                      className="text-main-gold font-medium text-sm sm:text-base lg:text-lg break-words"
                    >
                      {detail}
                    </p>
                  ))}
                </div>
                <p className="text-medium-gray mt-3 sm:mt-4 text-sm sm:text-base">
                  {info.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-8 sm:gap-12 lg:gap-16">
          {/* Contact Form */}
          <div
            id="contact-form"
            className="bg-pure-white p-6 sm:p-8 lg:p-10 rounded-2xl shadow-[0_0_10px_rgba(0,0,0,0.1)] order-2"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-[Playfair_Display] text-primary-dark mb-6 sm:mb-8">
              Send us a Message
            </h2>

            {submitStatus === "success" && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 animate-slide-down">
                <p className="text-green-800 font-medium text-sm sm:text-base">
                  Thank you! Your message has been sent successfully.
                </p>
                <p className="text-green-600 text-xs sm:text-sm mt-1">
                  We'll get back to you within 2 hours.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-medium-gray font-medium mb-2 sm:mb-3 text-sm sm:text-base">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-main-gold/20 focus:border-main-gold text-sm sm:text-base transition-all duration-300"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-medium-gray font-medium mb-2 sm:mb-3 text-sm sm:text-base">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-main-gold/20 focus:border-main-gold text-sm sm:text-base transition-all duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-medium-gray font-medium mb-2 sm:mb-3 text-sm sm:text-base">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-main-gold/20 focus:border-main-gold text-sm sm:text-base transition-all duration-300"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-medium-gray font-medium mb-2 sm:mb-3 text-sm sm:text-base">
                    Property Interest
                  </label>
                  <select
                    name="propertyInterest"
                    value={formData.propertyInterest}
                    onChange={handleInputChange}
                    className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-main-gold/20 focus:border-main-gold text-sm sm:text-base transition-all duration-300 bg-white"
                  >
                    <option value="">Select property type</option>
                    <option value="villa">Luxury Villa</option>
                    <option value="penthouse">Penthouse</option>
                    <option value="mansion">Mansion</option>
                    <option value="beachfront">Beachfront Property</option>
                    <option value="investment">Investment Property</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-medium-gray font-medium mb-2 sm:mb-3 text-sm sm:text-base">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-main-gold/20 focus:border-main-gold text-sm sm:text-base transition-all duration-300"
                  placeholder="How can we help you?"
                />
              </div>

              <div>
                <label className="block text-medium-gray font-medium mb-2 sm:mb-3 text-sm sm:text-base">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-main-gold/20 focus:border-main-gold text-sm sm:text-base transition-all duration-300 resize-vertical"
                  placeholder="Tell us about your property requirements..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-main-gold to-dark-gold text-white font-semibold py-4 sm:py-5 px-6 sm:px-8 rounded-xl hover:shadow-xl transform hover:translate-y-[-2px] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm sm:text-base lg:text-lg"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                    Sending...
                  </div>
                ) : (
                  <>
                    <FiSend className="w-4 h-4 sm:w-5 sm:h-5 mr-2 inline" />
                    Send Message
                  </>
                )}
              </button>
              <p className="text-xs text-gray-400">
                This is a mock form and we will not actually receive any
                message*
              </p>
            </form>
          </div>

          {/* Office Information */}
          <div className="order-1">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-[Playfair_Display] text-primary-dark mb-6 sm:mb-8">
              Our Offices
            </h2>

            <div className="space-y-6 sm:space-y-8">
              {offices.map((office, index) => (
                <div
                  key={index}
                  className="bg-pure-white p-6 sm:p-8 rounded-2xl shadow-[0_0_10px_rgba(0,0,0,0.1)] hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="flex items-start justify-between mb-4 sm:mb-6">
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-primary-dark flex items-center flex-wrap gap-2">
                        <FaBuilding className="w-5 h-5 sm:w-6 sm:h-6 text-main-gold flex-shrink-0" />
                        <span>{office.city}</span>
                        {office.isHeadquarters && (
                          <span className="px-3 py-1 bg-gradient-to-r from-main-gold to-dark-gold text-white text-xs sm:text-sm rounded-full font-medium">
                            Headquarters
                          </span>
                        )}
                      </h3>
                      <p className="text-medium-gray text-sm sm:text-base lg:text-lg mt-1">
                        {office.country}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 sm:space-y-4 text-medium-gray text-sm sm:text-base">
                    <div className="flex items-start">
                      <FiMapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-3 sm:mr-4 text-main-gold mt-1 flex-shrink-0" />
                      <span className="break-words leading-relaxed">
                        {office.address}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <FiPhone className="w-4 h-4 sm:w-5 sm:h-5 mr-3 sm:mr-4 text-main-gold flex-shrink-0" />
                      <span className="font-medium">{office.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <FiMail className="w-4 h-4 sm:w-5 sm:h-5 mr-3 sm:mr-4 text-main-gold flex-shrink-0" />
                      <span className="break-all font-medium">
                        {office.email}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <FiClock className="w-4 h-4 sm:w-5 sm:h-5 mr-3 sm:mr-4 text-main-gold flex-shrink-0" />
                      <span>{office.hours}</span>
                    </div>
                  </div>

                  <p className="text-medium-gray text-sm sm:text-base mt-4 sm:mt-6 italic leading-relaxed bg-light-section-background p-3 sm:p-4 rounded-lg">
                    {office.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Company Information */}
        <div className="mt-16 sm:mt-20 lg:mt-24 bg-pure-white p-8 sm:p-10 lg:p-12 rounded-2xl shadow-[0_0_10px_rgba(0,0,0,0.1)]">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-[Playfair_Display] text-primary-dark mb-8 sm:mb-10 lg:mb-12 text-center">
            About Sunrise Property
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 text-center mb-8 sm:mb-10 lg:mb-12">
            <div className="group">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-main-gold mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                15+
              </div>
              <div className="text-medium-gray text-sm sm:text-base lg:text-lg font-medium">
                Years of Excellence
              </div>
            </div>
            <div className="group">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-main-gold mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                $2B+
              </div>
              <div className="text-medium-gray text-sm sm:text-base lg:text-lg font-medium">
                Properties Sold
              </div>
            </div>
            <div className="group">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-main-gold mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                98%
              </div>
              <div className="text-medium-gray text-sm sm:text-base lg:text-lg font-medium">
                Client Satisfaction
              </div>
            </div>
          </div>

          <div className="text-center max-w-4xl mx-auto">
            <p className="text-medium-gray leading-relaxed text-sm sm:text-base lg:text-lg">
              Founded in 2009, Sunrise Property has established itself as the
              premier luxury real estate agency specializing in coastal
              properties. Our team of expert advisors combines deep local
              knowledge with global reach to deliver exceptional results for our
              discerning clientele. Whether you're looking for a beachfront
              villa in Dubai, a Malibu estate in Los Angeles, or a South Beach
              penthouse in Miami, we have the expertise and connections to make
              your luxury property dreams a reality.
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-16 sm:mt-20 lg:mt-24 bg-gradient-to-r from-ocean-blue to-teal-turquoise text-pure-white p-8 sm:p-10 lg:p-12 rounded-2xl text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-[Playfair_Display] mb-4 sm:mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 lg:mb-10 max-w-3xl mx-auto leading-relaxed">
              Schedule a consultation with our experts or browse our exclusive
              property portfolio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center max-w-md mx-auto">
              <button
                onClick={() => navigate("/properties")}
                className="bg-main-gold hover:bg-dark-gold text-pure-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base lg:text-lg transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-xl"
              >
                Browse Properties
              </button>
              <button
                onClick={scrollToForm}
                className="bg-white/90 text-primary-dark hover:bg-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base lg:text-lg transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-xl"
              >
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactPage;
