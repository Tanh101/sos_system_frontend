import { useContext, useEffect, useState } from "react";
import { Marker, InfoWindow } from "@react-google-maps/api";
import PropTypes from "prop-types";

import {
    rescuerMarkerIconURL,
    userMarkerIconURL
} from "../../../constants/config";

import GoogleMapService from "../../../services/GoogleMapService";
import { UserMarkerPlaceContext } from "../../../Context/UserMarkerPlaceContext/UserMarkerPlaceContext";
import { UserContext } from "../../../Context/UserContext/UserContext";

const PlaceInfo = ({ rescuerPlaces }) => {
    const { ReverseGeocoding } = GoogleMapService();

    const { location } = useContext(UserContext);
    const { requestLocation, setRequestLocation } = useContext(UserMarkerPlaceContext);

    useEffect(() => {
        setRequestLocation({
            lat: location.lat,
            lng: location.lng,
            address: location.address
        });
    }, []);

    const userPlace = {
        info: requestLocation.address,
        location: { lat: requestLocation.lat, lng: requestLocation.lng }
    };

    const handleDrag = async (marker) => {
        const lat = marker.latLng.lat();
        const lng = marker.latLng.lng();

        const fetchGeocoding = async (location) => {
            try {
                const res = await ReverseGeocoding(location);
                return res;
            } catch (error) {
                console.error("Error fetching geocoding:", error);
            }
        }

        const response = await fetchGeocoding({
            lat: lat,
            lng: lng
        });

        setRequestLocation({
            lat: lat,
            lng: lng,
            address: response
        });
    }

    const [selected, setSelected] = useState(null);

    return (
        <>
            {rescuerPlaces.map((marker) => (
                <Marker
                    key={`${marker.location.lat * marker.location.lng}`}
                    position={{
                        lat: marker.location.lat,
                        lng: marker.location.lng
                    }}
                    onClick={() => {
                        setSelected(marker);
                    }}
                    icon={{
                        url: rescuerMarkerIconURL,
                        origin: new window.google.maps.Point(0, 0),
                        scaledSize: new window.google.maps.Size(40, 40)
                    }}

                />
            ))}

            {userPlace.info && userPlace.location.lat && userPlace.location.lng && (
                <Marker
                    position={{
                        lat: userPlace.location.lat,
                        lng: userPlace.location.lng
                    }}
                    onClick={() => {
                        setSelected(userPlace);
                    }}
                    icon={{
                        url: userMarkerIconURL,
                        origin: new window.google.maps.Point(0, 0),
                        scaledSize: new window.google.maps.Size(40, 40)
                    }}
                    draggable={true}
                    onDragEnd={handleDrag}
                />
            )}

            {selected ? (
                <InfoWindow
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
            ) : null}
        </>
    );
}
export default PlaceInfo;

PlaceInfo.propTypes = {
    rescuerPlaces: PropTypes.array.isRequired,
};
