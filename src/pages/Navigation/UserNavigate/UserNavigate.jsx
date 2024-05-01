import { Suspense } from "react";
import { Route, Routes } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import { UserProvider } from "../../../components/Context/UserContext/UserContext";

import Navbar from "../../../components/Navbar/Navbar";
import Sidebar from "../../../components/User/Sidebar/Sidebar";
import Home from "../../../components/Home/Home";
import RequestHistories from "../../../components/RequestHistories/RequestHistories";
import Help from "../../../components/Help/Help";
import Emergency from "../../../components/Emergency/Emergency";

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
                                <Route path="/location" element={<Emergency />} />
                                <Route path="/" element={<Home />} />
                            </Routes>
                        </Suspense>
                    </div>
                </div>
            </div>
        </UserProvider >
    );
}

export default UserNavigation;
