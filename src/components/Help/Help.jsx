import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Route, Routes, useLocation } from 'react-router-dom';
import { Select } from "antd";
import { useTranslation } from "react-i18next";
import Popup from "reactjs-popup";

import { UserContext, UserProvider } from "../../Context/UserContext/UserContext";
import RequestService from "../../services/RequestService";
import Loading from "../Loading/Loading";
import Post from "./Post/Post";
import FormRequest from "../Emergency/FormRequest/FormRequest";
import { UserMarkerPlaceProvider } from "../../Context/UserMarkerPlaceContext/UserMarkerPlaceContext";
import PostDetail from "./PostDetail/PostDetail";
import { REQUEST_STATUS } from "../../constants/config";

const Help = () => {
    const { t } = useTranslation();
    const location = useLocation();

    const { getRequests, getRequestType } = RequestService();

    const { user, setActiveItem } = useContext(UserContext);


    const [realTimeRequest, setRealTimeRequest] = useState([]);
    const [search, setSearch] = useState('');
    const [requests, setRequests] = useState({});
    const [loading, setLoading] = useState(true);
    const [requestType, setRequestType] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [isVisible, setIsVisible] = useState(true);
    const [selectedRequestStatus, setSelectedRequestStatus] = useState(null);
    const [selectedRequestType, setSelectedRequestType] = useState(null);

    useEffect(() => {
        const fetchRequestType = async () => {
            const response = await getRequestType();
            const option = response.map((item) => {
                return { label: item.name, value: item.id }
            });

            setRequestType(option);
        }

        fetchRequestType();
    }, [])


    const fetchRequests = async () => {
        try {
            const filters = {};

            if (selectedRequestStatus) {
                filters.status = selectedRequestStatus;
            }

            if (selectedRequestType) {
                filters.type = selectedRequestType;
            }
            const requestsData = await getRequests(filters);
            setRequests(requestsData);
        } catch (error) {
            console.error("Failed to fetch requests:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, [selectedRequestStatus, selectedRequestType]);

    const handleChangeRequestStatus = (value) => {
        setSelectedRequestStatus(value);
    };

    const handleChange = (value) => {
        setSelectedRequestType(value);
    };


    useEffect(() => {
        if (location.pathname.includes('/help/detail/')) {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }

        setActiveItem('help');
        fetchRequests();
    }, [location]);


    if (loading) {
        return (
            <div className="flex justify-center items-center flex-1 w-full">
                <Loading />
            </div>
        )
    }

    return (
        <UserMarkerPlaceProvider>
            <div className="flex flex-col flex-1 bg-white overflow-y-auto">
                <div className="flex h-screen rounded-lg pb-20 justify-between my-3">
                    <div className="flex flex-col flex-1 overflow-y-auto ">
                        {!requests && <div className='flex justify-center items-center h-96'>
                            <p className='text-2xl'>{t("Không có yêu cầu nào")}</p>
                        </div>
                        }
                        {requests &&
                            <Routes>
                                <Route path="" element={
                                    <>
                                        <div className="flex justify-between mx-5 sticky top-0 bg-white">
                                            <div className="flex justify-center items-center w-96 px-2 py-2 border outline-none focus:border-red-600 rounded-xl">
                                                <FontAwesomeIcon icon={faSearch} color='red' size='lg' />
                                                <input className="outline-none w-full ml-2"
                                                    type="text"
                                                    placeholder={t("Tìm kiếm yêu cầu...")}
                                                    onChange={(e) => setSearch(e.target.value)} />
                                            </div>
                                            <div className="flex justify-center items-center">
                                                <Popup
                                                    trigger={<button className="p-2 bg-red-600 text-white rounded-2xl">{t("Tạo yêu cầu")}</button>}
                                                    modal
                                                    nested
                                                    contentStyle={{ borderRadius: '10px' }}
                                                >
                                                    <FormRequest isEmergency={false} />
                                                </Popup>
                                            </div>
                                        </div>
                                        <Post requests={requests} setRequests={setRequests}
                                            setSelectedRequest={setSelectedRequest} />
                                    </>}
                                />
                                <Route path="/detail/:id" element={<PostDetail />} />
                            </Routes>
                        }
                    </div>
                    {isVisible === true && (
                        <div className="flex flex-col bg-[#f6f8f9] border-slate-50 border rounded-lg w-64 m-4 h-96 sticky top-0 px-4 py-4">
                            <div className="flex text-sm mt-2 items-center">
                                <label className="font-medium text-slate-600 w-32 flex-wrap" htmlFor="filter">{t("Loại yêu cầu")}</label>
                                <Select
                                    defaultValue={t("Tất cả")}
                                    style={{ width: '100%', borderColor: "red", marginLeft: 10, outlineColor: "red", fontSize: 20 }}
                                    onChange={handleChange}
                                    id="filter"
                                    options={
                                        [
                                            { label: t("Tất cả"), value: '' },
                                            { label: t("Khẩn cấp"), value: '1' },
                                            { label: t("Thông thường"), value: '0' },
                                        ]
                                    }
                                />
                            </div>
                            <div className="flex text-sm mt-2 items-center">
                                <label className="font-medium text-slate-600 w-32 flex-wrap" htmlFor="filter">{t("Trạng thái yêu cầu")}</label>
                                <Select
                                    defaultValue={t("Tất cả")}
                                    style={{ width: '100%', borderColor: "red", marginLeft: 10, outlineColor: "red", fontSize: 20 }}
                                    onChange={handleChangeRequestStatus}
                                    id="filter"
                                    options={
                                        [
                                            { label: t("Tất cả"), value: '' },
                                            { label: t("Đang chờ"), value: '0' },
                                            { label: t("Đang cứu hộ"), value: REQUEST_STATUS.RESCUING },
                                            { label: t("Đã cứu hộ"), value: REQUEST_STATUS.RESCUED },
                                        ]
                                    }
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </UserMarkerPlaceProvider>
    );
};

export default Help;
