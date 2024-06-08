import { useCallback, useEffect, useRef, useState } from "react";
import { Circle, GoogleMap, InfoWindow, useJsApiLoader } from "@react-google-maps/api";
import { googleMapApiKey, googleMapComponentOptions, mapLibraries } from "../../../constants/config";

import PlaceInfo from "../../MyMapComponent/PlaceInfo";
import Loading from "../../Loading/Loading";
import socketInstance, { socket } from "../../../utilities/socketInstance";
import PlaceService from "../../../services/PlaceService";
import RequestService from "../../../services/RequestService";

const UserDirection = ({ location, address }) => {
    const { emitWithToken } = socketInstance();

    const { getDangerArea } = RequestService();
    const { processRescuerPlaces } = PlaceService();

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
        location.lat && location.lng ? (
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
                        center={item.location}
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
                            setCenter(item.location);
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