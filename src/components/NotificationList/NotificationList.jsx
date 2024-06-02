import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Virtuoso } from 'react-virtuoso'

import { faCircle } from "@fortawesome/free-solid-svg-icons";
import avatar from '../../assets/imgs/avatar.png';
import { formatHHmm } from "../../utilities/formatDate";

const NotificationList = ({ }) => {
    const [activeMenu, setActiveMenu] = useState('All');

    const Menu = [
        'All',
        'Unread'
    ];

    const notifications = [
        {
            userName: 'Nguyen Van A',
            content: 'Đã thêm 1 yêu cầu mới',
            updatedAt: '2021-10-10',
        },
        {
            userName: 'Nguyen Van B',
            content: 'Đã thêm 1 yêu cầu mới',
            updatedAt: '2021-10-10',
        }
    ];

    return (
        <div className="absolute top-full z-[999] right-[-160px] rounded-2xl px-1 shadow-lg border bg-slate-50 w-80  h-auto">
            <div className="flex flex-col w-full p-1">
                <div className="flex justify-center items-center">
                    <p className="text-sm font-semibold">Notifications</p>
                </div>
                <div className="flex text-base">
                    {Menu.map((item, index) => (
                        <button
                            key={index}
                            className={`${activeMenu === item ? 'bg-blue-100 text-blue-500' : 'bg-slate-50'} 
                                p-2 rounded-2xl px-4 mx-4 my-2 text-black`}
                            onClick={() => { setActiveMenu(item) }}
                        >
                            {item}
                        </button>
                    ))}
                </div>

                <Virtuoso className="flex flex-col w-full "
                    data={notifications}
                    style={{ height: '300px' }}
                    itemContent={(index, item) => {
                        return (
                            <div onClick={() => { console.log('click') }}
                                className="flex flex-row m cursor-pointer px-1 hover:bg-slate-300 justify-start items-center rounded-xl mx-5"
                                key={item.id}
                                value={item.id}
                            >
                                <div className="flex p-2">
                                    <img className="object-cover w-10 h-10 rounded-full" src={avatar} alt="" />
                                </div>
                                <div className="flex flex-col mx-2">
                                    <p className="max-w-52 text-sm">{item?.content}</p>
                                    <p className="mt-1 text-xs font-bold text-blue-500">{formatHHmm(item?.updatedAt)}</p>
                                </div>
                                <div className="flex flex-1 justify-end items-end p-2">
                                    <FontAwesomeIcon icon={faCircle} className="text-blue-500" size={'xs'} />
                                </div>

                            </div>
                        )
                    }}
                />
                <div className="flex mt-5 justify-center">
                    <button className="cursor-pointer hover:text-blue-600"
                    >
                        View all
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotificationList;
