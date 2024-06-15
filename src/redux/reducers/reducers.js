import { combineReducers } from 'redux';
import { ADD_EMERGENCY_REQUEST, REMOVE_EMERGENCY_REQUEST, FETCH_EMERGENCY_REAQUEST, GET_NOTIFICATION } from '../../constants/config';

const initialState = {
    emergencyRequests: []
};

const initialNotiState = {
    notifications: []
}
const emergencyReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_EMERGENCY_REAQUEST:
            return {
                ...state,
                emergencyRequests: action.payload
            };
        case ADD_EMERGENCY_REQUEST:
            return {
                ...state,
                emergencyRequests: [...state.emergencyRequests, action.payload]
            };
        case REMOVE_EMERGENCY_REQUEST:
            return {
                ...state,
                emergencyRequests: []
            };
        default:
            return state;
    }
};

const notificationReducer = (state = initialNotiState, action) => {
    switch (action.type) {
        case GET_NOTIFICATION:
            return {
                ...state,
                notifications: action.payload
            };
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    emergecy: emergencyReducer,
    notify: notificationReducer,
});

export default rootReducer;
