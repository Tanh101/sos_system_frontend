const AppBaseUrl = import.meta.env.VITE_REACT_APP_API ?? 'http://localhost:8000/api';
const ServerURL = import.meta.env.VITE_SERVER_URL ?? 'http://localhost:8000'
const SPACE_CHARACTER = '\u00A0';
const defaultMapConfig = {
    gestureHandling: "greedy",
    options: {
        fullscreenControl: false,
        disableDefaultUI: true,
        zoomControl: true
    },
}
const defaultMapContainerStyle = {
    height: "100vh",
    width: "100%"
}
const rescuerMarkerIconURL = "https://sossystem.s3.amazonaws.com/hopitalmarker.png";
const userMarkerIconURL = "https://sossystem.s3.amazonaws.com/image.png";
const EmergencyMapContainerStyle = {
    height: "40vh",
    width: "100%"
}
const fullWindowMapContainerStyle = {
    height: "100vh",
    width: "100%"
}

const googleMapComponentOptions = {
    disableDefaultUI: true,
    zoomControl: true
};
const mapLibraries = ["places"];

const googleMapApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export {
    AppBaseUrl,
    SPACE_CHARACTER,
    defaultMapConfig,
    defaultMapContainerStyle,
    rescuerMarkerIconURL,
    userMarkerIconURL,
    EmergencyMapContainerStyle,
    fullWindowMapContainerStyle,
    googleMapComponentOptions,
    mapLibraries,
    googleMapApiKey,
    ServerURL,
}
