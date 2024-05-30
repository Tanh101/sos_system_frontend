import axios from "axios";
import { ChatbotUrl } from "../constants/config";
import ErrorProcessService from "./ErrorProcessService";

const ChatService = () => {
    const { errorProcessor } = ErrorProcessService();

    const getMessages = async (query) => {
        try {
            const response = await axios.post("http://localhost:8001/api/conversations", {
                query: query
            });
            if (response.status === 200) {
                return response.data.answer.answer;
            }
        } catch (error) {
            console.log(error);
        }
    }

    return {
        getMessages
    };
}

export default ChatService;
