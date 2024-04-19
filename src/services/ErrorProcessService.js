import { useNavigate } from "react-router-dom";
import { Toastify } from "../toastify/Toastify";

function ErrorProcessService() {
    const navigate = useNavigate();

    const errorProcessor = (error) => {
        if (error.response && error.response.status === 401) {
            navigate("/login");
        }

        if (error.response) {
            Toastify.error(error.response.data.message);
        } else if (error.message === 'Network Error') {
            Toastify.error("Network Error: Please check your internet connection.");
            navigate("/login")
        } else {
            Toastify.error("An error occurred. Please try again later.");
        }
    }

    return {
        errorProcessor,
    };
}

export default ErrorProcessService;
