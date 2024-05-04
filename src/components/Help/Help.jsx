import { useContext, useEffect } from "react";

import { UserContext } from "../../Context/UserContext/UserContext";

const Help = () => {
    const { setActiveItem } = useContext(UserContext);

    useEffect(() => {
        setActiveItem('help');
    }, []);

    return (
        <div className="flex flex-1 w-full h-screen bg-white justify-center items-center">
            Help
        </div>
    )
}

export default Help
