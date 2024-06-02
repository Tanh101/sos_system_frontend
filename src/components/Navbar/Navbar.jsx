import { useState, useRef, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import avatar from '../../assets/imgs/avatar.png';
import AuthService from '../../services/AuthService';
import Notification from '../Notification/Notification';
import Logo from '../Logo/Logo';
import { UserContext } from '../../Context/UserContext/UserContext';
import { LocaleContext } from '../../Context/LocaleContext/LocaleContext';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NotificationList from '../NotificationList/NotificationList';
import { Dropdown } from 'antd';
const Navbar = () => {
    const { t } = useTranslation();

    const { handleChangeLanguage, currentLanguage } = useContext(LocaleContext);
    const { user, receiveEmergencyRequest, receiveResponseFromRescuer } = useContext(UserContext);

    const [count, setCount] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const notificationRef = useRef(null);

    const { logout } = AuthService();

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const toggleNoti = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (
            dropdownRef.current && !dropdownRef.current.contains(event.target)
        ) {
            setIsDropdownOpen(false);
        }
        if (
            notificationRef.current && !notificationRef.current.contains(event.target)
        ) {
            setIsOpen(false);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        logout();
    };

    useEffect(() => {
        window.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (user && user.role === 'rescuer') {
            receiveEmergencyRequest((data) => {
                setCount(prevCount => prevCount + 1);
            });
        } else if (user && user.role === 'user') {
            receiveResponseFromRescuer((data) => {
                console.log('Response from rescuer:', data);
                setCount(prevCount => prevCount + 1);
            });
        }
    }, [user]);

    return (
        <div className='flex justify-between shadow-xl border-b items-center bg-white'>
            <div className='mx-10 font-semibold text-xl'>
                <Logo />
            </div>
            <div className="flex justify-center items-center">
                <div className="flex rounded-lg bg-slate-300 border-2">
                    <select className='outline-none focus:border-red-600 focus:border-2 rounded-lg'
                        onChange={handleChangeLanguage} value={currentLanguage}>
                        <option value="vn">Vn</option>
                        <option value="en">En</option>
                    </select>
                </div>
                <div className="flex flex-row relative mx-10">
                    <div className="flex Notification" onClick={toggleNoti} ref={notificationRef}>
                        <IconButton aria-label="Notifications">
                            <Badge badgeContent={count} color="error">
                                <FontAwesomeIcon color='slate-400' icon={faBell} onClick={toggleNoti} />
                            </Badge>
                        </IconButton>
                    </div>
                    {isOpen && (
                        <div className="absolute top-full -right-1/4 mt-2 w-64 bg-white rounded-md shadow-lg z-50" >
                            <NotificationList />
                        </div>
                    )}
                </div>
                <div className="profile flex flex-row relative" onClick={toggleDropdown} ref={dropdownRef}>
                    <div className="border border-[#F73334] rounded-full">
                        <img className='object-cover w-12 h-12 cursor-pointer' loading='lazy' src={avatar} alt="" />
                    </div>
                    <div className='flex justify-between flex-1 flex-col mx-5 font-semibold cursor-pointer'>
                        <p className='font-semibold'>{user?.name}</p>
                        <p className='text-sm font-normal'>{user?.email}</p>
                    </div>
                    {isDropdownOpen && (
                        <div className="absolute top-full right-4 mt-3 w-48 bg-white rounded-md rounded-t-none shadow-lg z-50">
                            <div className="py-1">
                                <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#F73334] hover:text-white" to={"profile"}>{t("Hồ sơ cá nhân")}</Link>
                                <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#F73334] hover:text-white" onClick={handleSubmit}>
                                    <button type="button">{t("Đăng xuất")}</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
