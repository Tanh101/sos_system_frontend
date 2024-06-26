import { Toastify } from "../toastify/Toastify";
import ErrorProcessService from "./ErrorProcessService";
import api from "../utilities/api";

let staticApiKey = null;

const getGoogleMapAPIKey = async () => {
    try {
        if (staticApiKey) {
            return staticApiKey;
        }

        const response = await api.get('/seeder/key');
        if (response.status === 200) {
            staticApiKey = response.data.key;
            return response.data.key;
        } else {
            throw new Error('Failed to fetch API key');
        }
    } catch (error) {
        console.error("Error fetching API key:", error);
    }
}

function GoogleMapService() {
    const googleMapApiUrl = import.meta.env.VITE_GOOGLE_MAPS_API_URL;
    const { errorProcessor } = ErrorProcessService();

    const ReverseGeocoding = async (location) => {
        try {
            if (!location) {
                Toastify.error("Location is required");
                return null;
            }

            const apiKey = await getGoogleMapAPIKey();
            const response = await fetch(`${googleMapApiUrl}latlng=${location.lat},${location.lng}&key=${apiKey}`);
            if (response.status === 200) {
                const data = await response.json();
                if (data.results.length > 0) {
                    return data.results[0].formatted_address;
                }
            } else {
                Toastify.error("Failed to fetch geocoding data");
                errorProcessor.process(response);
            }
            return null;
        } catch (error) {
            console.log(error);
            Toastify.error("An error occurred while fetching geocoding data");
            errorProcessor.process(error);
            return null;
        }
    }

    return {
        ReverseGeocoding,
        getGoogleMapAPIKey,
    };
}

export default GoogleMapService;
