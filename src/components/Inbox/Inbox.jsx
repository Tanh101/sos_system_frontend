import { useLocation } from 'react-router-dom';
import { useEffect, useContext, useState } from 'react';
import { UserContext } from '../../Context/UserContext/UserContext';
import ChatList from './ChatList/ChatList';
import ChatWindow from './ChatWindow/ChatWindow';
import socketInstance, { socket } from '../../utilities/socketInstance';
import ChatService from '../../services/ChatService';

const Inbox = () => {
    const { setActiveItem } = useContext(UserContext);
    const location = useLocation();
    const { emitWithToken } = socketInstance();
    const { getConversationsByUserId } = ChatService();

    useEffect(() => {
        setActiveItem("messages");
    }, [setActiveItem]);

    const [chatList, setChatList] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [newChatAdded, setNewChatAdded] = useState(false);

    useEffect(() => {
        const fetchConversations = async () => {
            if (!newChatAdded) {
                const response = await getConversationsByUserId();
                setChatList(response);
                if (!location.state?.newChat) {
                    setSelectedChat(response[0]);
                }
            }
        };

        fetchConversations();
    }, [newChatAdded, location.state]);

    useEffect(() => {
        if (location.state?.newChat) {
            const newChat = location.state.newChat;
            // Check if the new chat already exists in chatList
            const chatExists = chatList.some(chat => chat.opponent.id === newChat.opponent.id);
            if (!chatExists) {
                setChatList(prevList => [newChat, ...prevList]);
                setSelectedChat(newChat);
                setNewChatAdded(true);
            }
        }
    }, [location.state, chatList]);

    useEffect(() => {
        socket.on("privateMessage", (data) => {
            const { conversationId, message } = data;
            setSelectedChat(prevChat => {
                // Update the selected chat's last message
                if (prevChat) {
                    return {
                        ...prevChat,
                        lastMessage: {
                            ...prevChat.lastMessage,
                            messages: [...(prevChat.lastMessage?.messages || []), message.message]
                        },
                        _id: conversationId,
                    };
                }
                return prevChat;
            });
            setChatList(prevList => {
                // Update the chatList with the new message
                return prevList.map(chat => {
                    if (chat._id === conversationId) {
                        return {
                            ...chat,
                            lastMessage: {
                                ...chat.lastMessage,
                                message: message.message,
                            }
                        };
                    }
                    return chat;
                });
            });
        });

        socket.on("markAsRead", (data) => {
            const { conversationId } = data;
            setChatList(prevList => {
                return prevList.map(chat => {
                    if (chat._id === conversationId) {
                        return {
                            ...chat,
                            unreadCount: 0,
                        };
                    }
                    return chat;
                });
            });
        });

        return () => {
            socket.off("privateMessage");
            socket.off("markAsRead");
        }
    }, []);

    const handleSendMessage = (message) => {
        if (!selectedChat) return;

        emitWithToken("privateMessage", {
            receiver: selectedChat.opponent.id,
            message: message,
        });

        setSelectedChat(prevChat => {
            return {
                ...prevChat,
                lastMessage: {
                    ...prevChat.lastMessage,
                    messages: [...(prevChat.lastMessage?.messages || []), message]
                },
                
            };
        });

        setChatList(prevList => {
            return prevList.map(chat => {
                if (chat._id === selectedChat._id) {
                    return {
                        ...chat,
                        lastMessage: {
                            ...chat.lastMessage,
                            message: message,
                        }
                    };
                }
                return chat;
            });
        });
    };

    return (
        <div className="flex h-screen w-full">
            <ChatList chats={chatList} setSelectedChat={setSelectedChat} />
            {selectedChat && <ChatWindow chat={selectedChat} onSendMessage={handleSendMessage} />}
        </div>
    );
};

export default Inbox;
