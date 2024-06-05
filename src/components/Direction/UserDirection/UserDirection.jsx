import { useCallback, useRef } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import PlaceInfo from "../../MyMapComponent/PlaceInfo";
import { googleMapApiKey, googleMapComponentOptions, mapLibraries } from "../../../constants/config";
import Loading from "../../Loading/Loading";

const UserDirection = ({ location }) => {
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
                    requestPlace={{ info: location.address, location: { lat: parseFloat(location.lat), lng: parseFloat(location.lng) } }}
                    isDraggable={false} />
            </GoogleMap>
        ) : (
            <Loading />
        )
    )
}

export default UserDirection