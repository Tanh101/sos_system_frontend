import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import MyMapComponent from "../MyMapComponent/MyMapComponent"
import { faArrowRight, faLocationDot } from "@fortawesome/free-solid-svg-icons"

const Emergency = () => {
    const mapContainerStyle = {
        height: "100vh",
        width: "100%"
    };

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

export default Emergency
