import api from '../utilities/api';

const StattisticService = () => {
    const getStatistics = async () => {
        try {
            const response = await api.get(`/statistic`);
            return response.data;
        } catch (error) {
            errorProcessor(error);
        }
    }

    return {
        getStatistics,
    };
}

export default StattisticService;

