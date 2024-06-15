import ErrorProcessService from "./ErrorProcessService";
import api from "../utilities/api";
import { ITEM_PER_PAGE, PAGE } from "../constants/config";

const UserService = () => {
    const { errorProcessor } = ErrorProcessService();

    const processData = (data) => {
        const pagination = {
            current: data.currentPage,
            pageSize: data.itemPerPage,
            total: data.totalResult,
        };

        return pagination;
    }

    const getUsers = async (page = PAGE, itemPerPage = ITEM_PER_PAGE) => {
        try {
            const response = await api.get(`/user?itemPerpage=${itemPerPage}&page=${page}`);
            const pagination = processData(response.data.pagination);
            return { users: response.data.users, pagination };
        } catch (error) {
            errorProcessor(error);
        }
    }   

    const updateUserStatus = async (id) => {
        try {
            await api.patch(`/user/${id}`);
        } catch (error) {
            errorProcessor(error);
        }
    }

    return {
        getUsers,
        updateUserStatus,
    };
}

export default UserService;
