import { Link } from "react-router-dom"
import logo from "../../assets/imgs/resq_logo_gradient.png"
import '../../index.css'

const Logo = () => {
    return (
        <div className="flex justify-start items-center text-[#F73334]">
            <Link to="/" className="flex justify-start items-center text-[#F73334]">
                <div className="flex justify-center items-center h-full">
                    <div className="flex">
                        <img src={logo} height={60} width={60} alt="" />
                    </div>
                    <div className="flex flex-col ml-2">
                        <div className="flex justify-start w-full font-semibold text-2xl">
                            <p>RES</p>
                            <p className="text-[#F79433]">Q</p>
                        </div>
                        <div className="flex text-[12px] font-semibold text-[#F79433]">
                            SECURE YOUR LIFE
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Logo
