import { useState } from "react";
import { Marker, InfoWindow } from "@react-google-maps/api";
import PropTypes from "prop-types";

import {
    rescuerMarkerIconURL,
    userMarkerIconURL,
    requestMarkerIconURL,
    searchMarkerIconURL
} from "../../constants/config";

const PlaceInfo = ({ userPlace, rescuerPlaces, requestPlace, searchLocation }) => {
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

            {requestPlace && (
                <Marker
                    position={{
                        lat: requestPlace.location.lat,
                        lng: requestPlace.location.lng
                    }}
                    onClick={() => {
                        setSelected(requestPlace);
                    }}
                    icon={{
                        url: requestMarkerIconURL,
                        origin: new window.google.maps.Point(0, 0),
                        scaledSize: new window.google.maps.Size(40, 40)
                    }}
                />
            )}

            {userPlace && (
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
                />
            )}

            {searchLocation.location.lat && (
                <Marker
                    position={{
                        lat: searchLocation.location.lat,
                        lng: searchLocation.location.lng
                    }}
                    onClick={() => {
                        setSelected(searchLocation);
                    }}
                    icon={{
                        url: searchMarkerIconURL,
                        origin: new window.google.maps.Point(0, 0),
                        scaledSize: new window.google.maps.Size(40, 40)
                    }}
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
    userPlace: PropTypes.object,
    rescuerPlaces: PropTypes.array,
    requestPlace: PropTypes.object,
    searchLocation: PropTypes.object
};
