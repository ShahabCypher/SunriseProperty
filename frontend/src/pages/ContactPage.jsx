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
      setTimeout(() => setSubmitStatus(null), 5000);
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
    <div className="min-h-screen bg-off-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-ocean-blue to-teal-turquoise text-pure-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold font-[Playfair_Display] mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-100 max-w-2xl mx-auto">
            Connect with our luxury property experts. We're here to help you
            find your perfect coastal investment.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {contactInfo.map((info, index) => {
            const IconComponent = info.icon;
            return (
              <div
                key={index}
                className="bg-pure-white p-6 rounded-lg shadow-md text-center"
              >
                <div className="w-16 h-16 bg-main-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-primary-dark mb-3">
                  {info.title}
                </h3>
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-main-gold font-medium mb-1">
                    {detail}
                  </p>
                ))}
                <p className="text-medium-gray text-sm">{info.description}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div
            id="contact-form"
            className="bg-pure-white p-8 rounded-lg shadow-md"
          >
            <h2 className="text-3xl font-bold font-[Playfair_Display] text-primary-dark mb-6">
              Send us a Message
            </h2>

            {submitStatus === "success" && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-green-800 font-medium">
                  Thank you! Your message has been sent successfully.
                </p>
                <p className="text-green-600 text-sm">
                  We'll get back to you within 2 hours.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-medium-gray font-medium mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main-gold focus:border-main-gold"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-medium-gray font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main-gold focus:border-main-gold"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-medium-gray font-medium mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main-gold focus:border-main-gold"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-medium-gray font-medium mb-2">
                    Property Interest
                  </label>
                  <select
                    name="propertyInterest"
                    value={formData.propertyInterest}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main-gold focus:border-main-gold"
                  >
                    <option value="">Select a location</option>
                    <option value="los-angeles">Los Angeles</option>
                    <option value="dubai">Dubai</option>
                    <option value="miami">Miami</option>
                    <option value="multiple">Multiple Locations</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-medium-gray font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main-gold focus:border-main-gold"
                  placeholder="How can we help you?"
                />
              </div>

              <div>
                <label className="block text-medium-gray font-medium mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main-gold focus:border-main-gold"
                  placeholder="Tell us about your property requirements, budget, timeline, or any questions you have..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-main-gold hover:bg-dark-gold text-pure-white py-4 px-6 rounded-lg font-medium text-lg transition-colors flex items-center justify-center disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <FiSend className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Office Information */}
          <div>
            <h2 className="text-3xl font-bold font-[Playfair_Display] text-primary-dark mb-6">
              Our Offices
            </h2>

            <div className="space-y-6">
              {offices.map((office, index) => (
                <div
                  key={index}
                  className="bg-pure-white p-6 rounded-lg shadow-md"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-primary-dark flex items-center">
                        <FaBuilding className="w-5 h-5 mr-2 text-main-gold" />
                        {office.city}
                        {office.isHeadquarters && (
                          <span className="ml-2 px-2 py-1 bg-main-gold text-white text-xs rounded-full">
                            Headquarters
                          </span>
                        )}
                      </h3>
                      <p className="text-medium-gray">{office.country}</p>
                    </div>
                  </div>

                  <div className="space-y-3 text-medium-gray">
                    <div className="flex items-start">
                      <FiMapPin className="w-4 h-4 mr-3 text-main-gold mt-1 flex-shrink-0" />
                      <span>{office.address}</span>
                    </div>
                    <div className="flex items-center">
                      <FiPhone className="w-4 h-4 mr-3 text-main-gold" />
                      <span>{office.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <FiMail className="w-4 h-4 mr-3 text-main-gold" />
                      <span>{office.email}</span>
                    </div>
                    <div className="flex items-center">
                      <FiClock className="w-4 h-4 mr-3 text-main-gold" />
                      <span>{office.hours}</span>
                    </div>
                  </div>

                  <p className="text-medium-gray text-sm mt-4 italic">
                    {office.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Company Information */}
        <div className="mt-16 bg-pure-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold font-[Playfair_Display] text-primary-dark mb-6 text-center">
            About Sunrise Property
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-main-gold mb-2">15+</div>
              <div className="text-medium-gray">Years of Excellence</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-main-gold mb-2">$2B+</div>
              <div className="text-medium-gray">Properties Sold</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-main-gold mb-2">98%</div>
              <div className="text-medium-gray">Client Satisfaction</div>
            </div>
          </div>

          <div className="mt-8 text-center max-w-3xl mx-auto">
            <p className="text-medium-gray leading-relaxed">
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
        <div className="mt-16 bg-gradient-to-r from-ocean-blue to-teal-turquoise text-pure-white p-8 rounded-lg text-center">
          <h2 className="text-3xl font-bold font-[Playfair_Display] mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Schedule a consultation with our experts or browse our exclusive
            property portfolio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={scrollToForm}
              className="bg-main-gold hover:bg-dark-gold text-pure-white px-8 py-4 rounded-lg font-medium text-lg transition-colors"
            >
              Schedule Consultation
            </button>
            <button
              onClick={() => navigate("/properties")}
              className="bg-overlay-white text-primary-dark hover:bg-white px-8 py-4 rounded-lg font-medium text-lg transition-colors"
            >
              Browse Properties
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
