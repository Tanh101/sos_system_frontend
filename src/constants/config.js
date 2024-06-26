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

const VOTE_TYPE = {
    "upvote": 1,
    "downvote": 0,
    "none": 2,
}

const ITEM_PER_PAGE = 10;
const PAGE = 1;

const REQUEST_STATUS = {
    PENDING: 0,
    RESCUING: 1,
    RESCUED: 2,
    REJECTED: 3,
    ALL: ''
};

const REQUEST_STATUS_COLORS = {
    [REQUEST_STATUS.PENDING]: 'bg-red', // Orange
    [REQUEST_STATUS.RESCUING]: 'blue', // Steel Blue
    [REQUEST_STATUS.RESCUED]: 'green', // Green
    [REQUEST_STATUS.REJECTED]: 'red', // Red
};

const CONVERT_REQUEST_STATUS = {
    [REQUEST_STATUS.PENDING]: 'Pending',
    [REQUEST_STATUS.RESCUING]: 'Rescuing',
    [REQUEST_STATUS.RESCUED]: 'Rescued',
    [REQUEST_STATUS.REJECTED]: 'Rejected',
}
const USER_STATUS = {
    ACTIVE: 1,
    DELETED: 0
}

const USER_STATUS_TEXT = {
    [USER_STATUS.ACTIVE]: "Active",
    [USER_STATUS.DELETED]: "Deleted"
}

const USER_ROLE = {
    ADMIN: "admin",
    USER: "user",
    RESCUER: "rescuer"
}

const ADD_EMERGENCY_REQUEST = "ADD_EMERGENCY_REQUEST";
const REMOVE_EMERGENCY_REQUEST = "REMOVE_EMERGENCY_REQUEST";
const FETCH_EMERGENCY_REAQUEST = "FETCH_EMERGENCY_REAQUEST";

const GET_NOTIFICATION = "GET_NOTIFICATION";

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
    searchMarkerIconURL,
    VOTE_TYPE,
    REQUEST_STATUS,
    USER_STATUS,
    PAGE,
    ITEM_PER_PAGE,
    USER_STATUS_TEXT,
    USER_ROLE,
    ADD_EMERGENCY_REQUEST,
    REMOVE_EMERGENCY_REQUEST,
    FETCH_EMERGENCY_REAQUEST,
    GET_NOTIFICATION,
    REQUEST_STATUS_COLORS,
    CONVERT_REQUEST_STATUS,
}