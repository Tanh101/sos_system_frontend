import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";

import MyMapComponent from "../MyMapComponent/MyMapComponent";
import { UserContext } from "../../Context/UserContext/UserContext";
import { fullWindowMapContainerStyle } from "../../constants/config";
import LocationSearchInput from "../LocationSearchInput/LocationSearchInput";

const Location = () => {
    const { setActiveItem } = useContext(UserContext);
    const [searchLocation, setSearchLocation] = useState({
        location: {
            lat: null,
            lng: null,
        },
        info: ''
    })

    useEffect(() => {
        setActiveItem("location");
    }, []);

    return (
        <div className="flex flex-col flex-1 w-full bg-white">
            <div className="relative flex-1">
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 border w-[600px] px-4 py-1 rounded-xl bg-white shadow-md z-10 flex justify-between items-center">
                    <FontAwesomeIcon icon={faLocationDot} color="red" />
                    <LocationSearchInput searchLocation={searchLocation} setSearchLocation={setSearchLocation} />
                    <button className="flex justify-center items-center bg-red-500 w-8 h-8 rounded-full">
                        <FontAwesomeIcon icon={faArrowRight} color="white" size="sm" />
                    </button>
                </div>
                <MyMapComponent mapContainerStyle={fullWindowMapContainerStyle} searchLocation={searchLocation} />
            </div>
        </div>
    );
};

export default Location;
