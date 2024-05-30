import { useNavigate } from "react-router-dom";
import { Toastify } from "../toastify/Toastify";
import api from "../utilities/api";
import ErrorProcessService from "./ErrorProcessService";

function AuthService() {
    const navigate = useNavigate();

    const { errorProcessor } = ErrorProcessService();


    const signup = async (email, name, password, repeatPassword, dob, phoneNumber, address) => {
        try {
            if (password !== repeatPassword) {
                Toastify.error("Passwords do not match");
                return;
            }

            const response = await api.post("/auth/register", {
                email,
                name,
                password,
                repeatPassword,
                dob,
                phoneNumber,
                address,
            });
            if (response.status === 201) {
                Toastify.success("Signup Successful");
                navigate("/login");
            }
        } catch (error) {
            errorProcessor(error);
        }
    }

    const login = async (email, password) => {
        try {
            const response = await api.post("/auth/login", {
                email,
                password,
            });
            if (response.status === 200) {

                Toastify.success("Login Successful");

                localStorage.setItem("accessToken", response.data.accessToken);
                localStorage.setItem("refreshToken", response.data.refreshToken);
                localStorage.setItem("email", response.data.user.email);

                const role = response.data.user.role;
                if (role === 'user') {
                    navigate("/");
                } else if (role === 'admin') {
                    navigate("/admin");
                } else if (role === 'rescuer') {
                    navigate("/help");
                } else {
                    navigate("/login");
                }
            }
        } catch (error) {
            errorProcessor(error);
        }
    };

    const logout = async () => {
        try {
            const response = await api.post("/auth/logout");
            if (response.status === 200) {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("email");
                navigate("/login");
            }
        } catch (error) {
            errorProcessor(error);
        }
    }

    const getUserProfile = async () => {
        try {
            const response = await api.get("/user/profile");
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            console.log(error);
            errorProcessor(error);
        }
    }

    const refreshAccessToken = async () => {
        try {
            const refreshToken = localStorage.getItem("refreshToken");
            const response = await api.post("/auth/refresh", {
                refreshToken: refreshToken,
            });

            const { accessToken } = response.data;
            localStorage.setItem("accessToken", accessToken);

            return accessToken;
        } catch (error) {
            console.log(error);
            errorProcessor(error);
        }
    }

    return {
        signup,
        login,
        logout,
        getUserProfile,
        refreshAccessToken
    };
}

export default AuthService;