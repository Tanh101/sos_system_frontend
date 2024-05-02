import { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

import { defaultMapConfig, defaultMapContainerStyle } from "../../../constants/config";
import PlaceInfo from "../../MyMapComponent/PlaceInfo";

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const DraggableMarker = () => {

    // const { ReverseGeocoding } = GoogleMapService();

    const [location, setLocation] = useState({
        lat: 16.058810,
        lng: 108.15122
    });

    const handleDrag = (marker) => {
        const lat = marker.latLng.lat();
        const lng = marker.latLng.lng();
        setLocation({
            lat: lat,
            lng: lng
        });

        // const address = ReverseGeocoding(location);
        // console.log(address);
    }

    return (
        <>
            <LoadScript
                googleMapsApiKey={apiKey}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            >
                <GoogleMap {...defaultMapConfig}
                    mapContainerStyle={defaultMapContainerStyle}
                    center={{
                        lat: location.lat,
                        lng: location.lng
                    }}
                    zoom={17}>
                    {/* <Marker position={{
                        lat: location.lat,
                        lng: location.lng
                    }} draggable={true}
                        onDragEnd={handleDrag}
                    /> */}
                    <PlaceInfo locationValue={{ location, setLocation }} />
                </GoogleMap>
            </LoadScript>
        </>
    );
}

export default DraggableMarker;
