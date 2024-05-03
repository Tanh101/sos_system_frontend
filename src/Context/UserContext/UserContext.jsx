import { createContext, useEffect, useState } from 'react';
import AuthService from '../../services/AuthService';
import GoogleMapService from '../../services/GoogleMapService';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const { getUserProfile } = AuthService();
    const { ReverseGeocoding } = GoogleMapService();

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
        if ("geolocation" in navigator) {
            const fetchGeocoding = async (location) => {
                try {
                    const res = await ReverseGeocoding(location);
                    return res;
                } catch (error) {
                    console.error("Error fetching geocoding:", error);
                }
            }

            navigator.geolocation.getCurrentPosition(async (position) => {
                const address = await fetchGeocoding({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });

                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    address: address
                });
            });
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, activeItem, setActiveItem, location}}>
            {children}
        </UserContext.Provider>
    );
}
