import React, { Suspense } from "react";
import { Route, Routes } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../../components/Navbar/Navbar";

const Home = React.lazy(() => import('../../../components/Home/Home'));
const RequestHistories = React.lazy(() => import('../../../components/RequestHistories/RequestHistories'));

const UserNavigation = () => {
    return (
        <div className="flex w-full h-screen">
            <div className="flex bg-[#F9FAFB] flex-col flex-1">
                <Navbar />
                <Suspense fallback={<FontAwesomeIcon icon={faSpinner} />}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/supports" element={<RequestHistories />} />
                    </Routes>
                </Suspense>
            </div>
        </div>
    );
}

export default UserNavigation;
