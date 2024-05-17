import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import avatar from "../../assets/imgs/avatar.png";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
    return (
        <div className="flex flex-col bg-white flex-1">
            <div className="flex justify-start items-start lg:mx-40 md:mx-10">
                <div className="flex flex-col flex-1 items-center justify-center p-4 ">
                    <div className="flex justify-start">
                        <div className="relative">
                            <img
                                className="w-24 h-24 rounded-full object-cover"
                                src={avatar}
                                alt="User Avatar"
                            />
                            <button
                                className="absolute bottom-0 right-0 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center border border-white"
                                onClick={() => alert('Change Avatar')}
                            >
                                <FontAwesomeIcon icon={faCamera} />
                            </button>
                        </div>
                        <div className="ml-4">
                            <p className="text-lg font-semibold">test</p>
                            <p className="text-sm text-gray-600">test@gmail.com</p>
                        </div>
                    </div>
                    <div className="flex my-10 py-3 border-b">
                        <button className="px-2 py-2 mx-5 rounded-2xl border-white hover:bg-slate-150 ">Overview</button>
                        <button className="px-2 py-2 mx-5 rounded-2xl border-white hover:bg-slate-100">Post</button>
                        <button className="px-2 py-2 mx-5 rounded-2xl border-white hover:bg-slate-100 ">Overview</button>

                    </div>
                </div>
                <div className="flex mx-10 w-96 h-96 bg-slate-50 rounded-lg shadow-sm p-10">
                    test
                </div>
            </div>
        </div>
    )
}

export default Profile
