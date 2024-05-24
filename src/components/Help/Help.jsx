import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Route, Routes } from 'react-router-dom';

import { UserContext, UserProvider } from "../../Context/UserContext/UserContext";
import RequestService from "../../services/RequestService";
import Loading from "../Loading/Loading";
import Post from "./Post/Post";
import { useTranslation } from "react-i18next";
import Popup from "reactjs-popup";
import FormRequest from "../Emergency/FormRequest/FormRequest";
import { UserMarkerPlaceProvider } from "../../Context/UserMarkerPlaceContext/UserMarkerPlaceContext";
import { Select } from "antd";

const Help = () => {
    const { t } = useTranslation();

    const { getRequests, getRequestType } = RequestService();

    const { user, setActiveItem, receiveEmergencyRequest } = useContext(UserContext);

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    const [realTimeRequest, setRealTimeRequest] = useState([]);
    const [search, setSearch] = useState('');
    const [requests, setRequests] = useState({});
    const [loading, setLoading] = useState(true);
    const [requestType, setRequestType] = useState([]);

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


    useEffect(() => {
        if (user && user.role === 'rescuer') {
            receiveEmergencyRequest((data) => {
                setRealTimeRequest([...realTimeRequest, data]);
                fetchRequests();  // Thêm lời gọi fetchRequests để cập nhật lại danh sách requests
            });
        }
    }, [user, realTimeRequest]);

    if (loading) {
        return <Loading />
    }
    return (
        <UserMarkerPlaceProvider>
            <div className="flex flex-col flex-1 bg-white overflow-y-auto">
                <div className="flex h-screen rounded-lg pb-20 justify-between my-3">
                    <div className="flex flex-col bg-[#f6f8f9] border-slate-100 border rounded-lg w-72 mr-10 h-96 sticky top-0 px-8 py-4">
                        <div className="flex">
                            <label htmlFor="filter">{t("Loại yêu cầu: ")}</label>
                            <Select
                                defaultValue={t("Tất cả")}
                                style={{ width: 120, borderColor: "red", marginLeft: 10, outlineColor: "red" }}
                                onChange={handleChange}
                                id="filter"
                                options={requestType}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col flex-1 overflow-y-auto pr-12">
                        <div className="flex justify-between items-center sticky top-0 bg-white mb-4 mx-5">
                            <div className="flex justify-center items-center w-96 px-2 py-2 border outline-none focus:border-red-600 rounded-xl">
                                <FontAwesomeIcon icon={faSearch} color='red' size='lg' />
                                <input className="outline-none w-full ml-2"
                                    type="text"
                                    value={search}
                                    placeholder={t("Tìm kiếm yêu cầu...")}
                                    onChange={(e) => setSearch(e.target.value)} />
                            </div>
                            <div className="flex justify-center items-center">
                                <Popup
                                    trigger={

                                        <button className="p-2 bg-red-600 text-white rounded-2xl">{t("Tạo yêu cầu")}</button>
                                    }
                                    modal
                                    nested
                                    contentStyle={{ borderRadius: '10px' }}
                                >
                                    <FormRequest isEmergency={false} />
                                </Popup>
                            </div>
                        </div>
                        {!requests && <div className='flex justify-center items-center h-96'>
                            <p className='text-2xl'>{t("Không có yêu cầu nào")}</p>
                        </div>
                        }
                        {requests &&
                            <Post requests={requests} realTimeRequest={realTimeRequest} />
                        }
                    </div>
                </div>
            </div>
        </UserMarkerPlaceProvider>
    );
};

export default Help;
