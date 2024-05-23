import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import avatar from "../../assets/imgs/avatar.png";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Overview from "./Overview/Overview";
import Post from "../Help/Post/Post";
import RequestService from "../../services/RequestService";

const Profile = () => {
    const [activeMenu, setActiveMenu] = useState('');
    const navigate = useNavigate();

    const handleNavigate = (menu) => {
        setActiveMenu(menu);
        navigate(menu);
    };

    const { getRequests } = RequestService();
    const [requests, setRequests] = useState({});

    const fetchRequests = async () => {
        try {
            const requestsData = await getRequests();
            setRequests(requestsData);
        } catch (error) {
            console.error("Failed to fetch requests:", error);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    return (
        <div className="flex flex-col bg-white flex-1">
            <div className="flex justify-start items-start lg:mx-40 md:mx-10">
                <div className="flex flex-col flex-1 items-center justify-center p-4 h-screen mb-2">
                    <div className="flex justify-start items-center">
                        <div className="relative">
                            <img
                                className="w-24 h-24 rounded-full object-cover"
                                src={avatar}
                                alt="User Avatar"
                            />
                        </div>
                        <div className="ml-4">
                            <p className="text-lg font-semibold">test</p>
                            <p className="text-sm text-gray-600">test@gmail.com</p>
                        </div>
                    </div>
                    <div className="flex  py-2 border-b w-full justify-center mx-4">
                        <button
                            className={`px-2 py-2 mx-5 rounded-2xl border-white hover:bg-slate-200 ${activeMenu === '' ? 'bg-gray-200' : ''}`}
                            onClick={() => handleNavigate("")}
                        >
                            Profile
                        </button>
                        <button
                            className={`px-2 py-2 mx-5 rounded-2xl border-white hover:bg-slate-200 ${activeMenu === 'post' ? 'bg-gray-200' : ''}`}
                            onClick={() => handleNavigate("post")}
                        >
                            Post
                        </button>
                        <button
                            className={`px-2 py-2 mx-5 rounded-2xl border-white hover:bg-slate-200 ${activeMenu === 'supported' ? 'bg-gray-200' : ''}`}
                            onClick={() => handleNavigate("supported")}
                        >
                            Supported
                        </button>
                        <button
                            className={`px-2 py-2 mx-5 rounded-2xl border-white hover:bg-slate-200 ${activeMenu === 'rejected' ? 'bg-gray-200' : ''}`}
                            onClick={() => handleNavigate("rejected")}
                        >
                            Rejected
                        </button>
                    </div>
                    <div className="flex flex-col w-full h-screen overflow-y-auto">
                        <Routes>
                            <Route path="" element={<Overview />} />
                            <Route path="post" element={<Post requests={requests} />} />
                            <Route path="supported" element={<Post requests={requests} />} />
                            <Route path="rejected" element={<Post requests={requests} />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
