import ErrorProcessService from "./ErrorProcessService";
import api from "../utilities/api";
import GoogleMapService from "./GoogleMapService";

const LocationService = () => {
    const { ReverseGeocoding } = GoogleMapService();
    const { errorProcessor } = ErrorProcessService();

    const getCurrentUserLocation = async () => {
        if ("geolocation" in navigator) {
            const fetchGeocoding = async (location) => {
                try {
                    const res = await ReverseGeocoding(location);
                    return res;
                } catch (error) {
                    console.error("Error fetching geocoding:", error);
                }
            }

            const positionPromise = new Promise((resolve, reject) => {
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
            return positionPromise;
        }
        return null;
    }

    const createOrUpdateUserLocation = async (location) => {
        try {
            await api.post("/user/location", {
                latitude: location.lat,
                longitude: location.lng
            });

        } catch (error) {
            errorProcessor(error);
        }
    }

    return {
        getCurrentUserLocation,
        createOrUpdateUserLocation
    };
};

export default LocationService;
