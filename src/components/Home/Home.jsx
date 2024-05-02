import { useContext, useEffect } from "react"

import Ring from "../Ring/Ring"
import { UserContext } from "../../Context/UserContext/UserContext";

const Home = () => {

    const { setActiveItem } = useContext(UserContext);

    useEffect(() => {
        setActiveItem('home');
    }, []);

    return (
        <div className="flex flex-1 w-full h-screen bg-white justify-center items-center">
            <Ring />
        </div>
    )
}

export default Home
