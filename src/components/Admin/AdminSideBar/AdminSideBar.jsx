import { useContext, useState } from 'react';
import { faLocationDot, faBell, faLifeRing, faMessage, faTowerBroadcast, faArrowLeft, faArrowRight, faBars, faHome, faRobot } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { UserContext } from '../../../Context/UserContext/UserContext';
import SidebarItem from '../../User/SidebarItem/SidebarItem';
import { faUser } from '@fortawesome/free-regular-svg-icons';

const AdminSideBar = () => {
    const { activeItem, setActiveItem } = useContext(UserContext);
    const [isShow, setIsShow] = useState(true);

    const handleShowSidebar = () => {
        setIsShow(!isShow);
    }

    const handleItemClick = (item) => {
        setActiveItem(item);
    };

    return (
        <div className={`flex flex-col items-start h-screen duration-150 md:px-1 min-w-20 bg-white ${isShow ? 'w-52' : 'w-16'} border-r`}>
            <div className={`flex ${isShow ? 'justify-start' : 'justify-start'} mx-1 items-center h-10 w-full mt-2 transition ease-in-out delay-100 border-b`}>
                <div className="relative justify-start text-start px-4">
                    <FontAwesomeIcon className="cursor-pointer" icon={faBars} style={{ color: "#000" }} size="xl" onClick={handleShowSidebar} />
                </div>
                {isShow && <p className='mx-4'>Menu</p>}
            </div>
            <SidebarItem isShow={isShow} link="/dashboard" icon={faHome} title="Dashboard" active={activeItem === 'dashboard'} onClick={() => handleItemClick('dashboard')} />
            <SidebarItem isShow={isShow} link="/admin" icon={faUser} title="Account" active={activeItem === 'admin'} onClick={() => handleItemClick('admin')} />
            <SidebarItem isShow={isShow} link="/chatbot" icon={faRobot} title="Chatbot" active={activeItem === 'chatbot'} onClick={() => handleItemClick('chatbot')} />
        </div >
    )
}

export default AdminSideBar;
