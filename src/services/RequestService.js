import ErrorProcessService from "./ErrorProcessService";
import api from "../utilities/api";
import { Toastify } from "../toastify/Toastify";
import { useNavigate } from "react-router-dom";

const RequestService = () => {
    const navigate = useNavigate();

    const { errorProcessor } = ErrorProcessService();

    const getRequestType = async () => {
        try {
            const response = await api.get("/type");
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            console.log(error);
            errorProcessor(error);
        }
    };

    const processRequestData = (item) => {
        try {
            const res = {
                id: item.id,
                requestType: item.requestTypes?.name,
                requestTypeIcon: item.requestTypes?.iconUrl,
                content: item.content,
                address: item.address,
                latitude: item.latitude,
                longitude: item.longitude,
                status: item.status,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
                media: item.requestMedia,
                user: item.users,
                isEmergency: item.isEmergency,
                voteCount: item.voteCount,
                voteType: item?.votes[0]?.voteType,
                distance: item.distance,
                userId: item.userId,
                rescuerId: item.rescuerId
            }
            return res;
        } catch (error) {
            console.log(error);
        }
    };

    const createRequest = async (data) => {
        try {
            let formData = {};

            if (data.isEmergency) {
                formData = {
                    latitude: data.lat,
                    longitude: data.lng,
                    address: data.address,
                    isEmergency: data.isEmergency ? 1 : 0,
                }
            } else {
                const media = data.avatarResponses.map(item => item);

                formData = {
                    requestTypeId: data.requestType,
                    content: data.content,
                    latitude: data.lat,
                    longitude: data.lng,
                    address: data.address,
                    isEmergency: data.isEmergency ? 1 : 0,
                    media: media
                }
            }

            const response = await api.post("/requests", formData);

            if (response.status === 200) {
                Toastify.success("Yêu cầu của bạn đã được gửi đi");
                navigate(`/help/detail/${response.data.id}`);

                return response.data;
            }
        } catch (error) {
            console.log(error);
            errorProcessor(error);
            return null;
        }
    };

    const processRequestResponse = (data) => {
        try {
            return data.map((item) => {
                return {
                    id: item.id,
                    requestType: item.requestTypes?.name,
                    requestTypeIcon: item.requestTypes?.iconUrl,
                    content: item.content,
                    address: item.address,
                    latitude: item.latitude,
                    longitude: item.longitude,
                    status: item.status,
                    createdAt: item.createdAt,
                    updatedAt: item.updatedAt,
                    media: item.requestMedia,
                    user: item.users,
                    isEmergency: item.isEmergency,
                    voteCount: item.voteCount,
                    voteType: item?.votes[0]?.voteType,
                    distance: item?.distance,
                    userId: item.userId,
                    rescuerId: item.rescuerId,
                };
            });
        } catch (error) {
            console.log(error);
        }
    };

    const getRequests = async (requestType = null, status = null, isEmergency = null) => {
        try {
            const response = await api.get("/requests", {
                params: {
                    requestType,
                    status,
                    isEmergency,
                },
            });

            if (response.status === 200) {
                const requests = processRequestResponse(response.data.requests);
                const pagination = response.data.paginations;
                return {
                    requests,
                    pagination,
                };
            }
        } catch (error) {
            console.log(error);
            errorProcessor(error);
        }
    };


    const vote = async (id, voteType) => {
        try {
            const response = await api.post(`/requests/${id}/vote`, {
                voteType
            });

            if (response.status === 200) {
                return response.data.voteCount;
            }
        } catch (error) {
            console.log(error);
            errorProcessor(error);
        }
    }

    const getRequestDetail = async (id) => {
        try {
            const response = await api.get(`/requests/${id}`);
            if (response.status === 200) {
                return processRequestData(response.data);
            }
        } catch (error) {
            console.log(error);
            errorProcessor(error);
        }
    };

    const isExisEmergencyRequest = async () => {
        try {
            const response = await api.get('/isEmergency');
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            console.log(error);
            errorProcessor(error);
        }
    }

    const updateRequestStatus = async (id, status) => {
        try {
            const response = await api.put(`/requests/${id}?status=${status}`);

            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            console.log(error);
            errorProcessor(error);
        }
    }

    const getRequestOwner = async (requestType = null, status = null, isEmergency = null) => {
        try {
            const response = await api.get("/requests/me", {
                params: {
                    requestType,
                    status,
                    isEmergency,
                },
            });

            if (response.status === 200) {
                const requests = processRequestResponse(response.data.requests);
                const pagination = response.data.paginations;
                return {
                    requests,
                    pagination,
                };
            }
        } catch (error) {
            console.log(error);
            errorProcessor(error);
        }
    }

    const getRequestIsTracking = async () => {
        try {
            const response = await api.get("/requests/active");
            if (response.status === 200) {
                const requests = processRequestResponse(response.data.requests);
                const pagination = response.data.paginations;
                return {
                    requests,
                    pagination,
                };
            }
        } catch (error) {
            console.log(error);
            errorProcessor(error);
        }
    }

    const getRescuerRequest = async (status = null) => {
        try {
            const response = await api.get("/requests/rescuer", {
                params: {
                    status
                }
            });

            if (response.status === 200) {
                const requests = processRequestResponse(response.data.requests);
                const pagination = response.data.paginations;
                return {
                    requests,
                    pagination,
                };
            }
        } catch (error) {
            console.log(error);
            errorProcessor(error);
        }
    }

    const getDangerRequest = async () => {
        try {
            const response = await api.get("/danger/request");
            if (response.status === 200) {
                const requests = processRequestResponse(response.data.requests);
                const pagination = response.data.paginations;
                return {
                    requests,
                    pagination,
                };
            }
        } catch (error) {
            console.log(error);
            errorProcessor(error);
        }
    }

    const processDangerResponse = (data) => {
        try {
            const res = data.map((item) => {
                return {
                    location: {
                        lat: item.location.coordinates[1],
                        lng: item.location.coordinates[0]
                    },
                    radius: item.radius,
                    message: item.message,
                }
            });

            return res;
        } catch (error) {
            console.log(error);
            errorProcessor(error);
        }
    }

    const getDangerArea = async () => {
        try {
            const response = await api.get("/danger");
            if (response.status === 200) {
                const dangerData = processDangerResponse(response.data);
                return dangerData;
            }
        } catch (error) {
            console.log(error);
            errorProcessor(error);
        }
    }

    return {
        getRequestType,
        createRequest,
        getRequests,
        vote,
        getRequestDetail,
        isExisEmergencyRequest,
        updateRequestStatus,
        getRequestOwner,
        getRequestIsTracking,
        getRescuerRequest,
        getDangerRequest,
        getDangerArea,
    };
};

export default RequestService;