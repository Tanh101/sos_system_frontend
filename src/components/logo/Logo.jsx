import lifebuoy from "../../assets/imgs/lifebuoy.png"
import '../../index.css'

const Logo = () => {
    return (
        <div className="flex justify-end">
            <p className="text-2xl">S</p>
            <div className="">
                <img src={lifebuoy} height={10} width={10} alt="" />
            </div>
            <p>S</p>
        </div>
    )
}

export default Logo
