import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import {
    GoogleMap,
    DirectionsService,
    DirectionsRenderer,
    useJsApiLoader
} from "@react-google-maps/api";
import { googleMapComponentOptions, mapLibraries } from "../../constants/config";
import { UserContext } from "../../Context/UserContext/UserContext";

const Direction = ({ origin, destination }) => {
    const { googleMapApiKey } = useContext(UserContext);

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: googleMapApiKey,
        libraries: mapLibraries
    });

    const [directions, setDirections] = useState(null);

    const fetchDirections = useCallback(() => {
        if (!isLoaded || !origin || !destination) return;

        const directionsService = new window.google.maps.DirectionsService();
        const request = {
            origin: { lat: origin.lat, lng: origin.lng },
            destination: { lat: destination.lat, lng: destination.lng },
            travelMode: "DRIVING"
        };

        directionsService.route(request, (result, status) => {
            if (status === "OK") {
                setDirections(result);
            } else if (status === "ZERO_RESULTS") {
                console.log("No route found between the specified locations.");
                setDirections(null);
            } else {
                console.error("Directions request failed with status:", status);
            }
        });
    }, [isLoaded, origin, destination]);

    useEffect(() => {
        fetchDirections();
    }, [fetchDirections]);

    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";

    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-1">
                <GoogleMap
                    mapContainerClassName="w-full h-full"
                    mapContainerStyle={{ height: "50vh", width: "100%" }}
                    zoom={15}
                    options={googleMapComponentOptions}
                >
                    {directions && <DirectionsRenderer directions={directions} />}
                </GoogleMap>
            </div>
        </div>
    );
}

export default Direction;
