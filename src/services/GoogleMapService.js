import { Toastify } from "../toastify/Toastify";
import ErrorProcessService from "./ErrorProcessService";

function GoogleMapService() {
    const googleMapApiUrl = import.meta.env.VITE_GOOGLE_MAPS_API_URL;
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const { errorProcessor } = ErrorProcessService();

    const ReverseGeocoding = async (location) => {
        try {
            if (!location) {
                Toastify.error("Location is required");
            }

            const response = await fetch(`${googleMapApiUrl}latlng=${location.lat},${location.lng}&key=${apiKey}`);

            if (response.status === 200) {
                return response.results;
            }
        } catch (error) {
            errorProcessor(error);
        }
    }

    return {
        ReverseGeocoding,
    };
}

export default GoogleMapService;
