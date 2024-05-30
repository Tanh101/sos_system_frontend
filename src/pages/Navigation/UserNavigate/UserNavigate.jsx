import React, { Suspense, useEffect, useState } from "react";
import { Route, Routes } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import AuthService from "../../../services/AuthService";
import { UserProvider } from "../../../Context/UserContext/UserContext";

const Dashboard = React.lazy(() => import("../../../components/Admin/Dashboard/Dashboard"));
const ManageChatbot = React.lazy(() => import("../../../components/Admin/ManageChatbot/ManageChatbot"));
const Account = React.lazy(() => import("../../../components/Admin/Account/Account"));
const AdminSideBar = React.lazy(() => import("../../../components/Admin/AdminSideBar/AdminSideBar"));
const Navbar = React.lazy(() => import("../../../components/Navbar/Navbar"));
const Sidebar = React.lazy(() => import("../../../components/User/Sidebar/Sidebar"));
const Home = React.lazy(() => import("../../../components/Home/Home"));
const Help = React.lazy(() => import("../../../components/Help/Help"));
const Location = React.lazy(() => import("../../../components/Location/Location"));
const Inbox = React.lazy(() => import("../../../components/Inbox/Inbox"));
const Chatbot = React.lazy(() => import("../../../components/Chatbot/Chatbot"));
const Profile = React.lazy(() => import("../../../components/Profile/Profile"));

const UserNavigation = () => {
    const { getUserProfile } = AuthService();
    const [user, setUser] = useState();

    useEffect(() => {
        const fetchUserProfile = async () => {
            const userProfile = await getUserProfile();
            setUser(userProfile);
        }

        fetchUserProfile();
    }, []);

    return (
        <UserProvider>
            <div className="flex fixed w-full h-screen font-roboto bg-white">
                <div className="flex bg-white flex-col flex-1">
                    <Navbar />
                    <Chatbot />
                    {user && user.role === 'admin' ? (
                        <div className="flex flex-1 bg-slate-100">
                            <AdminSideBar />
                            <Suspense fallback={<FontAwesomeIcon icon={faSpinner} />}>
                                <Routes>
                                    <Route path="/dashboard" element={<Dashboard />} />
                                    <Route path="/chatbot" element={<ManageChatbot />} />

                                </Routes>
                            </Suspense>
                        </div>
                    ) : (
                        <div className="flex">
                            <Sidebar />
                            <Suspense fallback={<FontAwesomeIcon icon={faSpinner} />}>
                                <Routes>
                                    <Route path="/help/*" element={<Help />} />
                                    <Route path="/location" element={<Location />} />
                                    <Route path="/messages" element={<Inbox />} />
                                    <Route path="/profile/*" element={<Profile />} />
                                    <Route path="/" element={<Home />} />
                                </Routes>
                            </Suspense>
                        </div>
                    )}
                </div>
            </div>
        </UserProvider>
    );
}

export default UserNavigation;
