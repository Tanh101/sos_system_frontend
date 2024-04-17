import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import Logo from "../../components/Logo/Logo"
import AuthService from "../../services/AuthService";
import { formatDate } from "../../utilities/formatDate";
import signupSchema from "../../validations/signupSchema";
import { SPACE_CHARACTER } from "../../constants/config";

const schema = signupSchema;

const Signup = () => {
    const { signup } = AuthService();

    const [date, setDate] = useState(formatDate(new Date()));

    const {
        handleSubmit,
        register,
        control,
        setValue,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
    });

    const formSubmit = async (data) => {
        const { email, name, password, repeatPassword, phoneNumber, dob, address } = data;
        signup(email, name, password, repeatPassword, formatDate(dob), phoneNumber, address);
    }

    const handleDateChange = (date) => {
        setValue("dob", formatDate(date), {
            shouldDirty: true
        });
        setDate(formatDate(date));
    };

    return (
        <div className="flex h-screen justify-center items-center bg-slate-100">
            <div className="flex flex-col shadow-xl p-10 px-20 rounded-lg bg-white w-auto">
                <Logo />
                <form
                    className="form flex flex-col mt-2 w-full"
                    onSubmit={handleSubmit(formSubmit)}
                >
                    <p className="text-[#F73334] text-4xl mb-10 font-semibold">
                        Registration
                    </p>
                    <div className="flex">
                        <div className="flex flex-col justify-center">
                            <label className="font-medium text-base mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="px-4 py-2 w-64 shadow-sm rounded-2xl border-2 focus:outline-none focus:border-[#F73334] bg-white"
                                type="email"
                                placeholder="Enter your email"
                                id="email"
                                name="email"
                                {...register("email")}
                            />
                            {errors?.email && (
                                <div className="flex flex-wrap max-w-52">
                                    <p className="ml-2 mt-1 px-2 text-sm text-red-600" htmlFor="email">{errors.email?.message}</p>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col ml-10">
                            <label className="font-medium text-base mb-2" htmlFor="name">
                                Name
                            </label>
                            <input
                                className="px-4 py-2 w-64 shadow-sm rounded-2xl border-2 focus:outline-none focus:border-[#F73334] bg-white"
                                type="text"
                                placeholder="Enter your name"
                                id="name"
                                name="name"
                                {...register("name")}
                            />
                            {errors?.name && (
                                <div className="flex flex-wrap max-w-52">
                                    <label className="ml-2 mt-1 px-2  text-sm text-red-600" htmlFor="email">{errors.name?.message}</label>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex mt-2">

                        <div className="flex flex-col">
                            <label
                                className="font-medium text-base mt-3 mb-2"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <input
                                className="px-4 py-2 w-64 shadow-sm rounded-2xl border-2 focus:outline-none focus:border-[#F73334] bg-white"
                                type="password"
                                placeholder="Enter password"
                                id="password"
                                name="password"
                                {...register("password")}
                            />
                            {errors?.password && (
                                <div className="flex flex-wrap max-w-52">
                                    <label className="ml-2 mt-1 px-2  text-sm text-red-600" htmlFor="email">{errors?.password?.message}</label>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col ml-10">
                            <label
                                className="font-medium text-base mt-3 mb-2"
                                htmlFor="repeatPassword"
                            >
                                Repeat password
                            </label>
                            <input
                                className="px-4 py-2 w-64 shadow-sm rounded-2xl border-2 focus:outline-none focus:border-[#F73334] bg-white"
                                type="password"
                                placeholder="Enter repeat password"
                                id="repeatPassword"
                                name="repeatPassword"
                                {...register("repeatPassword")}
                            />
                            {errors?.repeatPassword && (
                                <div className="flex flex-wrap max-w-52">
                                    <label className="ml-2 mt-1 px-2 text-sm text-red-600" htmlFor="email">{errors.repeatPassword?.message}</label>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex mt-2">
                        <div className="flex flex-col">
                            <label className="font-medium text-base mt-3 mb-2" htmlFor="dob">
                                Date of birth
                            </label>
                            <div className="flex items-center px-3 w-64 z-50 py-2 rounded-2xl border-2">
                                <Controller
                                    name="dob"
                                    control={control}
                                    defaultValue={date}
                                    render={() => (
                                        <DatePicker className='outline-none w-full' name="dob" selected={date} onChange={handleDateChange}
                                        />
                                    )}
                                />
                                <FontAwesomeIcon className="mr-2" icon={faCalendar} color={'#387DE4'} size='lg' />
                            </div>
                            {errors?.dob && (
                                <div className="flex flex-wrap max-w-52">
                                    <label className="ml-2 mt-1 px-2  text-sm text-red-600" htmlFor="email">{errors.dob?.message}</label>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col ml-10">
                            <label
                                className="font-medium text-base mt-3 mb-2"
                                htmlFor="phoneNumber"
                            >
                                Phone number
                            </label>
                            <input
                                className="px-4 py-2 w-64 shadow-sm rounded-2xl border-2 focus:outline-none focus:border-[#F73334] bg-white"
                                type="text"
                                placeholder="Enter your phone number"
                                id="phoneNumber"
                                name="phoneNumber"
                                {...register("phoneNumber")}
                            />
                            {errors?.phoneNumber && (
                                <div className="flex flex-wrap max-w-52">
                                    <label className="ml-2 mt-1 px-2  text-sm text-red-600" htmlFor="email">{errors.phoneNumber?.message}</label>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label
                            className="font-medium text-base mt-4 mb-2"
                            htmlFor="address"
                        >
                            Address
                        </label>
                        <input
                            className="px-4 py-2 shadow-sm rounded-2xl border-2 focus:outline-none focus:border-[#F73334] bg-white"
                            type="text"
                            placeholder="Enter your address"
                            id="address"
                            name="address"
                            {...register("address")}
                        />
                        {errors?.address && (
                            <div className="flex flex-wrap max-w-52">
                                <label className="ml-2 mt-1 px-2  text-sm text-red-600" htmlFor="email">{errors.address?.message}</label>
                            </div>
                        )}
                    </div>
                    <div className="flex justify-center mt-10">
                        <button type="submit" className="bg-[#F73334] rounded-3xl px-10 py-3 font-bold text-white">
                            SIGN UP
                        </button>
                    </div>
                </form>
                <div className="flex justify-center items-center text-sm mt-6">
                    <p>Already have an acount?{SPACE_CHARACTER}</p>
                    <Link to="/login">
                        <p className="font-bold text-blue-600"> Login</p>
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default Signup
