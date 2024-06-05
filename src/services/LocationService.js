import ErrorProcessService from "/src/services/ErrorProcessService.js";
import api from "/src/utilities/api.js";
import GoogleMapService from "/src/services/GoogleMapService.js";

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
            errorProcessor(error);
        }
    };

    return {
        getCurrentUserLocation,
        createOrUpdateUserLocation
    };
};

export default LocationService;
