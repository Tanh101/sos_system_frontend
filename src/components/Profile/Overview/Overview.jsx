import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faCamera, faCancel, faEdit, faSave } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from 'react-i18next';
import { Image } from "antd";

import avatar from "../../../assets/imgs/avatar.png";
import { UserContext } from "../../../Context/UserContext/UserContext";
import { yupResolver } from "@hookform/resolvers/yup";
import profileSchema from "../../../validations/profileSchema";
import { formatDate } from "../../../utilities/formatDate";
import UploadService from "../../../services/UploadImgsService";
import Loading from "../../Loading/Loading";

const schema = profileSchema;

const Overview = () => {
    const { t } = useTranslation();

    const { upload } = UploadService()

    const { user } = useContext(UserContext);

    const [avatarResponse, setAvatarResponse] = useState(avatar);
    const [isEditing, setIsEditing] = useState(false);
    const [date, setDate] = useState(formatDate(user.dob));

    const {
        handleSubmit,
        register,
        control,
        setValue,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
    });

    const handleEditClick = () => {
        if (user)
            setIsEditing(!isEditing);
    };

    const formSubmit = async (data) => {
        const { email, name, password, repeatPassword, phoneNumber, dob, address } = data;
        // signup(email, name, password, repeatPassword, formatDate(dob), phoneNumber, address);
    }

    const handleDateChange = (date) => {
        setValue("dob", formatDate(date), {
            shouldDirty: true
        });
        setDate(formatDate(date));
    };

    const handleAvatarChange = async (e) => {
        const file = e.target.files[0];
        console.log(file);
        if (file) {
            try {
                const response = await upload(file);

                setAvatarResponse(response.data[0].url);
            }
            catch (error) {
                console.error('Failed to upload avatar', error);
            }
        }
    };

    return (
        <form className="flex flex-1 justify-center items-start mt-5 "
            onSubmit={handleSubmit(formSubmit)}>
            {user ? (
                <>
                    <div className="relative w-56 ml-20">
                        <Image className="min-w-40 h-40 w-40 object-cover rounded-full" src={avatarResponse} alt="User Avatar" />
                        {isEditing && (
                            <>
                                <input
                                    type="file"
                                    className="hidden"
                                    id="avatarUpload"
                                    onChange={handleAvatarChange}
                                    name="avatar"
                                />
                                <label
                                    htmlFor="avatarUpload"
                                    className="absolute bottom-0 right-16 w-14 h-14 bg-gray-200 
                            rounded-full flex items-center justify-center border border-white cursor-pointer"
                                >
                                    <FontAwesomeIcon icon={faCamera} />
                                </label>
                            </>
                        )}

                    </div>
                    <div className="flex flex-col flex-1 justify-between w-full ml-10">
                        <div className="flex justify-start items-center mb-4">
                            <label className="mr-5 w-56 font-medium text-base" htmlFor="name">{t("Tên")}</label>
                            {isEditing ? (
                                <input
                                    className="px-3 py-1 border outline-none focus:border-red-600 rounded-lg flex-1"
                                    type="text"
                                    name="name"
                                    value={user.name}
                                    {...register("name")}
                                />
                            ) : (
                                <p className="flex-1 w-64 px-3 py-1">{user.name}</p>
                            )}
                        </div>
                        <div className="flex justify-start items-center mb-4">
                            <label className="mr-5 w-56 font-medium text-base" htmlFor="email">Email</label>
                            {isEditing ? (
                                <input
                                    readOnly
                                    className="px-3 py-1 border outline-none focus:border-red-600 rounded-lg flex-1"
                                    type="text"
                                    name="email"
                                    value={user.email}
                                />
                            ) : (
                                <p className="flex-1 w-40 px-3 py-1">{user.email}</p>
                            )}
                        </div>
                        <div className="flex justify-start items-center mb-4">
                            <label className="mr-5 w-56 font-medium text-base" htmlFor="dob">{t("Ngày sinh")}</label>
                            {isEditing ? (
                                <div className="flex items-center px-3 w-64 z-50 py-1 rounded-xl border">
                                    <Controller
                                        name="dob"
                                        control={control}
                                        defaultValue={date}
                                        render={() => (
                                            <DatePicker className='outline-none w-full' name="dob" selected={date} onChange={handleDateChange}
                                            />
                                        )}
                                    />
                                    <FontAwesomeIcon className="mr-2" icon={faCalendar} color={'red'} size='lg' />
                                </div>
                            ) : (
                                <p className="flex px-3 w-40 py-1">{user.dob ? formatDate(user.dob) : 'None'}</p>
                            )}
                        </div>
                        <div className="flex justify-start items-center mb-4">
                            <label className="mr-5 w-56 font-medium text-base" htmlFor="gender">{t("Giới tính")}</label>
                            {isEditing ? (
                                <select className="px-2 py-1 rounded-lg bg-slate-100 outline-none" name="gender" id="" defaultValue={user.gender ? user.gender : 'none'}
                                    {...register("gender")}>
                                    <option value="male">{t("Nam")}</option>
                                    <option value="female">{t("Nữ")}</option>
                                    <option value="">{t("None")}</option>
                                </select>
                            ) : (
                                <p className="px-3 py-1">{user.gender ? user.gender : 'None'}</p>
                            )}
                        </div>
                        <div className="flex justify-start items-center mb-4">
                            <label className="mr-5 w-56 font-medium text-base" htmlFor="address">{t("Địa chỉ")}</label>
                            {isEditing ? (
                                <input
                                    className="px-3 py-1 border outline-none focus:border-red-600 rounded-lg flex-1"
                                    type="text"
                                    name="address"
                                    defaultValue={user.address}
                                    {...register("address")}
                                />
                            ) : (
                                <p className="ml-24 px-3 py-1">{user.address}</p>
                            )}
                        </div>
                        <div className="flex justify-start items-center mb-4">
                            <label className="mr-5 w-56 font-medium text-base" htmlFor="phone">{t("Số điện thoại")}</label>
                            {isEditing ? (
                                <>
                                    <input
                                        className="px-3 py-1 border outline-none focus:border-red-600 rounded-lg flex-1"
                                        type="text"
                                        name="phoneNumber"
                                        defaultValue={user.phoneNumber}
                                        {...register("phoneNumber")}
                                    />
                                    {errors?.name && (
                                        <div className="flex flex-wrap max-w-52">
                                            <label className="ml-2 mt-1 px-2  text-sm text-red-600" htmlFor="email">{errors.phoneNumber?.message}</label>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <p className="px-3 py-1">{user.phoneNumber ? user.phoneNumber : 'None'}</p>
                            )}
                        </div>
                        <div className="flex justify-center">
                            {isEditing && (
                                <div className="flex m-10">
                                    <button type="submit" className="flex justify-center items-center hover:bg-blue-200 border rounded-xl px-2 py-1">
                                        <p>{t("Lưu")}</p>
                                        <FontAwesomeIcon className="mx-2" icon={faSave} color="red" />
                                    </button>
                                    <button type="button" className="flex mx-10 justify-center items-center hover:bg-red-200 border rounded-xl px-2 py-1"
                                        onClick={() => setIsEditing(false)}>
                                        <p>{t("Hủy")}</p>
                                        <FontAwesomeIcon className="mx-2" icon={faCancel} color="red" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        {!isEditing && (
                            <button type="button" onClick={handleEditClick} className="flex justify-center items-center hover:bg-slate-200 border rounded-xl px-2 py-1">
                                <p>{t("Sửa")}</p>
                                <FontAwesomeIcon className="mx-2" icon={faEdit} color="red" />
                            </button>
                        )}
                    </div>
                </>
            ) : (
                <Loading />
            )}
        </form>
    );
};

export default Overview;
