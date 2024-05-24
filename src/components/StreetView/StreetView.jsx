import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import PlaceInfo from '../MyMapComponent/PlaceInfo';
import {
    EmergencyMapContainerStyle,
    googleMapApiKey,
    googleMapComponentOptions,
    mapLibraries
} from '../../constants/config';
import PlaceService from "../../services/PlaceService";
import Loading from '../Loading/Loading';
import { UserContext } from '../../Context/UserContext/UserContext';

const StreetView = ({ requestPlace }) => {
    const { getRescuerPlaces } = PlaceService();
    const location = useContext(UserContext);
    const [rescuerPlaces, setRescuerPlaces] = useState([]);

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: googleMapApiKey,
        libraries: mapLibraries
    });

    const mapRef = useRef();

    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    useEffect(() => {
        const fetchRescuerPlaces = async () => {
            const response = await getRescuerPlaces();
            setRescuerPlaces(response);
        };

        fetchRescuerPlaces();
    }, []);

    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";
    console.log(requestPlace);
    return (
        requestPlace?.lat && requestPlace?.lng ? (

            <div className="flex flex-col w-full">
                <div className="flex flex-1">
                    <GoogleMap
                        id="map"
                        mapContainerStyle={EmergencyMapContainerStyle}
                        zoom={15}
                        center={{
                            lat: parseFloat(requestPlace.lat),
                            lng: parseFloat(requestPlace.lng)
                        }}
                        options={googleMapComponentOptions}
                        onLoad={onMapLoad}
                    >
                        <PlaceInfo
                            userPlace={location}
                            rescuerPlaces={rescuerPlaces}
                            isDraggable={false}
                            requestPlace={requestPlace}
                        />
                    </GoogleMap>
                </div>
            </div>
        ) : (
            <Loading />
        )
    );
};

export default StreetView;
