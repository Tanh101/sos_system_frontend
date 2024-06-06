import { useContext, useState } from 'react';
import { faLocationDot, faBell, faLifeRing, faMessage, faTowerBroadcast, faArrowLeft, faArrowRight, faBars } from "@fortawesome/free-solid-svg-icons"

import SidebarItem from "../SidebarItem/SidebarItem"
import { UserContext } from '../../../Context/UserContext/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { USER_ROLE } from '../../../constants/config';

const Sidebar = () => {
    const { user, activeItem, setActiveItem } = useContext(UserContext);
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
            <SidebarItem isShow={isShow} link="/help" icon={faLifeRing} title="Trợ giúp" active={activeItem === 'help'} onClick={() => handleItemClick('help')} />
            <SidebarItem isShow={isShow} link="/location" icon={faLocationDot} title="Định vị" active={activeItem === 'location'} onClick={() => handleItemClick('location')} />
            <SidebarItem isShow={isShow} link="/" icon={faTowerBroadcast} title="Khẩn cấp" active={activeItem === 'home'} onClick={() => handleItemClick('home')} />
            <SidebarItem isShow={isShow} link="/messages" icon={faMessage} title="Tin nhắn" active={activeItem === 'messages'} onClick={() => handleItemClick('messages')} />
            {user.role === USER_ROLE.RESCUER &&
                <SidebarItem isShow={isShow} link="/rescue" icon={faBell} title="Cứu hộ" active={activeItem === 'rescue'} onClick={() => handleItemClick('rescue')} />
            }
        </div >
    )
}

export default Sidebar;
