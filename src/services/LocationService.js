import ErrorProcessService from "../services/ErrorProcessService.js";
import api from "../utilities/api.js";
import GoogleMapService from "../services/GoogleMapService";

const LocationService = () => {
    const { ReverseGeocoding } = GoogleMapService();
    const { errorProcessor } = ErrorProcessService();

    const getCurrentUserLocation = async () => {
        const fetchGeocoding = async (location) => {
            try {
                const res = await ReverseGeocoding(location);
                return res;
            } catch (error) {
                console.error("Error fetching geocoding:", error);
            }
        };

        try {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const address = await fetchGeocoding({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        });

                        resolve({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                            address: address
                        });
                    },
                    (error) => {
                        reject(error);
                    }
                );
            });
            return position;
        } catch (error) {
            console.error("Error getting current user location:", error);
            return null;
        }
    };

    const createOrUpdateUserLocation = async (location) => {
        try {
            await api.post("/user/location", {
                latitude: location.lat,
                longitude: location.lng
            });
        } catch (error) {
            console.log(error);
        }
    };

    return {
        getCurrentUserLocation,
        createOrUpdateUserLocation
    };
};

export default LocationService;
