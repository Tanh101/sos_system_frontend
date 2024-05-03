import { createContext, useState } from 'react'

export const UserMarkerPlaceContext = createContext();

export const UserMarkerPlaceProvider = ({ children }) => {
    const [requestLocation, setRequestLocation] = useState({ lat: null, lng: null, address: "" });

    return (
        <UserMarkerPlaceContext.Provider value={{ requestLocation, setRequestLocation }}>
            {children}
        </UserMarkerPlaceContext.Provider>
    )
}
