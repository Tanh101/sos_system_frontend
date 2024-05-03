import { useContext, useEffect, useRef } from "react"
import { faArrowRight, faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import "./FormRequest.css"
import { UserContext } from "../../../Context/UserContext/UserContext"
import emergencyRequestSchema from "../../../validations/emergencyRequestSchema";
import RequestMap from "../RequestMap/RequestMap";
import { EmergencyMapContainerStyle } from "../../../constants/config";
import { UserMarkerPlaceContext } from "../../../Context/UserMarkerPlaceContext/UserMarkerPlaceContext";

const schema = emergencyRequestSchema

const FormRequest = () => {
    const { handleSubmit,
        register,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
    });

    const formSubmit = async (data) => {
        const { content, requestType } = data;
        console.log(content, requestLocation.address, requestType, requestLocation.lat, requestLocation.lng);
    }

    const { requestLocation } = useContext(UserMarkerPlaceContext);

    const handleAddressChange = (e) => {
        e.preventDefault();
        const address = e.target.value;

    };
    const handleSubmitAddress = () => {
        console.log("submit address");
    }

    return (
        <div className='bg-white items-center justify-center rounded-lg shadow-lg px-6 pb-6 min-w-96 w-full'>
            <form className="flex flex-col rounded-xl" onSubmit={handleSubmit(formSubmit)}>
                <div className="flex lg:flex-row flex-col justify-start lg:items-center items-start my-5">
                    <label className="lg:mr-4 font-semibold" htmlFor="address">Nhập địa chỉ của bạn</label>
                    <div className='flex border rounded-xl px-2 justify-between items-center shadow-md w-full' >
                        <FontAwesomeIcon icon={faLocationDot} color="red" />
                        <input
                            placeholder="Enter your address"
                            className={`outline-none px-3 py-2 w-full ${errors.address ? "border-red-500" : ""
                                }`}
                            id="search-input"
                            value={requestLocation.address}
                            onChange={handleAddressChange}
                        />
                        <button className="flex justify-center items-center bg-red-500 w-8 h-8 rounded-full"
                            type="button"
                            onClick={handleSubmitAddress}>
                            <FontAwesomeIcon icon={faArrowRight} color="white" size="sm" />
                        </button>
                    </div>
                </div>
                <div className="flex flex-col mt-2">
                    <RequestMap mapContainerStyle={EmergencyMapContainerStyle} />
                    <div className="flex flex-col justify-between">

                        <div className="flex my-5 flex-wrap">
                            <div className="flex w-44 flex-wrap">
                                <label className="mr-5 font-semibold" htmlFor="about">Loại hỗ trợ</label>
                            </div>
                            <select className={`border rounded-lg p-2 focus:border-[#F73334] focus:border-2 bg-slate-100 outline-none 
                                ${errors.requestType ? 'border-[#F73334]' : ''}`}
                                defaultValue=""
                                name="requestType"
                                {...register("requestType")}>

                                <option value="1">Cấp cứu</option>
                                <option value="2">Bão lũ</option>
                                <option value="3">Hàng hải</option>
                                <option value="4">Động đất</option>
                                <option value="5">Song suoi</option>
                                <option value="6">Khác</option>

                            </select>
                            {errors.requestType && <div className="flex">
                                <p className="text-red">{errors.requestType.message}</p>
                            </div>}
                        </div>
                        <div className="flex lg:flex-row flex-col my-5 flex-wrap">
                            <div className="flex w-44 flex-wrap">
                                <label className="mr-5 font-semibold" htmlFor="about">Nội dung cần hỗ trợ</label>
                            </div>

                            <textarea className="outline-none p-2 border focus:border-[#F73334] focus:border-2 rounded-xl"
                                id="about"
                                name="about"
                                rows={4}
                                cols={60}
                                defaultValue="Tôi cần hỗ trợ khẩn cấp"
                                {...register("content")}
                            />
                            {errors.content && <div className="flex">
                                <p className="text-red-600 font-normal ml-1">{errors.content.message}</p>
                            </div>}
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <button className="bg-[#F73334] text-white p-3 px-5 font-semibold text-lg rounded-2xl shadow-md hover:bg-red-600" type="submit">
                            Xác nhận
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default FormRequest
