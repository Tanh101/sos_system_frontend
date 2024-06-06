import { useContext, useEffect, useState } from "react";
import { faArrowRight, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from 'react-i18next';
import { Select } from 'antd';
import { useDispatch } from "react-redux";

import "./FormRequest.css";
import normalRequestSchema from "../../../validations/normalRequestSchema";
import RequestMap from "../RequestMap/RequestMap";
import { EmergencyMapContainerStyle } from "../../../constants/config";
import { UserMarkerPlaceContext } from "../../../Context/UserMarkerPlaceContext/UserMarkerPlaceContext";
import LocationSearchInput from "../LocationSearchInput/LocationSearchInput";
import RequestService from "../../../services/RequestService";
import Loading from "../../Loading/Loading";
import FileUpload from "../../FileUpload/FileUpload";
import { addEmergencyRequest } from "../../../redux/action/emergencyAction";
import { UserContext } from "../../../Context/UserContext/UserContext";

const { Option } = Select;

const schema = normalRequestSchema;

const FormRequest = ({ isEmergency }) => {
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const { requestLocation } = useContext(UserMarkerPlaceContext);

    const { location, startSharingLocation } = useContext(UserContext);

    const { getRequestType, createRequest } = RequestService();

    const [requestType, setRequestType] = useState([]);
    const [avatarResponses, setAvatarResponses] = useState([]);

    const { handleSubmit, register, control, formState: { errors } } = useForm({
        resolver: isEmergency ? undefined : yupResolver(schema),
    });

    const formSubmit = async (data) => {
        const { content, requestType } = data;
        if (isEmergency) {
            const request = await createRequest({ isEmergency, ...requestLocation });
            if (request) {
                dispatch(addEmergencyRequest(request));
                startSharingLocation(request.id, request.latitude, request.longitude);
            }

        } else {
            await createRequest({ content, isEmergency, avatarResponses, requestType, ...requestLocation });
        }
    }

    useEffect(() => {
        const fetchRequestType = async () => {
            const response = await getRequestType();
            setRequestType(response);
        }

        fetchRequestType();
    }, []);


    return (
        <>
            {requestType && requestType.length > 0 && location.lat && location.lng ? (
                <div className='bg-white items-center justify-center rounded-lg shadow-lg px-6 pb-6 min-w-96 w-full'>
                    <form className="flex flex-col rounded-xl" onSubmit={handleSubmit(formSubmit)}>
                        <div className="flex lg:flex-row flex-col justify-start lg:items-center items-start m-2 my-5">
                            <label className="mr-2 min-w-14 font-semibold" htmlFor="address">{t("Nhập địa chỉ của bạn")}</label>
                            <div className='flex border rounded-xl px-2 mx-2 justify-between items-center shadow-md'>
                                <FontAwesomeIcon icon={faLocationDot} color="red" />
                                <LocationSearchInput />
                                <button className="flex justify-center items-center bg-red-500 w-8 h-8 rounded-full" type="button">
                                    <FontAwesomeIcon icon={faArrowRight} color="white" size="sm" />
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col mt-2">
                            <RequestMap mapContainerStyle={EmergencyMapContainerStyle} />
                            <div className="flex flex-col justify-between">
                                {!isEmergency && (
                                    <>
                                        <div className="flex my-2 flex-wrap">
                                            <div className="flex w-44 flex-wrap">
                                                <label className="mr-5 font-semibold" htmlFor="requestType">{t("Loại hỗ trợ")}</label>
                                            </div>
                                            <div className="flex">
                                                <Controller
                                                    name="requestType"
                                                    control={control}
                                                    defaultValue={requestType[0]?.id}
                                                    render={({ field }) => (
                                                        <Select
                                                            {...field}
                                                            className={`border rounded-lg focus:border-[#F73334] outline-none
                                                            ${errors.requestType ? 'border-[#F73334]' : ''}`}
                                                            style={{ width: '100%', minWidth: 250, height: 50 }}
                                                            placeholder={t("Chọn loại yêu cầu")}
                                                        >
                                                            {requestType.map((type) => (
                                                                <Option key={type.id} value={type.id}>
                                                                    <div className="flex items-center">
                                                                        <img src={type.iconUrl} alt={type.name} className="w-6 h-6 mr-2" />
                                                                        <span className="font-semibold text-red-600 text-sm">{type.name}</span>
                                                                    </div>
                                                                </Option>
                                                            ))}
                                                        </Select>
                                                    )}
                                                />
                                            </div>
                                            {errors.requestType && (
                                                <div className="flex">
                                                    <p className="text-red">{errors.requestType.message}</p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex flex-1 lg:flex-row flex-col flex-wrap">
                                            <label className="mr-5 font-semibold" htmlFor="about">{t("Hình ảnh")}</label>
                                            <FileUpload avatarResponses={avatarResponses} setAvatarResponses={setAvatarResponses} />
                                        </div>
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
                                            {errors.content && (
                                                <div className="flex">
                                                    <p className="text-red-600 font-normal ml-1">{errors.content.message}</p>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="flex justify-center items-center">
                                <button className="bg-[#F73334] text-white p-3 px-5 font-semibold text-lg mt-4 rounded-2xl shadow-md hover:bg-red-600" type="submit">
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

export default FormRequest;
