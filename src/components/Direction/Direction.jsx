import React, { useCallback, useRef, useState } from "react";

import {
    GoogleMap,
    DirectionsService,
    DirectionsRenderer,
    useJsApiLoader
} from "@react-google-maps/api";
import { EmergencyMapContainerStyle, googleMapApiKey, googleMapComponentOptions, mapLibraries } from "../../constants/config";

const Direction = () => {
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
            console.count();
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
                            origin: "16 Ngô sĩ liên, Liên chiểu, Đà Nẵng, Việt Nam",
                            destination: "121 Ngô Văn Sở, Liên Chiểu, Đà Nẵng, Việt Nam",
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
