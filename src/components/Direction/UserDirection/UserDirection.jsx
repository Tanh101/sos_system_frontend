import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Circle, GoogleMap, InfoWindow, useJsApiLoader } from "@react-google-maps/api";
import { googleMapComponentOptions, mapLibraries } from "../../../constants/config";

import PlaceInfo from "../../MyMapComponent/PlaceInfo";
import Loading from "../../Loading/Loading";
import socketInstance, { socket } from "../../../utilities/socketInstance";
import PlaceService from "../../../services/PlaceService";
import RequestService from "../../../services/RequestService";
import { UserContext } from "../../../Context/UserContext/UserContext";

const UserDirection = ({ location, address }) => {
    const { emitWithToken } = socketInstance();

    const { getDangerArea } = RequestService();
    const { processRescuerPlaces } = PlaceService();
    const { googleMapApiKey } = useContext(UserContext);

    const intervalRef = useRef(null);
    const isListenerSetUp = useRef(false);
    const [dangerArea, setDangerArea] = useState([]);
    const [rescuerPlaces, setRescuerPlaces] = useState([]);
    const [selected, setSelected] = useState(null);
    const [center, setCenter] = useState({});

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
        libraries: mapLibraries
    });

    const mapRef = useRef();

    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    if (!isLoaded) return <Loading />;
    if (loadError) return "Error loading map";
    return (
        location.lat && location.lng && googleMapApiKey ? (
            <GoogleMap
                id="map"
                mapContainerStyle={
                    {
                        height: "50vh",
                        width: "100%"
                    }
                }
                center={{ lat: parseFloat(location.lat), lng: parseFloat(location.lng) }}
                zoom={15}
                options={googleMapComponentOptions}
                onLoad={onMapLoad}
            >
                <PlaceInfo
                    requestPlace={{ info: address, location: { lat: parseFloat(location.lat), lng: parseFloat(location.lng) } }}
                    isDraggable={false}
                    rescuerPlaces={rescuerPlaces}
                    selected={selected}
                    setSelected={setSelected}
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
    )
}

export default UserDirection