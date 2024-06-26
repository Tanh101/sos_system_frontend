import api from "../utilities/api";

const ChatbotService = () => {
    const getChatbotConversation = async () => {
        try {
            const response = await api.get("/conversation/chatbot");
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            console.log(error);
        }
    }

    const createChatbotConversation = async (sender, message) => {
        try {
            const response = await api.post("/conversation/chatbot", {
                sender: sender,
                text: message
            });
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            console.log(error);
        }
    }

    return {
        getChatbotConversation,
        createChatbotConversation,

    };
}

export default ChatbotService;
