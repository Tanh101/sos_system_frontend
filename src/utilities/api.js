import axios from "axios";
import { AppBaseUrl as baseURL } from "../constants/config";

const buildApi = () => {
    const instance = axios.create({
        baseURL,
        withCredentials: false,
    });

    instance.interceptors.request.use((config) => {
        const accessToken = window.localStorage.getItem("accessToken");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    });

    const refreshToken = async () => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const refreshToken = localStorage.getItem("refreshToken");
            const response = await instance.post("/auth/refresh", {
                accessToken,
                refreshToken,
            });
            if (response.status === 200) {
                localStorage.setItem("accessToken", response.data.accessToken);
                return response.data.accessToken;
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }

    instance.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            const originalRequest = error.config;
            if (error.response && error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                try {
                    const accessToken = await refreshToken();
                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                    return instance(originalRequest);
                } catch (error) {
                    return Promise.reject(error);
                }
            }
            return Promise.reject(error);
        }
    );

    return instance;
}

const api = buildApi();
export default api;
