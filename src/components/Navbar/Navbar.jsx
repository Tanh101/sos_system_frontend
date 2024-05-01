import { useState, useRef, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import avatar from '../../assets/imgs/avatar.png';
import AuthService from '../../services/AuthService';
import Notification from '../Notification/Notification';
import Logo from '../Logo/Logo';
import { UserContext } from '../Context/UserContext/UserContext';

const Navbar = () => {
    const count = 10;

    const userContext = useContext(UserContext)

    const { logout } = AuthService();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleClickOutside = (event) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
        ) {
            setIsDropdownOpen(false);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        logout();
    }

    useEffect(() => {
        window.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const [isOpen, setIsOpen] = useState(false);

    const toggleNoti = () => {
        setIsOpen(!isOpen);
    };


    return (
        <div className='flex justify-between shadow-xl border-b items-center bg-white font-poppins'>
            <div className='mx-10 font-semibold text-xl'>
                <Logo />
            </div>
            <div className="flex justify-center items-center">
                <div className="flex flex-row relative mx-10" >
                    <div className="flex Notification" onClick={toggleNoti}>
                        <Notification count={count} />
                    </div>
                </div>
                <div className="profile flex flex-row relative" onClick={toggleDropdown} ref={dropdownRef}>
                    <div className="border border-[#F73334] rounded-full">
                        <img className='object-cover w-12 h-12 cursor-pointer' loading='lazy' src={avatar} alt="" />
                    </div>
                    <div className='flex justify-between flex-1 flex-col mx-5 font-semibold cursor-pointer'>
                        <p className='font-semibold'>{userContext?.name}</p>
                        <p className='text-sm font-normal'>{userContext?.email}</p>
                    </div>
                    {isDropdownOpen && (
                        <div className="absolute top-full right-4 mt-3 w-48 bg-white rounded-md rounded-t-none shadow-lg z-50">
                            <div className="py-1">
                                <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#F73334] hover:text-white" to={"supports"}>Profile</Link>
                                <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#F73334] hover:text-white" onClick={handleSubmit}>
                                    <button type="button">Logout</button>
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
