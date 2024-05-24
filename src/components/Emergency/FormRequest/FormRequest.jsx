import { useContext, useEffect, useState } from "react"
import { faArrowRight, faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from 'react-i18next';

import "./FormRequest.css"
import emergencyRequestSchema from "../../../validations/emergencyRequestSchema";
import RequestMap from "../RequestMap/RequestMap";
import { EmergencyMapContainerStyle } from "../../../constants/config";
import { UserMarkerPlaceContext } from "../../../Context/UserMarkerPlaceContext/UserMarkerPlaceContext";
import LocationSearchInput from "../LocationSearchInput/LocationSearchInput";
import RequestService from "../../../services/RequestService";
import Loading from "../../Loading/Loading";
import { UserContext } from "../../../Context/UserContext/UserContext";
import FileUpload from "../../FileUpload/FileUpload";

const schema = emergencyRequestSchema;

const FormRequest = ({ isEmergency }) => {
    const { t } = useTranslation();
    const { sendEmergencyRequest, receiveResponseFromRescuer } = useContext(UserContext);

    const { requestLocation } = useContext(UserMarkerPlaceContext);

    const { getRequestType, createRequest } = RequestService();

    const [response, setResponse] = useState(null);

    const [requestType, setRequestType] = useState([]);
    const [avatarResponses, setAvatarResponses] = useState([]);

    const { handleSubmit,
        register,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
    });

    const handleProcessSocket = (requestData) => {
        sendEmergencyRequest(requestData);
    }

    const formSubmit = async (data) => {
        const { content, requestType } = data;
        handleProcessSocket({ content, requestType, ...requestLocation });
        await createRequest({ content, isEmergency, avatarResponses, requestType, ...requestLocation })
    }

    useEffect(() => {
        const fetchRequestType = async () => {
            const response = await getRequestType();
            setRequestType(response);
        }

        fetchRequestType();
    }, [])

    useEffect(() => {
        receiveResponseFromRescuer((data) => {
            console.log('Response from rescuer:', data);
            setResponse(data);
        });
    }, []);

    return (
        <>
            {requestType && requestType?.length > 0 ? (
                <div className='bg-white items-center justify-center rounded-lg shadow-lg px-6 pb-6 min-w-96 w-full'>
                    <form className="flex flex-col rounded-xl" onSubmit={handleSubmit(formSubmit)}>
                        <div className="flex lg:flex-row flex-col justify-start lg:items-center items-start mb-2">
                            <label className="mr-2 min-w-14 font-semibold" htmlFor="address">{t("Nhập địa chỉ của bạn")}</label>
                            <div className='flex border rounded-xl px-2 mx-2 justify-between items-center shadow-md' >
                                <FontAwesomeIcon icon={faLocationDot} color="red" />
                                <LocationSearchInput />
                                <button className="flex justify-center items-center bg-red-500 w-8 h-8 rounded-full"
                                    type="button"
                                >
                                    <FontAwesomeIcon icon={faArrowRight} color="white" size="sm" />
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col mt-2">
                            <RequestMap mapContainerStyle={EmergencyMapContainerStyle} />
                            <div className="flex flex-col justify-between">
                                <div className="flex my-2 flex-wrap">
                                    <div className="flex w-44 flex-wrap">
                                        <label className="mr-5 font-semibold" htmlFor="about">{t("Loại hỗ trợ")}</label>
                                    </div>
                                    <select className={`border rounded-lg p-2 focus:border-[#F73334] focus:border-2 bg-slate-100 outline-none 
                                ${errors.requestType ? 'border-[#F73334]' : ''}`}
                                        defaultValue={requestType[0]?.id}
                                        name="requestType"
                                        {...register("requestType")}>

                                        {requestType.map((type) => (
                                            <option key={type.id} value={type.id}>{type.name}</option>
                                        ))}
                                    </select>
                                    {errors.requestType && <div className="flex">
                                        <p className="text-red">{errors.requestType.message}</p>
                                    </div>}
                                </div>
                                {!isEmergency && (
                                    <div className="flex flex-1 lg:flex-row flex-col flex-wrap">
                                        <label className="mr-5 font-semibold" htmlFor="about">{t("Hình ảnh")}</label>
                                        <FileUpload avatarResponses={avatarResponses} setAvatarResponses={setAvatarResponses} />
                                    </div>
                                )}
                                <div className="flex flex-1 lg:flex-row flex-col my-2 flex-wrap">
                                    <div className="flex w-60 flex-wrap">
                                        <label className="mr-5 font-semibold" htmlFor="about">{t("Nội dung yêu cầu hỗ trợ")}</label>
                                    </div>

                                    <textarea className="outline-none p-2 border focus:border-[#F73334] focus:border-2 rounded-xl w-full"
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
                                    {t("Xác nhận")}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            ) : (
                <Loading />
            )}
        </>
    )
}

export default FormRequest
