import axios from "axios";
import { ChatbotUrl } from "../constants/config";
import ErrorProcessService from "./ErrorProcessService";
import api from "../utilities/api";

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

    const getConversationsByUserId = async (userId) => {
        try {
            const response = await api.get(`/conversation/`);
            return response.data;
        } catch (error) {
            console.error("Error fetching conversations:", error);
            throw error;
        }
    };

    const getInboxMessages = async (receiverId) => {
        try {
            const response = await api.get(`conversation/${receiverId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching messages:", error);
            throw error;
        }
    }

    return {
        getMessages,
        getConversationsByUserId,
        getInboxMessages,

    };
}

export default ChatService;
