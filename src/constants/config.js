const AppBaseUrl = import.meta.env.REACT_APP_API ?? 'http://localhost:8000/api';
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

export {
    AppBaseUrl,
    SPACE_CHARACTER,
    defaultMapConfig,
    defaultMapContainerStyle,
    rescuerMarkerIconURL,
    userMarkerIconURL,
    EmergencyMapContainerStyle,
}
