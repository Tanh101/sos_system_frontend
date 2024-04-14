import axios from "axios";
import { AppBaseUrl as baseURL } from "../constants/config";

function buildApi() {
    const instance = axios.create({
        baseURL,
        withCredentials: false,
    });

    instance.interceptors.request.use((config) => ({
        ...config,
        headers: {
            ...config.headers,
            Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
        },
    }));

    instance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    return instance;
}

const api = buildApi();
export default api;
