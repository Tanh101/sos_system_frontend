import { useCallback, useContext, useRef } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

import { UserContext } from "../../Context/UserContext/UserContext";
import PlaceInfo from "./PlaceInfo";
import Loading from "../Loading/Loading";

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const libraries = ["places"];

const options = {
    disableDefaultUI: true,
    zoomControl: true
};

const MyMapComponent = ({ mapContainerStyle }) => {

    const { location } = useContext(UserContext);

    const userPlace = {
        info: location.address,
        location: { lat: location.lat, lng: location.lng }
    }

    const rescuerPlaces = [
        {
            info: "264 Hoàng Văn Thái, Đà Nẵng",
            location: {
                lat: 16.058810,
                lng: 108.15122
            }
        },
        {
            info: "20 Nguyễn Đình Trân, Đà Nẵng",
            location: { lat: 16.018810, lng: 108.255480 }
        },
        {
            info: "20 Phan Hành Sơn, Đà Nẵng",
            location: { lat: 16.043860, lng: 108.239630 }
        }
    ];

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
        location.lat && location.lng ? (

            <GoogleMap
                id="map"
                mapContainerStyle={mapContainerStyle}
                zoom={12}
                center={{
                    lat: location.lat,
                    lng: location.lng
                }}
                options={options}
                onLoad={onMapLoad}
            >
                <PlaceInfo
                    userPlace={userPlace}
                    rescuerPlaces={rescuerPlaces}
                    isDraggable={false} />
            </GoogleMap>
        ) : (
            <Loading />
        )
    );
}

export default MyMapComponent;
