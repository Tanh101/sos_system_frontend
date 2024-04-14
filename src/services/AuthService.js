import { useNavigate } from "react-router-dom";
import { Toastify } from "../toastify/Toastify";
import api from "../utilities/api";

function AuthService() {
    const navigate = useNavigate();
    const login = async (username, password) => {
        try {
            const response = await api.post("/auth/login", {
                username,
                password,
            });
            if (response.status === 200) {

                Toastify.success("Login Successful");

                localStorage.setItem("accessToken", response.data.accessToken);
                localStorage.setItem("refreshToken", response.data.refreshToken);
                localStorage.setItem("username", response.data.user.username);

                const role = response.data.user.role;
                role && navigate(`/${role === "admin" ? "admin" : "dashboard"}`);
            }
        } catch (error) {
            if (error.response) {
                Toastify.error(error.response.data.message);
            }
        }
    };

    const logout = async () => {
        try {
            const response = await api.post("/auth/logout");
            if (response.status === 200) {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("username");
                navigate("/");
            }
        } catch (error) {
            if (error.response) {
                Toastify.error(error.response.data.message);
            }
        }
    }

    const getUserProfile = async () => {
        try {
            const response = await api.get("/auth/me");
            if (response.status === 200) {
                return response.data.user;
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                navigate("/");
            }

            if (error.response) {
                Toastify.error(error.response.data.message);
            }
        }
    }

    return {
        login,
        logout,
        getUserProfile
    };
}

export default AuthService;
