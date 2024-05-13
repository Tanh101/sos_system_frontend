import { useContext, useEffect, useState } from "react";

import Post from "./Post/Post";
import { UserContext } from "../../Context/UserContext/UserContext";
import RequestService from "../../services/RequestService";
import Loading from "../Loading/Loading";

const Help = () => {
    const { getRequests } = RequestService();
    const { setActiveItem } = useContext(UserContext);

    const [requestData, setRequestData] = useState({});

    useEffect(() => {
        setActiveItem('help');
        const fetchRequesets = async () => {
            const requests = await getRequests();
            setRequestData(requests);
        }
        fetchRequesets();
    }, []);

    console.log(requestData);

    return (
        <div className="flex flex-1 h-screen bg-white  justify-center items-start overflow-y-auto py-5">
            <div className="flex flex-col h-screen xl:mx-72 lg:mx-20 md:mx-16 mx-10 routded-lg pb-20">
                <Post requestData={requestData} />
            </div>
        </div>
    )
}

export default Help
