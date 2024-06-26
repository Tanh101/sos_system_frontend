import { useContext, useEffect, useRef, useState } from 'react';
import chatbot from '../../../assets/imgs/robot.png';
import avatar from '../../../assets/imgs/avatar.png';
import { useTranslation } from 'react-i18next';
import ChatService from '../../../services/ChatService';
import { UserContext } from '../../../Context/UserContext/UserContext';

const ChatWindow = ({ chat, onSendMessage }) => {
    const { t } = useTranslation();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const { user } = useContext(UserContext);
    const messagesEndRef = useRef(null);

    const { getInboxMessages } = ChatService();
    const handleSendMessage = () => {
        if (message.trim() === '') return;
        onSendMessage(message);
        setMessage('');
    };

    useEffect(() => {
        if (chat?.opponent?.id) {
            const getChatMessages = async () => {
                const response = await getInboxMessages(chat.opponent.id);
                setMessages(response);
            }
            getChatMessages();
        }
    }, [chat]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    if (!chat) {
        return <div className="w-2/3 bg-white flex-1 flex items-center justify-center text-gray-400">Chọn một cuộc trò chuyện để bắt đầu</div>;
    }
    return (
        <div className="w-full flex flex-col bg-white border-l flex-1">
            <div className="flex justify-start items-center text-slate-700 font-semibold p-3 border-b">
                <img className="w-10" src={avatar} alt="" />
                <p className='text-xl'>{chat?.opponent?.name}</p>
            </div>
            <div className="flex flex-col">
                <div className="flex flex-col overflow-y-auto my-2 h-[850px]">
                    {messages && messages?.messages?.map((message, index) => (
                        <div key={index} className={`flex ${message.sender === user.id ? 'justify-end' : 'justify-start'} mb-2`}>
                            <div className={`flex items-center w-52 px-3 ${message.sender === user.id ? 'flex-row-reverse' : 'flex-row'}`}>
                                <img
                                    src={message.sender === user.id ? user.avatar || avatar : chat.opponent.avatar || avatar}
                                    alt="avatar"
                                    className="w-8 h-8 rounded-full m-1"
                                />
                                <div className={`p-2 m-2 rounded-lg ${message.sender === user.id ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
                                    {message?.message}
                                </div>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                <div className="p-2 flex border-t h-16 px-40">
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={1}
                        className="flex-1 p-2 border rounded-l-lg outline-none resize-none overflow-y-auto"
                        style={{ maxHeight: '100px' }}
                    />
                    <button type='submit' className="p-2 bg-[#F73334] text-white rounded-r-lg" onClick={handleSendMessage}>{t("Gửi")}</button>
                </div>
            </div>
        </div>
    );
};

export default ChatWindow;
