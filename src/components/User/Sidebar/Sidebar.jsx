import { useEffect, useState } from 'react';
import { faLocationDot, faBell, faLifeRing, faMessage, faTowerBroadcast } from "@fortawesome/free-solid-svg-icons"
import SidebarItem from "../SidebarItem/SidebarItem"
import AuthService from '../../../services/AuthService';

const Sidebar = () => {
    const {getUserProfile} = AuthService();

    const [activeItem, setActiveItem] = useState('home');

    const handleItemClick = (item) => {
        setActiveItem(item);
    };

    useEffect(() => {
        const fetchUserProfile = async () => {
            const userProfile = await getUserProfile();
        }
        
        fetchUserProfile();

        console.log('fetchUserProfile in sidebar');
    }, []);

    return (
        <div className='flex flex-col items-center h-screen lg:px-3 duration-150 md:px-1 bg-white'>
            <SidebarItem link="/help" icon={faLifeRing} title="Trợ giúp" active={activeItem === 'help'} onClick={() => handleItemClick('help')} />
            <SidebarItem link="/location" icon={faLocationDot} title="Định vị" active={activeItem === 'location'} onClick={() => handleItemClick('location')} />
            <SidebarItem link="/" icon={faTowerBroadcast} title="Khẩn cấp" active={activeItem === 'home'} onClick={() => handleItemClick('home')} />
            <SidebarItem link="/messages" icon={faMessage} title="Tin nhắn" active={activeItem === 'messages'} onClick={() => handleItemClick('messages')} />
            <SidebarItem link="/notifications" icon={faBell} title="Thông báo" active={activeItem === 'notifications'} onClick={() => handleItemClick('notifications')} />
        </div >
    )
}

export default Sidebar;
