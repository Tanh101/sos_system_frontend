import { createContext, useEffect, useState } from 'react';
import AuthService from '../../services/AuthService';
import GoogleMapService from '../../services/GoogleMapService';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const { getUserProfile } = AuthService();
    const { ReverseGeocoding } = GoogleMapService();

    const [res, setRes] = useState(null);

    const [location, setLocation] = useState({ lat: null, lng: null, address: "" });

    const [user, setUser] = useState({});
    const [activeItem, setActiveItem] = useState('home');


    useEffect(() => {
        const fetchUserProfile = async () => {
            const userProfile = await getUserProfile();
            setUser(userProfile);
        }

        fetchUserProfile();
    }, []);

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            });
        }
    }, []);

    if (location.lat && location.lng) {
        const fetchGeocoding = async (location) => {
            const address = await ReverseGeocoding(location);
            console.log(address);
        }

        fetchGeocoding(location);
    }


    return (
        <UserContext.Provider value={{ user, activeItem, setActiveItem, location }}>
            {children}
        </UserContext.Provider>
    );
}
