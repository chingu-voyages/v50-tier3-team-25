import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "./authContext";
import { useNavigate } from "react-router-dom";
import "./css/locations.css"; // Import the CSS file
import { Loader } from "@googlemaps/js-api-loader";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

const MapLocations = () => {
  const { auth } = useContext(AuthContext);
  const { selectedLocation, setSelectedLocation } = auth;
  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState({});
  const googleKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const mapId = import.meta.env.VITE_MAP_ID;
  const center = { lat: 39.8283, lng: -98.5795 };
  const [rating, setRatingValue] = useState(0); // react star rating
  const navigate = useNavigate();

  const getCategories = async () => {
    try {
      const response = await axios.get("https://menus-api.vercel.app");
      console.log("API response:", response);

      if (response.status === 200 && response.data && typeof response.data === "object") {
        setCategories(response.data);
        console.log("Data set to categories:", response.data);
      } else {
        console.error("Unexpected response format or empty data:", response);
      }
    } catch (error) {
      console.error("ERROR fetching locations:", error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (Object.keys(categories).length === 0) {
      console.log("Categories are empty or not yet set.");
      return;
    }

    let allLocations = [];
    const locationSet = new Set();
    for (const categoryKey in categories) {
      const category = categories[categoryKey];
      if (Array.isArray(category)) {
        category.forEach((item, index) => {
          const locationKey = `${item.latitude}-${item.longitude}`;
          if (item.latitude && item.longitude && !locationSet.has(locationKey)) {
            locationSet.add(locationKey);
            allLocations.push({
              id: `${categoryKey}-${item.id}-${index}`,
              lat: item.latitude,
              lng: item.longitude,
              itemName: item.name,
              description: item.dsc,
              image: item.img,
              price: item.price,
              rating: item.rate,
              cityState: item.cityState,
            });
          }
        });
      }
    }
    setRatingValue(rating);
    setLocations(allLocations);
  }, [categories]);

  const handleNavigation = (location) => {
    setSelectedLocation(location);
    navigate("/menu");
  };

  useEffect(() => {
    if (!googleKey) {
      console.error("Google Maps API key is missing");
      return;
    }

    const initializeMap = async () => {
      const loader = new Loader({
        apiKey: googleKey,
        version: "weekly",
        libraries: ["maps", "marker"],
      });

      loader.load().then(async () => {
        const { Map } = await google.maps.importLibrary("maps");
        const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");

        const map = new Map(document.getElementById("map"), {
          center,
          zoom: 4.5,
          mapId: mapId,
        });

        const infoWindow = new google.maps.InfoWindow({
          content: "",
          disableAutoPan: true,
        });

        const markers = locations.map((location) => {
          const pinGlyph = new PinElement({
            glyph: location.itemName.charAt(0),
            glyphColor: "white",
          });

          const marker = new AdvancedMarkerElement({
            position: { lat: location.lat, lng: location.lng },
            content: pinGlyph.element,
            map,
          });

          marker.addListener("click", () => {
            setSelectedLocation(location);
            infoWindow.setContent(`
              <div class="info-window">
                <h6>${location.itemName}</h6>
                <p>${location.description}</p>
                <strong>Price:</strong> $${location.price} | <strong>Rating:</strong> ${location.rating}/5
                <p>${location.cityState ? 'location.cityState': ''}</p>
                <button id="menuButton" class="menu-button">Go to Menu</button>
              </div>
            `);
            infoWindow.open(map, marker);

            // click listener to the button after the InfoWindow is opened
            google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
              document.getElementById("menuButton").addEventListener("click", () => handleNavigation(location));
            });
          });

          return marker;
        });

        new MarkerClusterer({ markers, map });
      }).catch(e => {
        console.error('Error loading Google Maps:', e);
      });
    };

    initializeMap();
  }, [locations, mapId, googleKey]);

  return (
    <Container className="d-flex align-items-center justify-content-center flex-column">
      <div id="map" className="map-container mb-5" style={{ width: "100%", height: "600px" }} />
    </Container>
  );
};

export default MapLocations;
