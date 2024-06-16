import { useContext, useEffect, useState } from 'react';
import { faLocationDot, faBell, faLifeRing, faMessage, faTowerBroadcast, faArrowLeft, faArrowRight, faBars } from "@fortawesome/free-solid-svg-icons"

import SidebarItem from "../SidebarItem/SidebarItem"
import { UserContext } from '../../../Context/UserContext/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { USER_ROLE } from '../../../constants/config';
import socketInstance, { socket } from '../../../utilities/socketInstance';

const Sidebar = () => {
    const { emitWithToken } = socketInstance();
    const { user, activeItem, setActiveItem } = useContext(UserContext);

    const [isShow, setIsShow] = useState(true);
    const [userCount, setUserCount] = useState({ unviewedNotifications: 0, unviewedMessages: 0 });

    useEffect(() => {
        emitWithToken("getUnviewedCounts");

        socket.on("unviewedCountUpdated", data => {
            setUserCount(data);
        });

        return () => {
            socket.off("unviewedCountUpdated");
        };
    }, []);

    useEffect(() => {
        socket.on("newMessage", () => {
            emitWithToken("getUnviewedCounts");
        });

        return () => {
            socket.off("newMessage");
        };
    }, []);

    const handleShowSidebar = () => {
        setIsShow(!isShow);
    }

    const handleItemClick = (item) => {
        if (item === 'messages') {
            emitWithToken("resetUnviewedMessages");
        }
        setActiveItem(item);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1000) {
                setIsShow(true);
            } else {
                setIsShow(false);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={`flex flex-col items-start h-screen duration-150 md:px-1 min-w-20 bg-white ${isShow ? 'w-64' : 'w-16'} border-r`}>
            <div className={`flex ${isShow ? 'justify-start' : 'justify-start'} mx-1 items-center h-10 w-full mt-2 transition ease-in-out delay-100 border-b`}>
                <div className="relative justify-start text-start px-4">
                    <FontAwesomeIcon className="cursor-pointer" icon={faBars} style={{ color: "#000" }} size="xl" onClick={handleShowSidebar} />
                </div>
                {isShow && <p className='mx-4'>Menu</p>}
            </div>
            <SidebarItem isShow={isShow} link="/help" icon={faLifeRing} title="Trợ giúp" active={activeItem === 'help'} onClick={() => handleItemClick('help')} />
            <SidebarItem isShow={isShow} link="/location" icon={faLocationDot} title="Định vị" active={activeItem === 'location'} onClick={() => handleItemClick('location')} />
            <SidebarItem isShow={isShow} link="/" icon={faTowerBroadcast} title="Khẩn cấp" active={activeItem === 'home'} onClick={() => handleItemClick('home')} />
            <SidebarItem userCount={userCount} isShow={isShow} link="/messages" icon={faMessage} title="Tin nhắn" active={activeItem === 'messages'} onClick={() => handleItemClick('messages')} />
            {user.role === USER_ROLE.RESCUER &&
                <SidebarItem isShow={isShow} link="/rescue" icon={faBell} title="Cứu hộ" active={activeItem === 'rescue'} onClick={() => handleItemClick('rescue')} />
            }
        </div >
    )
}

export default Sidebar;
