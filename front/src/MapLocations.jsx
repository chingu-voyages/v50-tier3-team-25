import React from "react";
import {Container, Col, Row} from "react-bootstrap"
import {APIProvider, Map, AdvancedMarker} from '@vis.gl/react-google-maps';




const MapLocations = () => {
    const googleKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const center = {lat: 39.8283, lng: -98.5795};

    // map through menu locations eg. city and state
    const locations = []


    // transform locations into geo data
    const geoLocations = []

    co

    return(
        <Container className="d-flex align-items-center justify-content-center flex-column">
            <APIProvider apiKey={googleKey} >
                <Row>Locations Across the USA</Row>
                <div style={{height: '75vh', width: '75%', margin: '0 auto'}}>
                <Map defaultCenter={center} defaultZoom={4.5}>
                  
                    {<AdvancedMarker position={center}/>}
                </Map>
                </div>
            </APIProvider>
        </Container>
        
    )
}

export default MapLocations;