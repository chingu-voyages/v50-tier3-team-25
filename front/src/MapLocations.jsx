import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { APIProvider, Map, AdvancedMarker, Marker, InfoWindow } from '@vis.gl/react-google-maps';
import axios from "axios";
import { Rating } from 'react-simple-star-rating'


// add clsutering
// when user clicks on location should be able to look at full menu.

const MapLocations = () => {
    const [locations, setLocations] = useState([]);
    const [categories, setCategories] = useState({});
    const [selectedLocation, setSelectedLocations] = useState(null);
    const googleKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const mapId = import.meta.env.VITE_MAP_ID;
    const center = { lat: 39.8283, lng: -98.5795 };
    const [rating, setRatingValue] = useState(0); // react star rating

    const getCategories = async () => {
        try {
            const response = await axios.get('https://menus-api.vercel.app');
            console.log('API response:', response);

            if (response.status === 200 && response.data && typeof response.data === 'object') {
                setCategories(response.data);
                console.log('Data set to categories:', response.data);
            } else {
                console.error('Unexpected response format or empty data:', response);
            }
        } catch (error) {
            console.error('ERROR fetching locations:', error);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    useEffect(() => {
        if (Object.keys(categories).length === 0) {
            console.log('Categories are empty or not yet set.');
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
        setRatingValue(rating)
        setLocations(allLocations);

    }, [categories]);
    console.log(selectedLocation)
    return (
        <Container className="d-flex align-items-center justify-content-center flex-column">
            <div style={{ height: '75vh', width: '75%', margin: '0 auto' }}>
                <APIProvider apiKey={googleKey} mapId='f59f1ca4034837b1'>
                    <h3 className="d-flex align-items-center justify-content-center flex-column">Locations Across the USA</h3>
                    <Map defaultCenter={center} defaultZoom={4.5}>
                        {locations.map(location => (
                            <Marker
                                key={location.id}
                                position={{ lat: location.lat, lng: location.lng }}
                                onClick={() =>setSelectedLocations(location)}
                                
                            />                            
                        ))}
                        {selectedLocation && (
                            <InfoWindow
                                position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
                                onCloseClick={() => setSelectedLocations(null)}
                            >
                                <div>
                                    <h6>{selectedLocation.itemName}</h6>
                                    <p>{selectedLocation.rating} out 5 Stars</p>
                                        
                                    <p>Speciality Dish: {selectedLocation.description}</p>
                                    <p>Price: ${selectedLocation.price}</p>
                                    <p>{selectedLocation.cityState}</p>
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
