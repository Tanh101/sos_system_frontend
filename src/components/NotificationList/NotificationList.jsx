import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Virtuoso } from 'react-virtuoso'
import { useTranslation } from 'react-i18next';
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import avatar from '../../assets/imgs/avatar.png';
import { formatHHmm } from "../../utilities/formatDate";

const NotificationList = ({ notificationList }) => {
    const navigate = useNavigate();
    const {t} = useTranslation();

    const [activeMenu, setActiveMenu] = useState('All');

    const Menu = [
        'All',
    ];

    const handleNavigateRequest = (item) => {
        navigate(`/help/detail/${item?.requestId}`)
    }

    return (
        <>
            {notificationList && notificationList.length > 0 && (
                <div className="absolute top-full z-40 right-[-160px] rounded-2xl px-1 shadow-lg border bg-slate-50 w-80  h-auto">
                    <div className="flex flex-col w-full p-1">
                        <div className="flex justify-center items-center">
                            <p className="text-lg font-semibold">{t("Thông báo")}</p>
                        </div>
                        <div className="flex text-base">
                            {Menu.map((item, index) => (
                                <button
                                    key={index}
                                    className={`${activeMenu === item ? 'bg-blue-100 text-blue-500' : 'bg-slate-50'} 
                                p-2 rounded-2xl px-4 mx-4 text-black`}
                                    onClick={() => { setActiveMenu(item) }}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>

                        <Virtuoso className="flex flex-col w-full "
                            data={notificationList}
                            style={{ height: '300px' }}
                            itemContent={(index, item) => {
                                return (
                                    <div onClick={() => { handleNavigateRequest(item) }}
                                        className="flex flex-row m cursor-pointer p-2 hover:bg-slate-300 justify-start items-center rounded-xl mx-5"
                                        key={item.id}
                                        value={item.id}
                                    >
                                        <div className="flex p-1">
                                            <img className="object-cover w-14 h-10 rounded-full" src={avatar} alt="" />
                                        </div>
                                        <div className="flex flex-col mx-2">
                                            <p className="max-w-52 text-sm">{item?.message}</p>
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

                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default NotificationList;
