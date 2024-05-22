import ErrorProcessService from "./ErrorProcessService";

function PlaceService() {
    const { errorProcessor } = ErrorProcessService();

    const getAnotherUserRequestPlaces = async () => {
        try {
            // Add your code here
        } catch (error) {
            errorProcessor(error);
        }
    }

    const getRescuerPlaces = async () => {
        try {
            // const response = await api.get(`/places/rescuer`, {
            //     params: {
            //         lat: userLocation.lat,
            //         lng: userLocation.lng,
            //     },
            // });

            const rescuerPlaces = [
                {
                    info: "264 Hoàng Văn Thái, Hòa Khánh Nam, Liên Chiểu, Da Nang, Vietnam",
                    location: {
                        lat: 16.0551652,
                        lng: 108.1518924
                    }
                },
                {
                    info: "121 Hoàng Diệu, Phước Ninh, Q. Hải Châu, Đà Nẵng, Vietnam",
                    location: {
                        lat:
                            16.0627522
                        , lng: 108.2179095
                    }
                },
                {
                    info: "30 Lê Thanh Nghị, Hòa Cường, Hòa Cường Bắc, Hải Châu District, Da Nang, Vietnam",
                    location: { lat: 16.0432311, lng: 108.2172598 }
                },
                {
                    info: "20 Nguyễn Đình Trân, Khuê Mỹ, Ngũ Hành Sơn, Da Nang, Vietnam",
                    location: { lat: 16.0188639, lng: 108.2556337 }
                },
                {
                    info: "42 Nguyễn Chánh, Hòa Khánh Bắc, Liên Chiểu, Da Nang, Vietnam",
                    location: { lat: 16.0824251, lng: 108.1482057 }
                },
                {
                    info: "12 Đường Dũng Sĩ Thanh Khê, Liên Chiểu, Da Nang, Vietnam",
                    location: { lat: 16.0696117, lng: 108.1810698 }
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