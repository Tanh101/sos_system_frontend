import { createContext, useEffect, useState } from 'react';
import AuthService from '../../../services/AuthService';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const { getUserProfile } = AuthService();

    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUserProfile = async () => {
            const userProfile = await getUserProfile();
            setUser(userProfile);
        }

        fetchUserProfile();
    }, []);

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
}
