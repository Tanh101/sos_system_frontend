import React, { Suspense } from "react";
import { Route, Routes } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import { UserProvider } from "../../../Context/UserContext/UserContext";
const Navbar = React.lazy(() => import("../../../components/Navbar/Navbar"));
const Sidebar = React.lazy(() => import("../../../components/User/Sidebar/Sidebar"));
const Home = React.lazy(() => import("../../../components/Home/Home"));
const RequestHistories = React.lazy(() => import("../../../components/RequestHistories/RequestHistories"));
const Help = React.lazy(() => import("../../../components/Help/Help"));
const Location = React.lazy(() => import("../../../components/Location/Location"));
const Inbox = React.lazy(() => import("../../../components/Inbox/Inbox"));

const UserNavigation = () => {
    return (
        <UserProvider>
            <div className="flex fixed w-full h-screen">
                <div className="flex bg-[#F9FAFB] flex-col flex-1">
                    <Navbar />
                    <div className="flex">
                        <Sidebar />
                        <Suspense fallback={<FontAwesomeIcon icon={faSpinner} />}>
                            <Routes>
                                <Route path="/help" element={<Help />} />
                                <Route path="/requests" element={<RequestHistories />} />
                                <Route path="/location" element={<Location />} />
                                <Route path="/" element={<Home />} />
                                <Route path="/messages" element={<Inbox />} />
                            </Routes>
                        </Suspense>
                    </div>
                </div>
            </div>
        </UserProvider >
    );
}

export default UserNavigation;
