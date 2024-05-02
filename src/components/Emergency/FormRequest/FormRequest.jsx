import { useState } from "react"
import { faArrowRight, faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import MyMapComponent from "../../MyMapComponent/MyMapComponent"
import "./FormRequest.css"

const FormRequest = () => {

    const mapContainerStyle = {
        height: "40vh",
        width: "100%"
    };

    const [requestContent, setRequestContent] = useState("Tôi cần cứu hộ khẩn cấp")
    const [userAddress, setUserAddress] = useState("40 Ngô Sĩ Liên, Đà Nẵng")
    return (
        <div className='bg-white items-center justify-center rounded-lg shadow-lg px-6 pb-6 min-w-96 w-full'>
            <form className="flex flex-col rounded-xl">
                <div className="flex lg:flex-row flex-col justify-start lg:items-center items-start my-5">
                    <label className="lg:mr-4 font-semibold" htmlFor="address">Nhập địa chỉ của bạn</label>
                    <div className='flex border rounded-xl px-2 justify-center items-center shadow-md' >
                        <FontAwesomeIcon icon={faLocationDot} color="red" />
                        <input
                            placeholder='Enter your address'
                            className='outline-none px-3 py-2'
                            id='search-input'
                            value={userAddress}
                            onChange={(e) => { setUserAddress(e.target.value) }}
                        />
                        <button className="flex justify-center items-center bg-red-500 w-8 h-8 rounded-full">
                            <FontAwesomeIcon icon={faArrowRight} color="white" size="sm" />
                        </button>
                    </div>
                </div>
                <div className="flex flex-col mt-2">
                    {/* <button className="fixed z-10 top-[650px] right-[626px] bg-slate-300 px-1 py-1">
                        <FontAwesomeIcon icon={faLocationCrosshairs} color="red" size="xl" />
                    </button> */}
                    <MyMapComponent mapContainerStyle={mapContainerStyle} />
                    <div className="flex flex-col justify-between">

                        <div className="flex my-5">
                            <div className="flex w-44 flex-wrap">
                                <label className="mr-5 font-semibold" htmlFor="about">Loại hỗ trợ</label>
                            </div>
                            <select className="border rounded-lg p-2 focus:border-[#F73334] focus:border-2" name="" id="">

                                <option value="">Cấp cứu</option>
                                <option value="">Bảo lũ</option>
                                <option value="">Biển đảo</option>
                                <option value="">Núi rừng</option>
                                <option value="">Khác</option>
                            </select>
                        </div>
                        <div className="flex lg:flex-row flex-col my-5">
                            <div className="flex w-44 flex-wrap">
                                <label className="mr-5 font-semibold" htmlFor="about">Nội dung cần hỗ trợ</label>
                            </div>

                            <textarea className="outline-none p-2 border focus:border-[#F73334] focus:border-2 rounded-xl"
                                id="about"
                                name="about"
                                rows={4}
                                cols={60}
                                value={requestContent}
                                onChange={(e) => { setRequestContent(e.target.value) }}
                            />
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <button className="bg-[#F73334] text-white p-3 px-5 font-semibold text-lg rounded-2xl shadow-md hover:bg-red-600">
                            Xác nhận
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default FormRequest
