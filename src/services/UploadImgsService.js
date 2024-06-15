import axios from 'axios';
import ErrorProcessService from './ErrorProcessService';
import { AppBaseUrl } from '../constants/config';

const UploadImgsService = () => {
    const { processError } = ErrorProcessService();

    const upload = async (file) => {
        try {
            const formData = new FormData();
            formData.append('files', file);

            const response = await axios.post(AppBaseUrl + '/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            processError(error);
        }
    }
    return {
        upload
    };
};

export default UploadImgsService;