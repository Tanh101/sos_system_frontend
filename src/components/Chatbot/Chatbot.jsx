import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

import chatbot from '../../assets/imgs/robot.png';
import avatar from '../../assets/imgs/avatar.png';
import ChatService from '../../services/ChatService.js';
import { useTranslation } from 'react-i18next';

const Chatbot = () => {
    const { t } = useTranslation();

    const [showChatbot, setShowChatbot] = useState(false);
    const { getMessages } = ChatService();

    const [messages, setMessages] = useState([{
        sender: 'ai',
        text: t("Xin chào, Tôi có thể giúp gì cho bạn?"),
    }]);

    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const handleSend = () => {
        const fetchChatbotResponse = async () => {
            try {
                const response = await getMessages(input);
                setMessages((prevMessages) => [...prevMessages, { sender: 'ai', text: response }]);
                setIsTyping(false);
            } catch (error) {
                console.error('Failed to fetch chatbot response:', error);
            }
        };

        if (input.trim()) {
            setMessages([...messages, { sender: 'user', text: input }]);
            setInput('');
            setIsTyping(true);

            fetchChatbotResponse();
        }
    };


    return (
        <div className='fixed z-50 bottom-0 right-0 m-10 font-roboto'>
            <div className="flex rounded-full bg-white border-2 shadow-lg hover:bg-slate-200 hover:">
                <button className="p-2" onClick={() => setShowChatbot(!showChatbot)}>
                    <img width={60} src={chatbot} alt="Chatbot" />
                </button>
            </div>
            {showChatbot && (
                <div className="fixed bottom-10 right-10 w-80 h-[560px] bg-white border shadow-lg flex flex-col font-roboto text-sm">
                    <div className="flex justify-between items-center bg-[#F73334] text-white p-4 rounded-t-lg">
                        <h1 className='text-xl'>{t("REQ hỗ trợ")}</h1>
                        <button className='text-white hover:bg-white hover:text-red-600 rounded-2xl px-2' onClick={() => setShowChatbot(false)}>
                            <FontAwesomeIcon icon={faClose} />
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto my-2 ">
                        {messages.map((message, index) => (
                            <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
                                <div className={`flex items-center w-52 px-3 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                    <img
                                        src={message.sender === 'user' ? avatar : chatbot}
                                        alt={`${message.sender} avatar`}
                                        className="w-8 h-8 rounded-full m-1"
                                    />
                                    <div className={`p-2 m-2 rounded-lg ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
                                        {message.text}
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
                    <div className="p-2 flex border-t">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            rows={1}
                            className="flex-1 p-2 border rounded-l-lg outline-none resize-none overflow-y-auto"
                            style={{ maxHeight: '100px' }}
                        />
                        <button type='submit' onClick={handleSend} className="p-2 bg-[#F73334] text-white rounded-r-lg">{t("Gửi")}</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;