import { useEffect, useContext, useState } from 'react';
import { UserContext } from '../../Context/UserContext/UserContext';
import ChatList from './ChatList/ChatList';
import ChatWindow from './ChatWindow/ChatWindow';

const Inbox = () => {
    const { setActiveItem } = useContext(UserContext);

    useEffect(() => {
        setActiveItem("messages");
    }, [setActiveItem]);

    const chats = [
        {
            id: 1,
            name: 'Pham Tien Huu',
            messages: [
                { sender: 'user', content: 'Hello!', timestamp: '10:00 AM' },
                { sender: 'Huu', content: 'Hi!', timestamp: '10:01 AM' }
            ]
        },
        {
            id: 2,
            name: 'Jane Doe',
            messages: [
                { sender: 'user', content: 'Hi!', timestamp: '11:00 AM' },
                { sender: 'other', content: 'Hello!', timestamp: '11:01 AM' }
            ]
        }
    ];

    const [selectedChat, setSelectedChat] = useState(chats[0]);


    return (
        <div className="flex h-screen w-full">
            <ChatList chats={chats} setSelectedChat={setSelectedChat} />
            <ChatWindow chat={selectedChat} />
        </div>
    );
}

export default Inbox;
