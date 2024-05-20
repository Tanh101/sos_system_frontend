import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faCamera, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from 'react-i18next';

import avatar from "../../../assets/imgs/avatar.png";
import { UserContext } from "../../../Context/UserContext/UserContext";
import { yupResolver } from "@hookform/resolvers/yup";
import signupSchema from "../../../validations/signupSchema";
import { formatDate } from "../../../utilities/formatDate";

const schema = signupSchema;

const Overview = () => {
    const { t } = useTranslation();

    const { user } = useContext(UserContext);

    const [avatarResponse, setAvatarResponse] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [date, setDate] = useState((user.dob));

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
            setIsEditing(true);
    };

    const handleSaveClick = (data) => {
        // Handle form submission and data saving here
        console.log(data);
        setIsEditing(false);
    };

    const handleDateChange = (date) => {
        setValue("dob", formatDate(date), {
            shouldDirty: true
        });
        setDate(formatDate(date));
    };

    const handleAvatarChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const formData = new FormData();
                formData.append('avatar', file);
                // const response = await uploadAvatar(formData);
                const response = "http://sfaf213r";
                setAvatarResponse(response);
            } catch (error) {
                console.error('Failed to upload avatar', error);
            }
        }
    };

    return (
        <form className="flex justify-between items-start mt-5 w-full" onSubmit={handleSubmit(handleSaveClick)}>
            <div className="relative">
                <img className="min-w-40 w-40 rounded-full object-cover" src={avatar} alt="User Avatar" />
                <input
                    type="file"
                    className="hidden"
                    id="avatarUpload"
                    onChange={handleAvatarChange}
                />
                <label
                    htmlFor="avatarUpload"
                    className="absolute bottom-0 right-2 w-14 h-14 bg-gray-200 
                    rounded-full flex items-center justify-center border border-white cursor-pointer"
                >
                    <FontAwesomeIcon icon={faCamera} />
                </label>
            </div>
            <div className="flex flex-col flex-1 justify-between w-full mx-10">
                <div className="flex justify-start items-center mb-4">
                    <label className="mr-5 w-32 font-medium text-base" htmlFor="name">Name</label>
                    {isEditing ? (
                        <input
                            className="px-3 py-1 border outline-none focus:border-red-600 rounded-lg flex-1"
                            type="text"
                            name="name"
                            value={formatDate(user.dob)}
                            {...register("name")}
                        />
                    ) : (
                        <p className="flex-1 px-3 py-1">{user.name}</p>
                    )}
                </div>
                <div className="flex justify-start items-center mb-4">
                    <label className="mr-5 w-32 font-medium text-base" htmlFor="email">Email</label>
                    {isEditing ? (
                        <input
                            readOnly
                            className="px-3 py-1 border outline-none focus:border-red-600 rounded-lg flex-1"
                            type="text"
                            name="email"
                            value={user.email}
                        />
                    ) : (
                        <p className="flex-1 px-3 py-1">{user.email}</p>
                    )}
                </div>
                <div className="flex justify-start items-center mb-4">
                    <label className="mr-5 w-32 font-medium text-base" htmlFor="dob">Date of Birth</label>
                    {isEditing ? (
                        <div className="flex items-center px-3 w-64 z-50 py-2 rounded-2xl border-2">
                            <Controller
                                name="dob"
                                control={control}
                                defaultValue={formatDate(user.dob)}
                                render={() => (
                                    <DatePicker className='outline-none w-full' name="dob" selected={date} onChange={handleDateChange}
                                    />
                                )}
                            />
                            <FontAwesomeIcon className="mr-2" icon={faCalendar} color={'#387DE4'} size='lg' />
                        </div>
                    ) : (
                        <p className="px-3 py-1">{formatDate(user.dob)}</p>
                    )}
                </div>
                <div className="flex justify-start items-center mb-4">
                    <label className="mr-5 w-32 font-medium text-base" htmlFor="gender">Gender</label>
                    {isEditing ? (
                        <input
                            className="px-3 py-1 border outline-none focus:border-red-600 rounded-lg flex-1"
                            type="text"
                            name="gender"
                            defaultValue={user.gender}
                            {...register("gender")}
                        />
                    ) : (
                        <p className="px-3 py-1">{user.gender ? user.gender : 'None'}</p>
                    )}
                </div>
                <div className="flex justify-start items-center mb-4">
                    <label className="mr-5 w-32 font-medium text-base" htmlFor="address">Address</label>
                    {isEditing ? (
                        <input
                            className="px-3 py-1 border outline-none focus:border-red-600 rounded-lg flex-1"
                            type="text"
                            name="address"
                            defaultValue={user.address}
                            {...register("address")}
                        />
                    ) : (
                        <p className="px-3 py-1">{user.address}</p>
                    )}
                </div>
                <div className="flex justify-start items-center mb-4">
                    <label className="mr-5 w-32 font-medium text-base" htmlFor="phone">Phone</label>
                    {isEditing ? (
                        <input
                            className="px-3 py-1 border outline-none focus:border-red-600 rounded-lg flex-1"
                            type="text"
                            name="phone"
                            defaultValue={user.phone}
                            {...register("phone")}
                        />
                    ) : (
                        <p className="px-3 py-1">{user.phone}</p>
                    )}
                </div>
            </div>
            <div className="flex flex-col">
                <button type="button" onClick={handleEditClick} className="flex justify-center items-center hover:bg-slate-200 border rounded-xl px-2 py-1">
                    <p>Edit</p>
                    <FontAwesomeIcon className="mx-2" icon={faEdit} color="red" />
                </button>
            </div>
        </form>
    );
};

export default Overview;
