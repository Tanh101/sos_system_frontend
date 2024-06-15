import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

import Loading from "../../Loading/Loading";
import PlaceInfo from "./PlaceInfo";
import { UserContext } from "../../../Context/UserContext/UserContext";
import PlaceService from "../../../services/PlaceService";
import { UserMarkerPlaceContext } from "../../../Context/UserMarkerPlaceContext/UserMarkerPlaceContext";

const libraries = ["places"];

const options = {
    disableDefaultUI: true,
    zoomControl: true
};

const RequestMap = ({ mapContainerStyle }) => {
    const { location, googleMapApiKey } = useContext(UserContext);

    const { requestLocation } = useContext(UserMarkerPlaceContext);

    const { getRescuerPlaces } = PlaceService();
    const [rescuerPlaces, setRescuerPlaces] = useState([]);

    useEffect(() => {
        const fetchRescuerPlaces = async () => {
            const places = await getRescuerPlaces();
            setRescuerPlaces(places);
        }

        fetchRescuerPlaces();
    }, []);

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: googleMapApiKey,
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
                zoom={15}
                center={{
                    lat: requestLocation.lat || location.lat,
                    lng: requestLocation.lng || location.lng
                }}
                options={options}
                onLoad={onMapLoad}
            >
                <PlaceInfo
                    userPlace={{ info: requestLocation.address, location: { lat: requestLocation.lat, lng: requestLocation.lng } }}
                    rescuerPlaces={rescuerPlaces}
                    isDraggable={true} />
            </GoogleMap>
        ) : (
            <Loading />
        )
    );
}

export default RequestMap;
