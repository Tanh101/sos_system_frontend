import { REMOVE_EMERGENCY_REQUEST, ADD_EMERGENCY_REQUEST, FETCH_EMERGENCY_REAQUEST } from "../../constants/config";

export const fetchEmergencyRequest = (emergencyRequests) => {
    return {
        type: FETCH_EMERGENCY_REAQUEST,
        payload: emergencyRequests
    };
};

export const addEmergencyRequest = (emergencyRequest) => {
    return {
        type: ADD_EMERGENCY_REQUEST,
        payload: emergencyRequest
    };
}

export const removeEmergencyRequest = () => {
    return {
        type: REMOVE_EMERGENCY_REQUEST,
        payload: []
    };
}
