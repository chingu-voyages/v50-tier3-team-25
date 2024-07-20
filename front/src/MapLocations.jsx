import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { APIProvider, Map, AdvancedMarker, Marker } from '@vis.gl/react-google-maps';
import axios from "axios";

const MapLocations = () => {
    const [locations, setLocations] = useState([]);
    const [categories, setCategories] = useState({});
    const googleKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const mapId = import.meta.env.VITE_MAP_ID;
    const center = { lat: 39.8283, lng: -98.5795 };

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
                            id: `${categoryKey}-${item.id}-${index}`, // Ensure unique keys
                            lat: item.latitude,
                            lng: item.longitude,
                        });
                    }
                });
            }
        }
        setLocations(allLocations);

    }, [categories]);

    return (
        <Container className="d-flex align-items-center justify-content-center flex-column">
            <div style={{ height: '75vh', width: '75%', margin: '0 auto' }}>
                <APIProvider apiKey={googleKey} mapId='f59f1ca4034837b1'>
                    <Row>Locations Across the USA</Row>
                    <Map defaultCenter={center} defaultZoom={4.5}>
                        {locations.map(location => (
                            <Marker
                                key={location.id}
                                position={{ lat: location.lat, lng: location.lng }}
                            />
                        ))}
                    </Map>
                </APIProvider>
            </div>
        </Container>
    );
};

export default MapLocations;
