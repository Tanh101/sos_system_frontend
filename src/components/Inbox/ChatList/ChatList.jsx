import React, { useState } from 'react';
import avatar from '../../../assets/imgs/avatar.png';

const ChatList = ({ chats, setSelectedChat }) => {

    const [activeItem, setActiveItem] = useState('unread');

    return (
        <div className="w-1/4 bg-white overflow-y-auto">
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
            {chats.map(chat => (
                <div
                    key={chat.id}
                    className="flex rounded-lg justify-between items-center px-2     cursor-pointer hover:bg-slate-100 mx-2"
                    onClick={() => setSelectedChat(chat)}
                >
                    <div className="flex p-2">
                        <img className=" w-10 h-10" src={avatar} alt="" />
                        <div className="flex flex-col mx-2">
                            <div className="flex justify-start items-center">
                                <div className="font-medium">{chat.name}</div>
                            </div>
                            <div className="text-gray-600 text-sm font-normal w-full justify-center items-center">
                                <p className=''>
                                    {chat.messages[0].content}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="text-gray-400 text-sm text-right">10m</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ChatList;
