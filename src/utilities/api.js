import axios from "axios";
import { AppBaseUrl } from "../constants/config";

const instance = axios.create({
    baseURL: AppBaseUrl,
    headers: {
        "Content-Type": "application/json",
    },
});

instance.interceptors.request.use((config) => ({
    ...config,
    headers: {
        ...config.headers,
        Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
    },
}));


instance.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;

        if (originalConfig.url !== "/auth/login" && err.response) {
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;

                const refreshToken = localStorage.getItem("refreshToken");
                if (!refreshToken) {
                    window.location.href = "/login";
                    return;
                }
                try {
                    const rs = await instance.post("/auth/refresh", {
                        refreshToken: refreshToken,
                    });

                    const { accessToken } = rs.data;
                    localStorage.setItem("accessToken", accessToken)
                    
                    return instance(originalConfig);
                } catch (_error) {
                    return Promise.reject(_error);
                }
            }
        }

        return Promise.reject(err);
    }
);

export default instance;
