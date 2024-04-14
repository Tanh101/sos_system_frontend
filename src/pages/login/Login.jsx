
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Logo from "../../components/logo/Logo"
import AuthService from "../../services/AuthService";

const schema = yup.object({
    username: yup.string().required().max(50).min(8),
    password: yup.string().required().min(8).max(20),
})

const Login = () => {

    const { login } = AuthService();

    const { handleSubmit,
        register,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
    });

    const formSubmit = async (data) => {
        const { username, password } = data;
        login(username, password);
    }

    return (
        <div>
            <div className="flex justify-center items-center h-screen bg-blue-50">
                <div className="flex flex-col shadow-md m-10 p-20 rounded-xl bg-white">
                    <Logo />
                    <form
                        className="form flex flex-col mt-2"
                        onSubmit={handleSubmit(formSubmit)}
                    >
                        <p className="text-[#F73334] text-4xl mb-12 font-semibold">
                            Welcome back
                        </p>
                        {errors?.username ? (
                            <div className="flex flex-col">
                                <label className="font-medium text-lg mb-2" htmlFor="username">
                                    Username
                                </label>
                                <input
                                    className="px-4 w-96 py-3 shadow-sm rounded-3xl border-2 focus:outline-none border-[#F73334] bg-white"
                                    type="text"
                                    placeholder="Enter your username"
                                    id="username"
                                    name="username"
                                    {...register("username")}
                                />
                                <label className="ml-2 mt-2 px-2 text-sm text-red-600" htmlFor="email">{errors.username?.message}</label>
                            </div>
                        ) : (
                            <div className="flex flex-col">
                                <label className="font-medium text-lg mb-2" htmlFor="username">
                                    Username
                                </label>
                                <input
                                    className="px-4 w-96 py-3 shadow-sm rounded-3xl border-2 focus:outline-none focus:border-[#F73334] bg-white"
                                    type="text"
                                    placeholder="Enter your username"
                                    id="username"
                                    name="username"
                                    {...register("username")}
                                />
                            </div>
                        )}
                        {errors?.password ? (
                            <div className="flex flex-col">
                                <label
                                    className="font-medium text-lg mt-12 mb-2"
                                    htmlFor="password"
                                >
                                    Password
                                </label>
                                <input
                                    className="px-4 py-3 shadow-sm rounded-3xl border-2 focus:outline-none border-[#F73334] bg-white"
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
                                    className="font-medium text-lg mt-12 mb-2"
                                    htmlFor="password"
                                >
                                    Password
                                </label>
                                <input
                                    className="px-4 py-3 shadow-sm rounded-3xl border-2 focus:outline-none focus:border-[#F73334] bg-white"
                                    type="password"
                                    placeholder="Enter your password"
                                    id="password"
                                    name="password"
                                    {...register("password")}
                                />
                            </div>
                        )}
                        <div className="flex justify-center mt-16 text-center">
                            <button className="bg-[#F73334] rounded-3xl px-6 py-3 font-bold text-white">
                                SIGN IN
                            </button>
                        </div>
                    </form>
                </div>
            </div >
        </div >
    )
}

export default Login
