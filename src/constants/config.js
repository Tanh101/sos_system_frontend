const AppBaseUrl =
    import.meta.env.VITE_REACT_APP_API ?? 'http://localhost:8000/api';
const ChatbotUrl =
    import.meta.env.VITE_REACT_CHATBOT_API ?? 'http://localhost:8001/api';

const ServerURL =
    import.meta.env.VITE_SERVER_URL ?? 'http://localhost:8000';

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
const requestMarkerIconURL = "https://sossystem.s3.us-east-1.amazonaws.com/1716474017690";
const searchMarkerIconURL = "https://sossystem.s3.us-east-1.amazonaws.com/1716686540954";
const EmergencyMapContainerStyle = {
    height: "40vh",
    width: "100%"
}
const fullWindowMapContainerStyle = {
    height: "100vh",
    width: "100%"
}

const googleMapComponentOptions = {
    disableDefaultUI: false,
    zoomControl: true
};
const mapLibraries = ["places"];

const googleMapApiKey =
    import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const socketMessage = {
    CLIENT_REQUEST: "clientRequest",
    RESPONSE_FROM_RESCUER: "responseFromRescuer",
    RESCUER_JOIN: "rescuerJoin",
    NEW_REQUEST: "newRequest",
    RESCUER_RESPONSE: "rescuerResponse",
}

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
    socketMessage,
    ChatbotUrl,
    requestMarkerIconURL,
    searchMarkerIconURL
}