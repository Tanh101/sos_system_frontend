import React, { Suspense } from "react";
import { Route, Routes } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../../components/Navbar/Navbar";
import Sidebar from "../../../components/User/Sidebar/Sidebar";

const Home = React.lazy(() => import('../../../components/Home/Home'));
const RequestHistories = React.lazy(() => import('../../../components/RequestHistories/RequestHistories'));
const Help = React.lazy(() => import('../../../components/Help/Help'));


const UserNavigation = () => {
    return (
        <div className="flex fixed w-full h-screen">
            <div className="flex bg-[#F9FAFB] flex-col flex-1">
                <Navbar />
                <div className="flex">
                    <Sidebar />
                    <Suspense fallback={<FontAwesomeIcon icon={faSpinner} />}>
                        <Routes>
                            <Route path="/help" element={<Help />} />
                            <Route path="/requests" element={<RequestHistories />} />
                            <Route path="/" element={<Home />} />
                        </Routes>
                    </Suspense>
                </div>
            </div>
        </div>
    );
}

export default UserNavigation;
