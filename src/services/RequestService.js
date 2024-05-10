import ErrorProcessService from "./ErrorProcessService";
import api from "../utilities/api";
import { Toastify } from "../toastify/Toastify";
import { Navigate, useNavigate } from "react-router-dom";

const RequestService = () => {
    const navigate = useNavigate();

    const { errorProcessor } = ErrorProcessService();

    const getRequestType = async () => {
        try {
            const response = await api.get('/type');
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            console.log(error);
            errorProcessor(error);
        }
    }

    const createEmergencyRequest = async (data) => {
        try {
            const response = await api.post('/requests', {
                requestTypeId: data.requestType,
                content: data.content,
                latitude: data.lat,
                longitude: data.lng,
                address: data.address,
                isEmergency: 1,
            });

            if (response.status === 200) {
                Toastify.success("Yêu cầu của bạn đã được gửi đi");
                navigate('/help');
                return response.data;
            }
        } catch (error) {
            console.log(error);
            errorProcessor(error);
        }
    }

    return {
        getRequestType,
        createEmergencyRequest,
    };
}

export default RequestService;
