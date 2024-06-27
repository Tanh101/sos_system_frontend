import React, { useContext, useState } from 'react';
import avatar from '../../../assets/imgs/avatar.png';
import { formatHHmm } from '../../../utilities/formatDate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import socketInstance from '../../../utilities/socketInstance';
import { UserContext } from '../../../Context/UserContext/UserContext';
import { useTranslation } from 'react-i18next';

const ChatList = ({ chats, setChats, setSelectedChat }) => {
    const [activeItem, setActiveItem] = useState('unread');
    const { emitWithToken } = socketInstance();
    const { user } = useContext(UserContext);
    const { t } = useTranslation();

    const handleSelectChat = (chat) => {
        emitWithToken("markAsRead", {
            conversationId: chat?._id,
        });

        const updatedChats = chats.map(c => {
            if (c._id === chat._id) {
                return { ...c, unreadCount: 0 };
            }
            return c;
        });

        setChats(updatedChats);
        setSelectedChat(chat);
    };

    return (
        <div className="w-1/3 bg-white overflow-y-auto border-r text-sm">
            <div className="flex m-2 justify-start ">
                <button className={`${activeItem === 'unread' ? ' bg-slate-100 text-red-600' : ''} mx-4 px-2 py-1
                 rounded-xl hover:bg-slate-100 hover:text-red-600 font-medium`}
                    onClick={() => setActiveItem('unread')}>
                    All
                </button>
            </div>
            {chats && chats?.map(chat => (
                <div
                    key={chat._id}
                    className="flex rounded-lg justify-between items-center px-2 cursor-pointer hover:bg-slate-100 mx-2"
                    onClick={() => handleSelectChat(chat)}
                >
                    <div className="flex p-2">
                        <img className=" w-10 h-10 rounded-full" src={chat?.opponent?.avatar || avatar} alt="" />
                        <div className="flex flex-col mx-2">
                            <div className="flex justify-start items-center">
                                <div className="font-medium">{chat?.opponent?.name}</div>
                            </div>
                            <div className="hidden lg:flex text-gray-600 text-sm font-normal w-full justify-start items-center">
                                {chat?.lastMessage?.sender === user.id &&
                                    <p>
                                        {t('Bạn: ')}
                                    </p>
                                }
                                <p>{chat?.lastMessage?.message}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex mx-5">
                        <div className="text-gray-400 text-sm text-right">{formatHHmm(chat?.lastMessage?.timestamp)}</div>
                        <div className="text-gray-400 text-sm text-right mx-2">
                            {chat?.unreadCount > 0 &&
                                <FontAwesomeIcon icon={faCircle} color='blue' />
                            }
                        </div>
                    </div>
                </div>
            ))}
            {chats.length === 0 &&
                <div className="flex justify-center items-center h-64">
                    <p>{t('Không có tin nhắn')}</p>
                </div>
            }
        </div>
    );
};

export default ChatList;
