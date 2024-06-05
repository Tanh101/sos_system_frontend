import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Circle, GoogleMap, InfoWindow, useJsApiLoader } from "@react-google-maps/api";
import PropTypes from "prop-types";

import { UserContext } from "../../Context/UserContext/UserContext";
import PlaceInfo from "./PlaceInfo";
import Loading from "../Loading/Loading";
import PlaceService from "../../services/PlaceService";
import { googleMapComponentOptions, mapLibraries, googleMapApiKey } from "../../constants/config";

const MyMapComponent = ({ mapContainerStyle, searchLocation }) => {
    const { getRescuerPlaces } = PlaceService();

    const { location } = useContext(UserContext);

    const [rescuerPlaces, setRescuerPlaces] = useState([]);
    const [selected, setSelected] = useState(null);
    const [center, setCenter] = useState({});

    useEffect(() => {
        if (location.lat && location.lng) {
            setCenter({ lat: parseFloat(location.lat), lng: parseFloat(location.lng) });
        }
    }, [location.lat, location.lng]);

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

    const dangerArea = [
        {
            location: { lat: 16.073460, lng: 108.21466 },
            message: "Chỗ này bị ngập nước",
            radius: 500
        },
        {
            location: { lat: 16.073460, lng: 108.151466 },
            message: "Khu vực này có động đất",
            radius: 300
        },
        {
            location: { lat: 16.073460, lng: 108.11466 },
            message: "Chỗ này bị hõa hoạn",
            radius: 2000
        },
        {
            location: { lat: 16.03460, lng: 108.191466 },
            message: "Khu vực này có nguy cơ sạt lở đất",
            radius: 1000
        },
    ];

    return (
        location.lat && location.lng ? (
            <GoogleMap
                id="map"
                mapContainerStyle={mapContainerStyle}
                zoom={14}
                center={center}
                options={googleMapComponentOptions}
                onLoad={onMapLoad}
            >
                <PlaceInfo
                    selected={selected}
                    setSelected={setSelected}
                    userPlace={{ info: location.address, location: { lat: location.lat, lng: location.lng } }}
                    rescuerPlaces={rescuerPlaces}
                    searchLocation={searchLocation}
                    isDraggable={false} />
                {Object.entries(dangerArea).map(([key, { message, location, radius }]) => (
                    <Circle
                        key={key}
                        center={location}
                        radius={radius}
                        options={{
                            strokeColor: '#FF0000',
                            strokeOpacity: 0.8,
                            strokeWeight: 2,
                            fillColor: '#FF0000',
                            fillOpacity: 0.35,
                        }}
                        onClick={() => {
                            setSelected({ info: message, location });
                            setCenter(location);
                        }}
                    />
                ))}
                <>
                    {selected ? (
                        <InfoWindow
                            style={{ height: "200px" }}
                            position={{
                                lat: selected.location.lat,
                                lng: selected.location.lng
                            }}
                            onCloseClick={() => {
                                setSelected(null);
                            }}
                        >
                            <div className="">{selected.info}</div>
                        </InfoWindow>
                    ) : null}
                </>
            </GoogleMap>
        ) : (
            <Loading />
        )
    )
}

export default MyMapComponent;

MyMapComponent.propTypes = {
    mapContainerStyle: PropTypes.object.isRequired,
    searchLocation: PropTypes.object
}
