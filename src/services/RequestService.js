import ErrorProcessService from "./ErrorProcessService";
import api from "../utilities/api";
import { Toastify } from "../toastify/Toastify";
import { Navigate, useNavigate } from "react-router-dom";

const RequestService = () => {
    const navigate = useNavigate();

    const { errorProcessor } = ErrorProcessService();

    const getRequestType = async() => {
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
                requestType: item.requestTypes.name,
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
            }
            return res;
        } catch (error) {
            console.log(error);
        }
    };

    const createRequest = async(data) => {
        try {
            const media = data.avatarResponses.map(item => item);

            const response = await api.post("/requests", {
                requestTypeId: data.requestType,
                content: data.content,
                latitude: data.lat,
                longitude: data.lng,
                address: data.address,
                isEmergency: data.isEmergency ? 1 : 0,
                media: media
            });

            if (response.status === 200) {
                Toastify.success("Yêu cầu của bạn đã được gửi đi");
                navigate("/help");
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
                    requestType: item.requestTypes.name,
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
                };
            });
        } catch (error) {
            console.log(error);
        }
    };

    const getRequests = async() => {
        try {
            const response = await api.get("/requests");
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

    const upvotePost = async(id) => {
        try {
            const response = await api.post(`/requests/${id}/vote`);
            if (response.status === 200) {
                return response.data.voteCount;
            }
        } catch (error) {
            console.log(error);
            errorProcessor(error);
        }
    }

    const downvotePost = async(id) => {
        try {
            const response = await api.delete(`/requests/${id}/vote`);
            if (response.status === 200) {
                return response.data.voteCount;
            }
        } catch (error) {
            console.log(error);
            errorProcessor(error);
        }
    };

    const getRequestDetail = async(id) => {
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

    return {
        getRequestType,
        createRequest,
        getRequests,
        upvotePost,
        downvotePost,
        getRequestDetail,
    };
};

export default RequestService;