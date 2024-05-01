import { useState } from "react";
import { Marker, InfoWindow } from "@react-google-maps/api";

export default function PlaceInfo() {
    const userPlace = {
        info: "40 Ngô Sĩ Liên Đà Nẵng",
        location: { lat: 16.073460, lng: 108.151466 }

    }

    const places = [
        {
            info: "264 Hoàng Văn Thái, Đà Nẵng",
            location: {
                lat: 16.058810,
                lng: 108.15122
            }
        },
        {
            info: "20 Nguyễn Đình Trân, Đà Nẵng",
            location: { lat: 16.018810, lng: 108.255480 }
        },
        {
            info: "20 Phan Hành Sơn, Đà Nẵng",
            location: { lat: 16.043860, lng: 108.239630 }
        }
    ];

    const [selected, setSelected] = useState(null);

    return (
        <>
            {places.map((marker) => (
                <Marker
                    key={`${marker.location.lat * marker.location.lng}`}
                    position={{
                        lat: marker.location.lat,
                        lng: marker.location.lng
                    }}
                    onMouseOver={() => {
                        setSelected(marker);
                    }}
                    icon={{
                        url: "https://sossystem.s3.amazonaws.com/hopitalmarker.png",
                        origin: new window.google.maps.Point(0, 0),
                        scaledSize: new window.google.maps.Size(40, 40)
                    }}
                />
            ))}

            <Marker
                position={{
                    lat: userPlace.location.lat,
                    lng: userPlace.location.lng
                }}
                onMouseOver={() => {
                    setSelected(userPlace);
                }}
                icon={{
                    url: "https://sossystem.s3.amazonaws.com/image.png",
                    origin: new window.google.maps.Point(0, 0),
                    scaledSize: new window.google.maps.Size(40, 40)
                }}
            />


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
