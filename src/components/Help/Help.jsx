import { useContext, useEffect, useState } from "react";
import Post from "./Post/Post";
import { UserContext } from "../../Context/UserContext/UserContext";
import RequestService from "../../services/RequestService";
import Loading from "../Loading/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Help = () => {
    const { getRequests } = RequestService();
    const { user, setActiveItem, receiveEmergencyRequest, sendResponseToClient } = useContext(UserContext);
    const [realTimeRequest, setRealTimeRequest] = useState([]);
    const [search, setSearch] = useState('');
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
        sendResponseToClient(responseData);
    };

    useEffect(() => {
        if (user && user.role === 'rescuer') {
            receiveEmergencyRequest((data) => {
                console.log('New request:', data);
                setRealTimeRequest([...realTimeRequest, data]);
            });
        }
    }, [user]);

    if (loading) {
        return <Loading />
    }

    return (
        <div className="flex flex-col flex-1 bg-white overflow-y-auto">
            <div className="flex h-screen rounded-lg pb-20 justify-between my-3">
                <div className="flex bg-[#f6f8f9] border-slate-100 border rounded-lg w-72 mr-10 h-96 sticky top-0">
                    <p>Các số điện thoại cứu hộ khẩn cấp</p>
                </div>
                <div className="flex flex-col flex-1 overflow-y-auto pr-12">
                    <div className="flex justify-between items-center sticky top-0 bg-white mb-4 mx-5">
                        <div className="flex justify-center items-center w-96 px-2 py-2 border outline-none focus:border-red-600 rounded-xl">
                            <FontAwesomeIcon icon={faSearch} color='red' size='lg' />
                            <input className="outline-none w-full ml-2"
                                type="text"
                                value={search}
                                placeholder="Search request..."
                                onChange={(e) => setSearch(e.target.value)} />
                        </div>
                        <div className="flex justify-center items-center">
                            <button className="p-2 bg-red-600 text-white rounded-2xl">Create request</button>
                        </div>
                    </div>
                    <Post requestData={requests} />
                </div>
            </div>
        </div>
    );
};

export default Help;
