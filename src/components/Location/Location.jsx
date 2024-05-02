import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight, faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { useContext, useEffect } from "react";

import MyMapComponent from "../MyMapComponent/MyMapComponent"
import { UserContext } from "../../Context/UserContext/UserContext";

const Location = () => {
    const mapContainerStyle = {
        height: "100vh",
        width: "100%"
    };

    const { setActiveItem } = useContext(UserContext);

    useEffect(() => {
        setActiveItem("location");
    }, []);

    return (
        <div className="flex flex-col flex-1 w-full bg-white">
            <div className="flex my-2 justify-center items-center">

                <div className='flex border rounded-xl px-2 justify-center items-center shadow-md' >
                    <FontAwesomeIcon icon={faLocationDot} color="red" />
                    <input
                        placeholder='Enter your address'
                        className='outline-none px-3 py-2'
                        id='search-input'
                    />
                    <button className="flex justify-center items-center bg-red-500 w-8 h-8 rounded-full">
                        <FontAwesomeIcon icon={faArrowRight} color="white" size="sm" />
                    </button>
                </div>
            </div>
            <div className="flex justify-center items-center">
                <MyMapComponent mapContainerStyle={mapContainerStyle} />
            </div>
        </div>
    )
}

export default Location
