import ErrorProcessService from "./ErrorProcessService";

function PlaceService() {
    const { errorProcessor } = ErrorProcessService();

    const getAnotherUserRequestPlaces = async() => {
        try {
            // Add your code here
        } catch (error) {
            errorProcessor(error);
        }
    }

    const getRescuerPlaces = async() => {
        try {
            // const response = await api.get(`/places/rescuer`, {
            //     params: {
            //         lat: userLocation.lat,
            //         lng: userLocation.lng,
            //     },
            // });

            const rescuerPlaces = [{
                    info: "264 Hoàng Văn Thái, Đà Nẵng",
                    location: {
                        lat: 16.058810,
                        lng: 108.15122
                    }
                },
                {
                    info: "20 Nguyễn Đình Trân, Đà Nẵng",
                    location: { lat: 16.018810, lng: 108.255480 }
                },
                {
                    info: "20 Phan Hành Sơn, Đà Nẵng",
                    location: { lat: 16.043860, lng: 108.239630 }
                }
            ];

            return rescuerPlaces;
        } catch (error) {
            errorProcessor(error);
        }
    }

    return {
        getAnotherUserRequestPlaces,
        getRescuerPlaces,
    };
}

export default PlaceService;