import React, { useCallback, useRef, useState } from "react";

import {
    GoogleMap,
    DirectionsService,
    DirectionsRenderer,
    useJsApiLoader
} from "@react-google-maps/api";
import { googleMapApiKey, googleMapComponentOptions, mapLibraries } from "../../constants/config";

const Direction = ({ origin, destination }) => {
    console.log(origin, destination);
    const [directions, setDirections] = useState();
    const count = useRef(0);
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: googleMapApiKey,
        libraries: mapLibraries
    });

    const mapRef = useRef();

    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    const directionsCallback = (
        result,
        status
    ) => {
        if (status === "OK" && count.current === 0) {
            count.current++;
            setDirections(result);
        }
    };
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
