import { Link } from "react-router-dom"
import lifebuoy from "../../assets/imgs/lifebuoy.png"
import '../../index.css'

const Logo = () => {
    return (
        <div className="flex justify-start items-center text-red-600">
            <Link to="/" className="flex justify-start items-center text-red-600">
                <p className="text-3xl font-bold">S</p>
                <div className="flex justify-center h-full">
                    <img src={lifebuoy} height={50} width={50} alt="" />
                </div>
                <p className="text-3xl font-bold">S</p>
            </Link>
        </div>
    )
}

export default Logo
