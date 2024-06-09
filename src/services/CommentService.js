import { Toastify } from "../toastify/Toastify";
import api from "../utilities/api";
import ErrorProcessService from "./ErrorProcessService";

const CommentService = () => {
    const getComments = async () => {
        try {
            const response = await api.get("/comments");
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            console.log(error);
        }
    }

    const createComment = async (requestId, content) => {
        try {
            const response = await api.post("/comments", {
                requestId,
                content,
            });
            if (response.status === 201) {
                return response.data;
            }
        } catch (error) {
            console.log(error);
        }
    }

    const updateComment = async (id, content) => {
        try {
            const response = await api.put(`/comments/${id}`, {
                content,
            });
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            console.log(error);
        }
    }

    const deleteComment = async (id) => {
        try {
            const response = await api.delete(`/comments/${id}`);
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            console.log(error);
        }
    }

    return {
        getComments,
        createComment,
        updateComment,
        deleteComment,
    }
}

export default CommentService;