import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Circle, GoogleMap, InfoWindow, useJsApiLoader } from "@react-google-maps/api";
import PropTypes from "prop-types";

import { UserContext } from "../../Context/UserContext/UserContext";
import PlaceInfo from "./PlaceInfo";
import Loading from "../Loading/Loading";
import PlaceService from "../../services/PlaceService";
import { googleMapComponentOptions, mapLibraries } from "../../constants/config";
import RequestService from "../../services/RequestService";
import socketInstance, { socket } from '../../utilities/socketInstance';

const libraries = ["places"];

const options = {
    disableDefaultUI: true,
    zoomControl: true
};

const MyMapComponent = ({ mapContainerStyle, searchLocation }) => {
    const { emitWithToken } = socketInstance();

    const { processRescuerPlaces } = PlaceService();
    const { getDangerArea } = RequestService();

    const { location, googleMapApiKey } = useContext(UserContext);

    const [rescuerPlaces, setRescuerPlaces] = useState([]);
    const [selected, setSelected] = useState(null);
    const [center, setCenter] = useState({});
    const [dangerArea, setDangerArea] = useState([]);

    const intervalRef = useRef(null);
    const isListenerSetUp = useRef(false);

    useEffect(() => {
        if (location?.lat && location?.lng) {
            setCenter({ lat: parseFloat(location.lat), lng: parseFloat(location.lng) });
        }
    }, [location.lat, location.lng]);


    useEffect(() => {
        const getAllRescuer = () => {
            emitWithToken("getAllRescuerLocation");
            if (!isListenerSetUp.current) {
                socket.on("returnAllRescuerLocation", async (data) => {
                    const rescuerData = await processRescuerPlaces(data.rescuerLocatons);
                    setRescuerPlaces(rescuerData);
                });
                isListenerSetUp.current = true;
            }
        };

        getAllRescuer();

        intervalRef.current = setInterval(() => {
            getAllRescuer();
        }, 5000);

        return () => {
            clearInterval(intervalRef.current);
            socket.off('returnAllRescuerLocation');
            isListenerSetUp.current = false;
        };
    }, []);

    useEffect(() => {
        const fetchDangerRequests = async () => {
            try {
                const requestsData = await getDangerArea();
                setDangerArea(requestsData);
            } catch (error) {
                console.error("Failed to fetch requests:", error);
            }
        };

        fetchDangerRequests();
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
        location?.lat && location?.lng && googleMapApiKey ? (
            <GoogleMap
                id="map"
                mapContainerStyle={mapContainerStyle}
                zoom={14}
                center={center}
                options={options}
                onLoad={onMapLoad}
            >
                <PlaceInfo
                    selected={selected}
                    setSelected={setSelected}
                    userPlace={{ info: location.address, location: { lat: location.lat, lng: location.lng } }}
                    rescuerPlaces={rescuerPlaces}
                    searchLocation={searchLocation}
                    isDraggable={false}
                />
                {dangerArea.length > 0 && dangerArea.map((item, index) => (
                    <Circle
                        key={index}
                        center={{
                            lat: parseFloat(item.location.lat),
                            lng: parseFloat(item.location.lng)
                        }}
                        radius={item.radius}
                        options={{
                            strokeColor: '#FF0000',
                            strokeOpacity: 0.8,
                            strokeWeight: 2,
                            fillColor: '#FF0000',
                            fillOpacity: 0.35,
                        }}
                        onClick={() => {
                            setSelected({ info: item.message, location: item.location });
                            setCenter({
                                lat: parseFloat(item.location.lat),
                                lng: parseFloat(item.location.lng)
                            });
                        }}
                    />
                ))}
                {selected && (
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
                        <div>{selected.info}</div>
                    </InfoWindow>
                )}
            </GoogleMap>
        ) : (
            <Loading />
        )
    );
};

export default MyMapComponent;

MyMapComponent.propTypes = {
    mapContainerStyle: PropTypes.object.isRequired,
    searchLocation: PropTypes.object
};
