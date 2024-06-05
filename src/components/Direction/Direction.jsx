import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
    GoogleMap,
    DirectionsService,
    DirectionsRenderer,
    useJsApiLoader
} from "@react-google-maps/api";
import { googleMapApiKey, googleMapComponentOptions, mapLibraries } from "../../constants/config";

const Direction = ({ origin, destination }) => {
    const directionsService = new DirectionsService();

    const [directions, setDirections] = useState();

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: googleMapApiKey,
        libraries: mapLibraries
    });

    const mapRef = useRef();

    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    const directionsCallback = useCallback((result, status) => {
        if (status === "OK") {
            setDirections(result);
        }
    }, [setDirections]);

    const getDirections = useMemo(() => {
        return (origin, destination) => {
            directionsService.route({
                origin: { lat: origin?.lat, lng: origin?.lng },
                destination: { lat: destination?.lat, lng: destination?.lng },
                travelMode: "DRIVING"
            }, (result, status) => {
                if (status === "OK") {
                    setDirections(result);
                }
            });
        };
    }, [origin, destination]);

    useEffect(() => {
        if (isLoaded && origin.lat && origin.lng && destination.lat && destination.lng)
            getDirections(origin, destination);
    }, [origin, destination]);


    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";

    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-1">
                <GoogleMap
                    mapContainerClassName="w-full h-full"
                    mapContainerStyle={
                        {
                            height: "50vh",
                            width: "100%"
                        }
                    }
                    zoom={15}
                    options={googleMapComponentOptions}
                    onLoad={onMapLoad}
                >
                    <DirectionsService
                        options={{
                            origin: { lat: origin?.lat, lng: origin?.lng },
                            destination: { lat: destination?.lat, lng: destination?.lng },
                            travelMode: "DRIVING"
                        }}
                        callback={directionsCallback}
                    />
                    {directions && <DirectionsRenderer directions={directions} />}
                </GoogleMap>
            </div>
        </div >
    );
}

export default Direction;
