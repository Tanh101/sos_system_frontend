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
                const data = await response.json();
                if (data.results.length > 0) {
                    return data.results[0].formatted_address;
                }
            }
            return null;
        } catch (error) {
            console.log(error);
        }
    }

    return {
        ReverseGeocoding,
    };
}

export default GoogleMapService;
