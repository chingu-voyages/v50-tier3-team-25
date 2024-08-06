import React, { useContext, useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { APIProvider, Map, Marker, InfoWindow } from "@vis.gl/react-google-maps";
import axios from "axios";
import { AuthContext } from "./authContext";
import { useNavigate } from "react-router-dom";
import "./css/locations.css"; // Import the CSS file

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
    for (const categoryKey in categories) {
      const category = categories[categoryKey];
      if (Array.isArray(category)) {
        category.forEach((item, index) => {
          if (item.latitude && item.longitude) {
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

  return (
    <Container className="d-flex align-items-center justify-content-center flex-column">
      <div className="map-container mb-5">
        <APIProvider apiKey={googleKey} mapId={mapId}>
          <h3 className="map-title display-6 d-flex align-items-center justify-content-center flex-column">
            Locations Across the USA
          </h3>
          <Map defaultCenter={center} defaultZoom={4.5}>
            {locations.map((location) => (
              <Marker
                key={location.id}
                position={{ lat: location.lat, lng: location.lng }}
                onClick={() => setSelectedLocation(location)}
              />
            ))}
            {selectedLocation && (
              <InfoWindow
                position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
                onCloseClick={() => setSelectedLocation(null)}>
                <div className="info-window">
                  <h6>Name: {auth.selectedLocation.itemName}</h6>
                  <p>Rating: {selectedLocation.rating}/5</p>
                  <p>Description: {selectedLocation.description}</p>
                  <p>Price: ${selectedLocation.price}</p>
                  <p>{selectedLocation.cityState}</p>
                  <Button className="menu-button" onClick={() => handleNavigation(selectedLocation)}>
                    Go to Menu
                  </Button>
                </div>
              </InfoWindow>
            )}
          </Map>
        </APIProvider>
      </div>
    </Container>
  );
};

export default MapLocations;
