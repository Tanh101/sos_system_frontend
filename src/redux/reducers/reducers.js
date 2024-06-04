import { combineReducers } from 'redux';
import { ADD_EMERGENCY_REQUEST, REMOVE_EMERGENCY_REQUEST, FETCH_EMERGENCY_REAQUEST } from '../../constants/config';

const initialState = {
    emergencyRequests: []
};

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


const rootReducer = combineReducers({
    emergecy: emergencyReducer,
});

export default rootReducer;
