import React from "react";
import {Container, Col, Row} from "react-bootstrap"
import {APIProvider, Map, AdvancedMarker} from '@vis.gl/react-google-maps';


const MapLocations = () => {
    const googleKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const center = {lat: 39.8283, lng: -98.5795};

    const locations = []

    return(
        <Container className="justify-content-center">
            <APIProvider apiKey={googleKey} >
                <Row className="align-items-center" >Locations Across the USA</Row>
                <div style={{height: '50vh', width: '75%'}}>
                <Map defaultCenter={center} defaultZoom={5}>
                    <AdvancedMarker position={center}/>
                </Map>
                </div>
            </APIProvider>
        </Container>
        
    )
}

export default MapLocations;