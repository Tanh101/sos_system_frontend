import { useCallback, useRef } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import PlaceInfo from "./PlaceInfo";

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const libraries = ["places"];

const options = {
    disableDefaultUI: true,
    zoomControl: true
};

const MyMapComponent = ({mapContainerStyle}) => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: apiKey,
        libraries
    });

    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";

    return (
        <GoogleMap
            id="map"
            mapContainerStyle={mapContainerStyle}
            zoom={12}
            center={{
                lat: 16.058810,
                lng: 108.15122
            }}
            options={options}
            onLoad={onMapLoad}
        >
            <PlaceInfo />
        </GoogleMap>
    );
}

export default MyMapComponent;
