
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Logo from "../../components/Logo/Logo"
import AuthService from "../../services/AuthService";
import { Link } from "react-router-dom";
import loginSchema from "../../validations/loginShema";
import { SPACE_CHARACTER } from "../../constants/config";

const schema = loginSchema

const Login = () => {

    const { login } = AuthService();

    const { handleSubmit,
        register,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
    });

    const formSubmit = async (data) => {
        const { email, password } = data;
        login(email, password);
    }

    return (
        <div>
            <div className="flex justify-center items-center h-screen bg-blue-50">
                <div className="flex flex-col shadow-md p-10 px-20 rounded-xl bg-white lg:w-[600px] ">
                    <Logo />
                    <form
                        className="form flex flex-col mt-2"
                        onSubmit={handleSubmit(formSubmit)}
                    >
                        <p className="text-[#F73334] text-4xl mb-12 font-semibold">
                            Welcome back
                        </p>
                        {errors?.email ? (
                            <div className="flex flex-col">
                                <label className="font-medium text-base mb-2" htmlFor="username">
                                    Email
                                </label>
                                <input
                                    className="px-4 py-2 shadow-sm rounded-2xl border-2 focus:outline-none border-[#F73334] bg-white"
                                    type="text"
                                    placeholder="Enter your email"
                                    id="email"
                                    name="email"
                                    {...register("email")}
                                />
                                <label className="ml-2 mt-2 px-2 text-sm text-red-600" htmlFor="email">{errors.email?.message}</label>
                            </div>
                        ) : (
                            <div className="flex flex-col">
                                <label className="font-medium text-base mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    className="px-4 py-2 shadow-sm rounded-2xl border-2 focus:outline-none focus:border-[#F73334] bg-white"
                                    type="text"
                                    placeholder="Enter your email"
                                    id="email"
                                    name="email"
                                    {...register("email")}
                                />
                            </div>
                        )}
                        {errors?.password ? (
                            <div className="flex flex-col">
                                <label
                                    className="font-medium text-base mt-8 mb-2"
                                    htmlFor="password"
                                >
                                    Password
                                </label>
                                <input
                                    className="px-4 py-2 shadow-sm rounded-2xl border-2 focus:outline-none border-[#F73334] bg-white"
                                    type="password"
                                    placeholder="Enter your password"
                                    id="password"
                                    name="password"
                                    {...register("password")}
                                />
                                {errors?.password && (
                                    <label className="ml-2 mt-2 px-2 text-sm text-red-600" htmlFor="email">{errors.password?.message}</label>
                                )}
                            </div>
                        ) : (
                            <div className="flex flex-col">
                                <label
                                    className="font-medium text-base mt-8 mb-2"
                                    htmlFor="password"
                                >
                                    Password
                                </label>
                                <input
                                    className="px-4 py-2 shadow-sm rounded-2xl border-2 focus:outline-none focus:border-[#F73334] bg-white"
                                    type="password"
                                    placeholder="Enter your password"
                                    id="password"
                                    name="password"
                                    {...register("password")}
                                />
                            </div>
                        )}
                        <div className="flex justify-center mt-10 text-center">
                            <button type="submit" className="bg-[#F73334] rounded-3xl px-10 py-3 font-bold text-white">
                                SIGN IN
                            </button>
                        </div>
                    </form>
                    <div className="flex justify-center items-center text-sm mt-6">
                        <p>{`Don't have an acoount?`}{SPACE_CHARACTER}</p>
                        <Link to="/register">
                            <p className="font-bold text-blue-600"> Sign up</p>
                        </Link>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default Login
