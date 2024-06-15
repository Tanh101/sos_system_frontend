import React, { useState } from 'react';
import avatar from '../../../assets/imgs/avatar.png';
import { formatHHmm } from '../../../utilities/formatDate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faDotCircle } from '@fortawesome/free-solid-svg-icons';
import socketInstance from '../../../utilities/socketInstance';

const ChatList = ({ chats, setSelectedChat }) => {
    const [activeItem, setActiveItem] = useState('unread');
    const { emitWithToken } = socketInstance();

    const handleSelectChat = (chat) => {
        emitWithToken("markAsRead", {
            conversationId: chat._id,
        });
        
        setSelectedChat(chat);
    }

    return (
        <div className="w-1/4 bg-white overflow-y-auto border-r">
            <div className="flex m-2 justify-start ">
                <button className={`${activeItem === 'unread' ? ' bg-slate-100 text-red-600' : ''} mx-4 px-2 py-1
                 rounded-xl hover:bg-slate-100 hover:text-red-600 font-medium`}
                    onClick={() => setActiveItem('unread')}>
                    Unread
                </button>
                <button className={`${activeItem === 'read' ? ' bg-slate-100 text-red-600' : ''} mx-4 px-2 py-1
                 rounded-xl hover:bg-slate-100 hover:text-red-600 font-medium`}
                    onClick={() => setActiveItem('read')}>
                    Read
                </button>
            </div>
            {chats && chats?.map(chat => (
                <div
                    key={chat._id}
                    className="flex rounded-lg justify-between items-center px-2     cursor-pointer hover:bg-slate-100 mx-2"
                    onClick={() => handleSelectChat(chat)}
                >
                    <div className="flex p-2">
                        <img className=" w-10 h-10" src={avatar} alt="" />
                        <div className="flex flex-col mx-2">
                            <div className="flex justify-start items-center">
                                <div className="font-medium">{chat?.opponent?.name}</div>
                            </div>
                            <div className="text-gray-600 text-sm font-normal w-full justify-center items-center">
                                <p className=''>
                                    {chat?.lastMessage?.message}
                                </p>
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
        </div>
    );
};

export default ChatList;
