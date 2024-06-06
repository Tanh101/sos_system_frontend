import { createContext, useEffect, useRef, useState } from 'react';

import AuthService from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';
import LocationService from '../../services/LocationService';
import RequestService from '../../services/RequestService';
import { REQUEST_STATUS } from '../../constants/config';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmergencyRequest } from '../../redux/action/emergencyAction';
import socketInstance, { socket } from '../../utilities/socketInstance';
import { getDistance } from '../../utilities/distance';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const emergencyRequests = useSelector(state => state.emergecy.emergencyRequests);
    const notifications = useSelector(state => state.notify.notifications);

    const { getCurrentUserLocation, createOrUpdateUserLocation } = LocationService();
    const { getRequestIsTracking } = RequestService();
    const { getUserProfile } = AuthService();

    const { connectSocket, disconnectSocket, emitWithToken } = socketInstance();

    const [user, setUser] = useState({});
    const [activeItem, setActiveItem] = useState('home');
    const [location, setLocation] = useState({ lat: null, lng: null, address: null });
    const intervalRef = useRef(null);
    const rescuerIntervalRef = useRef(null);

    const fetchUserLocation = async () => {
        const userLocation = await getCurrentUserLocation();
        setLocation(userLocation);
    }

    useEffect(() => {
        const getEmergencyReq = async () => {
            const response = await getRequestIsTracking();
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
        fetchUserLocation();
    }, []);


    useEffect(() => {
        if (user) {
            connectSocket();
        }
        if (user && user.role === 'admin') {
            setActiveItem('dashboard');
            navigate("/dashboard");
        }

        return () => {
            disconnectSocket();
        };
    }, [user]);


    const upDateLocationToMongo = async (location) => {
        await createOrUpdateUserLocation(location);
    }

    useEffect(() => {
        if (location.lat && location.lng && user.role === 'user') {
            upDateLocationToMongo(location);
        }

        if (location.lat && location.lng && user.role === 'rescuer') {
            rescuerIntervalRef.current = setInterval(async () => {
                let distance = 0;
                const response = await getCurrentUserLocation();
                distance = getDistance(location, response);
                if (distance > 10) {
                    upDateLocationToMongo(response);
                    setLocation(response);
                    console.log("Rescuer location updated");
                }
            }, 2000);
        }

        return () => {
            if (rescuerIntervalRef.current) {
                clearInterval(rescuerIntervalRef.current);
            }
        };
    }, [location, user]);

    useEffect(() => {
        if (emergencyRequests.length > 0 && socket && location.lat && location.lng && user.id === emergencyRequests[0].userId) {
            emitWithToken("startSharingLocation", {
                requestId: emergencyRequests[0].id,
                latitude: location.lat,
                longitude: location.lng,
            });

            socket.on("locationSharingStarted", (data) => {
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                }

                intervalRef.current = setInterval(async () => {
                    const response = await getCurrentUserLocation();
                    const distance = getDistance(location, response);
                    if (distance > 10) {
                        setLocation(response);
                        emitWithToken("updateLocation", {
                            requestId: emergencyRequests[0].id,
                            latitude: response.lat,
                            longitude: response.lng,
                        });
                        console.log("user Location updated");
                    }

                }, 2000);
            });

        } else {
            clearInterval(intervalRef.current);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
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
