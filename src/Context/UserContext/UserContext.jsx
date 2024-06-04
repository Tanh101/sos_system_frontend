import { createContext, useEffect, useRef, useState } from 'react';

import AuthService from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';
import LocationService from '../../services/LocationService';
import RequestService from '../../services/RequestService';
import { REQUEST_STATUS } from '../../constants/config';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmergencyRequest } from '../../redux/action/emergencyAction';
import socketInstance, { socket } from '../../utilities/socketInstance';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const emergencyRequests = useSelector(state => state.emergecy.emergencyRequests);
    const { getCurrentUserLocation, createOrUpdateUserLocation } = LocationService();
    const { getRequests } = RequestService();
    const { getUserProfile } = AuthService();

    const { connectSocket, disconnectSocket, emitWithToken } = socketInstance();

    const [user, setUser] = useState({});
    const [activeItem, setActiveItem] = useState('home');
    const [location, setLocation] = useState({ lat: null, lng: null, address: null });
    const intervalRef = useRef(null);

    useEffect(() => {
        const getEmergencyReq = async () => {
            const response = await getRequests(null, REQUEST_STATUS.PENDING, 1);
            dispatch(fetchEmergencyRequest(response?.requests))
        }

        getEmergencyReq();
    }, []);


    useEffect(() => {
        const fetchUserProfile = async () => {
            const userProfile = await getUserProfile();
            setUser(userProfile);
        }

        fetchUserProfile();
    }, []);

    useEffect(() => {
        const fetchUserLocation = async () => {
            const userLocation = await getCurrentUserLocation();
            setLocation(userLocation);
        }

        fetchUserLocation();
        console.log(location);
    }, []);


    useEffect(() => {
        if (user) {
            connectSocket();
        }

        if (user && user.role === 'rescuer') {
            notifyRescuerJoin(user._id);
        }
        if (user && user.role === 'admin') {
            setActiveItem('dashboard');
            navigate("/dashboard");
        }

        return () => {
            disconnectSocket();
        };
    }, [user]);

    useEffect(() => {
        if (location.lat && location.lng && user) {
            const upDateLocationToMongo = async (location) => {
                await createOrUpdateUserLocation(location);
            }

            upDateLocationToMongo(location);
        }
    }, [location]);

    useEffect(() => {
        if (emergencyRequests.length > 0 && socket && location.lat && location.lng) {
            emitWithToken("startSharingLocation", {
                requestId: emergencyRequests[0].id,
                latitude: location.lat,
                longitude: location.lng,
            });

            socket.on("locationSharingStarted", (data) => {
                intervalRef.current = setInterval(async () => {
                    const response = await getCurrentUserLocation();
                    emitWithToken("updateLocation", {
                        requestId: emergencyRequests[0].id,
                        latitude: response.lat,
                        longitude: response.lng,
                    });
                    console.log("Location updated");
                }, 5000);
                console.log("Location sharing started with requestId:", emergencyRequests[0].id);
            });

        } else {
            clearInterval(intervalRef.current);
        }
    }, [emergencyRequests, location]);


    return (
        <UserContext.Provider value={{
            user,
            activeItem,
            setActiveItem,
            location,
        }}>
            {children}
        </UserContext.Provider>
    );
}
