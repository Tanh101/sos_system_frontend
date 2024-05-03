import { useEffect, useContext } from 'react';

import { UserContext } from '../../Context/UserContext/UserContext';

const Inbox = () => {

    const { setActiveItem, location } = useContext(UserContext);
    // console.log(location);
    useEffect(() => {
        setActiveItem("messages");
    }, []);

    return (
        <div>
            <h2>My Current Location</h2>
            {location?.lat && location?.lng && location.address ? (
                <p>
                    Latitude: {location.lat}, Longitude: {location.lng}, Address: {location.address}
                </p>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Inbox;