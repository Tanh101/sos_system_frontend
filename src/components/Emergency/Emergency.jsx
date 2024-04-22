import MyMapComponent from "../MyMapComponent/MyMapComponent"

const Emergency = () => {

    return (
        <div className="flex flex-col flex-1 w-full bg-white">
            <div className="flex flex-col justify-center items">
                <h1>Are you in an emergency?</h1>
                <div className="flex justify-start items-start">
                    <p>Press</p>
                    <p>SOS</p>
                    <p>button, your live location will be shared with the nearest help center and your emegency contacts.</p>
                </div>
            </div>
            <div className="flex justify-center items-center mt-5 ">
                <MyMapComponent />
            </div>
        </div>
    )
}

export default Emergency
