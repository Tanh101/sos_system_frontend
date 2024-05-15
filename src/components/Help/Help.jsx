import { useContext, useEffect, useState } from "react";
import io from 'socket.io-client';

import Post from "./Post/Post";
import { UserContext } from "../../Context/UserContext/UserContext";
import RequestService from "../../services/RequestService";
import Loading from "../Loading/Loading";
import { ServerURL } from "../../constants/config";

const socket = io(ServerURL);

const Help = () => {
    const { getRequests } = RequestService();
    const { user, setActiveItem } = useContext(UserContext);

    const [realTimeRequest, setRealTimeRequest] = useState([]);

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRequests = async () => {
        try {
            const requestsData = await getRequests();
            setRequests(requestsData);
        } catch (error) {
            console.error("Failed to fetch requests:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setActiveItem('help');
        fetchRequests();
    }, []);

    const handleResponse = (clientId) => {
        const responseData = { clientId, message: 'Rescue on the way!' };
        console.log('Response to client:', responseData);
        socket.emit('rescuerResponse', responseData);
    };

    useEffect(() => {
        if (user && user.role === 'rescuer') {
            socket.emit('rescuerJoin');

            socket.on('newRequest', (data) => {
                console.log('New request from client:', data);
                setRealTimeRequest((prevRequests) => [...prevRequests, data]);
            });

            return () => {
                socket.off('newRequest');
            };
        }
    }, [user]);

    if (loading) {
        return <Loading />
    }

    return (
        <div className="flex flex-1 h-screen bg-white justify-center items-start overflow-y-auto py-5">
            <div className="flex flex-col h-screen xl:mx-72 lg:mx-20 md:mx-16 mx-10 rounded-lg pb-20">
                {realTimeRequest.map((item, index) => (
                    <div className="bg-blue-300 h-20" key={index}>
                        <p>Client Request: {item.message}</p>
                        <button className="bg-red-600" onClick={() => handleResponse(item.clientId)}>Respond</button>
                    </div>
                ))}
                <Post requestData={requests} />
            </div>
        </div>
    );
};

export default Help;
