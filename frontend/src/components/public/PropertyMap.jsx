import { useEffect, useRef, useState } from "react";
import { FiMapPin, FiMaximize2, FiX } from "react-icons/fi";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default markers in Leaflet with Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const PropertyMap = ({ property, className = "" }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const fullscreenMapRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (!mapRef.current || !property?.location?.coordinates?.coordinates)
      return;

    const [longitude, latitude] = property.location.coordinates.coordinates;

    // Validate coordinates
    if (
      !latitude ||
      !longitude ||
      latitude < -90 ||
      latitude > 90 ||
      longitude < -180 ||
      longitude > 180
    ) {
      return;
    }

    // Create map instance
    const map = L.map(mapRef.current, {
      center: [latitude, longitude],
      zoom: 15,
      zoomControl: true,
      scrollWheelZoom: false,
      doubleClickZoom: true,
      touchZoom: true,
    });

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    // Create custom marker with property styling
    const customIcon = L.divIcon({
      className: "custom-property-marker",
      html: `
        <div class="relative">
          <div class="w-8 h-8 bg-main-gold rounded-full border-4 border-pure-white shadow-lg flex items-center justify-center">
            <div class="w-3 h-3 bg-pure-white rounded-full"></div>
          </div>
          <div class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-main-gold"></div>
        </div>
      `,
      iconSize: [32, 40],
      iconAnchor: [16, 40],
      popupAnchor: [0, -40],
    });

    // Add marker with popup
    const marker = L.marker([latitude, longitude], { icon: customIcon }).addTo(
      map
    );

    marker.bindPopup(`
      <div class="p-3 min-w-48">
        <h3 class="font-semibold text-primary-dark mb-1">${property.name}</h3>
        <p class="text-sm text-medium-gray mb-2">${property.location.address}</p>
        <p class="text-xs text-light-gray">${property.location.city}, ${property.location.country}</p>
      </div>
    `);

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [property]);

  // Handle fullscreen map
  useEffect(() => {
    if (!isFullscreen) return;

    const fullscreenElement = document.getElementById("fullscreen-map");
    if (!fullscreenElement || !property?.location?.coordinates?.coordinates)
      return;

    const [longitude, latitude] = property.location.coordinates.coordinates;

    if (
      !latitude ||
      !longitude ||
      latitude < -90 ||
      latitude > 90 ||
      longitude < -180 ||
      longitude > 180
    ) {
      return;
    }

    const fullscreenMap = L.map(fullscreenElement, {
      center: [latitude, longitude],
      zoom: 16,
      zoomControl: true,
      scrollWheelZoom: true,
      doubleClickZoom: true,
      touchZoom: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(fullscreenMap);

    const customIcon = L.divIcon({
      className: "custom-property-marker",
      html: `
        <div class="relative">
          <div class="w-10 h-10 bg-main-gold rounded-full border-4 border-pure-white shadow-lg flex items-center justify-center">
            <div class="w-4 h-4 bg-pure-white rounded-full"></div>
          </div>
          <div class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-5 border-r-5 border-t-5 border-transparent border-t-main-gold"></div>
        </div>
      `,
      iconSize: [40, 48],
      iconAnchor: [20, 48],
      popupAnchor: [0, -48],
    });

    const marker = L.marker([latitude, longitude], { icon: customIcon }).addTo(
      fullscreenMap
    );

    marker.bindPopup(`
      <div class="p-4 min-w-64">
        <h3 class="font-semibold text-primary-dark mb-2 text-base">${property.name}</h3>
        <p class="text-sm text-medium-gray mb-2">${property.location.address}</p>
        <p class="text-xs text-light-gray">${property.location.city}, ${property.location.country}</p>
      </div>
    `);

    fullscreenMapRef.current = fullscreenMap;

    return () => {
      if (fullscreenMapRef.current) {
        fullscreenMapRef.current.remove();
        fullscreenMapRef.current = null;
      }
    };
  }, [isFullscreen, property]);

  // Handle map resize when modal opens
  useEffect(() => {
    const handleResize = () => {
      if (mapInstanceRef.current) {
        setTimeout(() => {
          mapInstanceRef.current.invalidateSize();
        }, 250);
      }
      if (fullscreenMapRef.current) {
        setTimeout(() => {
          fullscreenMapRef.current.invalidateSize();
        }, 250);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const hasValidCoordinates =
    property?.location?.coordinates?.coordinates &&
    Array.isArray(property.location.coordinates.coordinates) &&
    property.location.coordinates.coordinates.length === 2;

  if (!hasValidCoordinates) {
    return (
      <div
        className={`bg-light-section-background rounded-lg flex flex-col items-center justify-center p-6 ${className}`}
      >
        <FiMapPin className="w-8 h-8 text-medium-gray mb-2" />
        <p className="text-medium-gray text-sm text-center">
          Location not available for this property
        </p>
      </div>
    );
  }

  return (
    <>
      <div
        className={`relative rounded-lg overflow-hidden border border-gray-200 ${className}`}
      >
        <div
          ref={mapRef}
          className="w-full h-full min-h-64"
          style={{ minHeight: "256px" }}
        />

        {/* Map overlay with property details */}
        <div className="absolute top-3 left-15 bg-overlay-white backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm z-[1000]">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-main-gold rounded-full"></div>
            <span className="text-xs font-medium text-primary-dark">
              Property Location
            </span>
          </div>
        </div>

        {/* Fullscreen toggle button */}
        <button
          onClick={() => setIsFullscreen(true)}
          className="absolute top-3 right-3 bg-overlay-white backdrop-blur-sm rounded-lg p-2 shadow-sm hover:bg-white hover:shadow-md transition-all duration-200 z-[1000]"
          title="View fullscreen"
        >
          <FiMaximize2 className="w-4 h-4 text-primary-dark" />
        </button>
      </div>

      {/* Fullscreen modal */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-[1000] flex items-center justify-center p-0">
          <div className="bg-white w-full h-full relative">
            <div className="w-full h-full" id="fullscreen-map" />

            {/* Fullscreen map overlay */}
            <div className="absolute w-3/5 sm:w-auto top-4 left-15 bg-overlay-white backdrop-blur-sm rounded-lg px-4 py-3 shadow-lg z-[1000]">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-main-gold rounded-full"></div>
                <div>
                  <h4 className="text-sm font-semibold text-primary-dark">
                    {property.name}
                  </h4>
                  <p className="text-xs text-medium-gray">
                    {property.location.address}
                  </p>
                </div>
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 bg-overlay-white backdrop-blur-sm rounded-lg p-3 shadow-lg hover:bg-white transition-colors z-[1000]"
              title="Close fullscreen"
            >
              <FiX className="w-5 h-5 text-primary-dark" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PropertyMap;
