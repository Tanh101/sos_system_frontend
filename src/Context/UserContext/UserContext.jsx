import { createContext, useEffect, useState } from 'react';

import SocketService from '../../services/SocketService';
import AuthService from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';
import socketInstance from '../../utilities/socketInstance';
import LocationService from '../../services/LocationService';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const navigate = useNavigate();

    const { getCurrentUserLocation, createOrUpdateUserLocation } = LocationService();
    const { getUserProfile } = AuthService();

    const { connectSocket, disconnectSocket } = socketInstance();

    const {
        notifyRescuerJoin,
        receiveEmergencyRequest,
        sendEmergencyRequest,
        receiveResponseFromRescuer,
        sendResponseToClient
    } = SocketService();

    const [user, setUser] = useState({});
    const [activeItem, setActiveItem] = useState('home');
    const [location, setLocation] = useState({ lat: null, lng: null, address: null });

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

    return (
        <UserContext.Provider value={{
            user,
            activeItem,
            setActiveItem,
            location,
            sendEmergencyRequest,
            receiveEmergencyRequest,
            receiveResponseFromRescuer,
            sendResponseToClient,
        }}>
            {children}
        </UserContext.Provider>
    );
}
