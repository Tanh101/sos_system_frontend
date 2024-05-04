import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight, faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { useContext, useEffect } from "react";

import MyMapComponent from "../MyMapComponent/MyMapComponent"
import { UserContext } from "../../Context/UserContext/UserContext";
import { fullWindowMapContainerStyle } from "../../constants/config";
import LocationSearchInput from "../LocationSearchInput/LocationSearchInput";

const Location = () => {
    const { setActiveItem } = useContext(UserContext);

    useEffect(() => {
        setActiveItem("location");
    }, []);

    return (
        <div className="flex flex-col flex-1 w-full bg-white">
            <div className="flex my-2 justify-center items-center">
                <div className='flex border w--[600px] px-2 rounded-xl justify-center items-center shadow-md' >
                    <FontAwesomeIcon icon={faLocationDot} color="red" />
                    <LocationSearchInput />
                    <button className="flex justify-center items-center bg-red-500 w-8 h-8 rounded-full">
                        <FontAwesomeIcon icon={faArrowRight} color="white" size="sm" />
                    </button>
                </div>
            </div>
            <div className="flex justify-center items-center">
                <MyMapComponent mapContainerStyle={fullWindowMapContainerStyle} />
            </div>
        </div>
    )
}

export default Location
