import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { allUsersRoute, host } from '../utils/Routes';
import { io } from "socket.io-client";
import Contacts from '../components/Contacts';
import Welcome from './Welcome';
import ChatContainer from '../components/ChatContainer';
const Chat = () => {
    const socket = useRef();
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
    const [currentUser, setcurrentUser] = useState(undefined);
    const [currentChat, setCurrentChat] = useState(undefined);

    useEffect(() => {
        if (!localStorage.getItem("app-user")) {
            navigate('/login');
        } else {
            setcurrentUser(JSON.parse(localStorage.getItem("app-user")))
            document.title = "Chat"
        }
    }, []);

    useEffect(() => {
        if (currentUser) {
            socket.current = io(host);
            socket.current.emit("add-user", currentUser._id);
        }
    }, [currentUser])

    useEffect(() => {
        const fetchUsers = async () => {
            if (currentUser) {
                if (currentUser.isAvatarImageSet) {
                    const { data } = await axios.get(`${allUsersRoute}/${currentUser._id}`);
                    setContacts(data)
                } else {
                    navigate("/setAvatar");
                }
            }
        }
        fetchUsers()
    }, [currentUser]);

    const handleChatChange = (chat) => {
        setCurrentChat(chat)
    }



    return (
        <div className="chat-container">
            <div className="chat-container-box">
                <Contacts contacts={contacts} currentUser={currentUser} chatChange={handleChatChange} />
                {
                    currentChat === undefined ? <Welcome currentUser={currentUser} /> : <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />
                }

            </div>
        </div>
    );
};

export default Chat;