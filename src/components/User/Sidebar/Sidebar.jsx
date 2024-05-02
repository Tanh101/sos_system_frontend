import { useContext } from 'react';
import { faLocationDot, faBell, faLifeRing, faMessage, faTowerBroadcast } from "@fortawesome/free-solid-svg-icons"

import SidebarItem from "../SidebarItem/SidebarItem"
import { UserContext } from '../../../Context/UserContext/UserContext';

const Sidebar = () => {
    const { activeItem, setActiveItem } = useContext(UserContext);
    
    const handleItemClick = (item) => {
        setActiveItem(item);
    };

    return (
        <div className='flex flex-col items-center h-screen lg:px-3 duration-150 md:px-1 min-w-20 bg-white'>
            <SidebarItem link="/help" icon={faLifeRing} title="Trợ giúp" active={activeItem === 'help'} onClick={() => handleItemClick('help')} />
            <SidebarItem link="/location" icon={faLocationDot} title="Định vị" active={activeItem === 'location'} onClick={() => handleItemClick('location')} />
            <SidebarItem link="/" icon={faTowerBroadcast} title="Khẩn cấp" active={activeItem === 'home'} onClick={() => handleItemClick('home')} />
            <SidebarItem link="/messages" icon={faMessage} title="Tin nhắn" active={activeItem === 'messages'} onClick={() => handleItemClick('messages')} />
            <SidebarItem link="/notifications" icon={faBell} title="Thông báo" active={activeItem === 'notifications'} onClick={() => handleItemClick('notifications')} />
        </div >
    )
}

export default Sidebar;
