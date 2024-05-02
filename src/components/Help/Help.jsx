import { useContext, useEffect } from "react";

import { UserContext } from "../../Context/UserContext/UserContext";

const Help = () => {
    const { setActiveItem } = useContext(UserContext);

    useEffect(() => {
        setActiveItem('help');
    }, []);

    return (
        <div>Help</div>
    )
}

export default Help
