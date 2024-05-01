import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const defaultMapConfig = {
    gestureHandling: "greedy",
    options: {
        fullscreenControl: false,
        disableDefaultUI: true,
        zoomControl: true
    },
    mapContainerStyle: {
        height: "100vh",
        width: "100%"
    }
};


const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function App() {
    return (
        <>
            <LoadScript
                googleMapsApiKey={apiKey}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div />}
                mapElement={<div />}
            >
                <GoogleMap {...defaultMapConfig}
                    center={{
                        lat: 16.058810,
                        lng: 108.15122
                    }}
                    zoom={14}>
                    <Marker position={{
                        lat: 16.058810,
                        lng: 108.15122
                    }} draggable={true} />
                </GoogleMap>
            </LoadScript>
        </>
    );
}
