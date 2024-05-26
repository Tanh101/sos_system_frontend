import { faClose } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import chatbot from '../../../assets/imgs/robot.png';
import avatar from '../../../assets/imgs/avatar.png';
import { useTranslation } from 'react-i18next';

const ChatWindow = ({ chat }) => {
    const { t } = useTranslation();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState(chat ? chat.messages : []);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const handleSendMessage = () => {
        if (message.trim() === '') return;

        const newMessage = {
            sender: 'user',
            content: message,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages([...messages, newMessage]);
        setMessage('');
    };

    if (!chat) {
        return <div className="w-2/3 flex items-center justify-center text-gray-400">Chọn một cuộc trò chuyện để bắt đầu</div>;
    }

    return (
        <div className="w-full flex flex-col bg-white border-l flex-1">
            <div className="flex justify-start items-center text-slate-700 font-semibold p-3  border border-b" >
                <img className="w-10" src={avatar} alt="" />
                <p className='text-xl'>{chat.name}</p>
            </div>
            <div className="flex flex-col">
                <div className="flex flex-col overflow-y-auto my-2 h-[650px]">
                    {chat.messages.map((message, index) => (
                        <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
                            <div className={`flex items-center w-52 px-3 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                <img
                                    src={message.sender === 'user' ? avatar : chatbot}
                                    alt={`${message.sender} avatar`}
                                    className="w-8 h-8 rounded-full m-1"
                                />
                                <div className={`p-2 m-2 rounded-lg ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
                                    {message.content}
                                </div>
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex justify-start mb-2">
                            <div className="flex items-center">
                                <img
                                    src={chatbot}
                                    alt="AI avatar"
                                    className="w-8 h-8 rounded-full m-2"
                                />
                                <div className="p-2 m-2 rounded-lg bg-gray-300">
                                    ...
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="p-2 flex border-t h-16 px-40">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        rows={1}
                        className="flex-1 p-2 border rounded-l-lg outline-none resize-none overflow-y-auto"
                        style={{ maxHeight: '100px' }}
                    />
                    <button type='submit' className="p-2 bg-[#F73334] text-white rounded-r-lg">{t("Gửi")}</button>
                </div>
            </div>
        </div>
    );
};

export default ChatWindow;
