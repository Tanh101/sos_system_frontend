import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import PropTypes from "prop-types";

import { UserContext } from "../../Context/UserContext/UserContext";
import PlaceInfo from "./PlaceInfo";
import Loading from "../Loading/Loading";
import PlaceService from "../../services/PlaceService";
import { googleMapComponentOptions, mapLibraries, googleMapApiKey } from "../../constants/config";

const MyMapComponent = ({ mapContainerStyle }) => {
    const { getRescuerPlaces } = PlaceService();

    const { location } = useContext(UserContext);

    const [rescuerPlaces, setRescuerPlaces] = useState([]);

    useEffect(() => {
        const fetchRescuerPlaces = async () => {
            const response = await getRescuerPlaces();
            setRescuerPlaces(response);
        }

        fetchRescuerPlaces();
    }, []);

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: googleMapApiKey,
        libraries: mapLibraries
    });

    const mapRef = useRef();

    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    if (!isLoaded) return <Loading />;
    if (loadError) return "Error loading map";

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
                options={googleMapComponentOptions}
                onLoad={onMapLoad}
            >
                <PlaceInfo
                    userPlace={{ info: location.address, location: { lat: location.lat, lng: location.lng } }}
                    rescuerPlaces={rescuerPlaces}
                    isDraggable={false} />
            </GoogleMap>
        ) : (
            <Loading />
        )
    )
}

export default MyMapComponent;

MyMapComponent.propTypes = {
    mapContainerStyle: PropTypes.object.isRequired
}
