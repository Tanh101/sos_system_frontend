import { GET_NOTIFICATION } from "../../constants/config";

export const fetchEmergencyRequest = (notifications) => {
    return {
        type: GET_NOTIFICATION,
        payload: notifications
    };
};
