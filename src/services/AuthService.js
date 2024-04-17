import { useNavigate } from "react-router-dom";
import { Toastify } from "../toastify/Toastify";
import api from "../utilities/api";

function AuthService() {
    const navigate = useNavigate();

    const errorProcessor = (error) => {
        if (error.response && error.response.status === 401) {
            navigate("/login");
        }

        if (error.response) {
            Toastify.error(error.response.data.message);
        }
    }

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
                }else if (role === 'admin') {
                    navigate("/admin");
                }else if (role === 'recuser'){
                    navigate("/recuser");
                }else {
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
