import { useNavigate } from "react-router-dom";
import { Toastify } from "../toastify/Toastify";
import api from "../utilities/api";

function AuthService() {
    const navigate = useNavigate();

    const errorProcessor = (error) => {
        if (error.response && error.response.status === 401) {
            navigate("/");
        }

        if (error.response) {
            Toastify.error(error.response.data.message);
        }
    }

    const signup = async (email, name, password, repeatPassword, phoneNumber, address) => {
        try {
            const response = await api.post("/auth/signup", {
                email,
                name,
                password,
                repeatPassword,
                phoneNumber,
                address,
            });
            if (response.status === 200) {
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
                role && navigate(`/${role === "admin" ? "admin" : "dashboard"}`);
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
                navigate("/");
            }
        } catch (error) {
            errorProcessor(error);
        }
    }

    const getUserProfile = async () => {
        try {
            const response = await api.get("/auth/me");
            if (response.status === 200) {
                return response.data.user;
            }
        } catch (error) {
            errorProcessor(error);
        }
    }

    return {
        signup,
        login,
        logout,
        getUserProfile
    };
}

export default AuthService;
