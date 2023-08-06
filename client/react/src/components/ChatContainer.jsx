import axios from "axios";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import { sendMessageRoute,getMessageRoute } from "../utils/Routes";
import { useState,useEffect } from "react";

const ChatContainer = ({ currentChat,currentUser }) => {
    const [messages,setMessages] = useState([]);

    useEffect(()=>{
        const fetchData = async()=>{
            const res = await axios.post(getMessageRoute,{
                from:currentUser._id,
                to:currentChat._id,
            })
            setMessages(res.data)
        }
        fetchData()
    },[currentChat])

    const handleSendMessage = async(msg)=>{
        const messagebody={
            from:currentUser._id,
            to:currentChat._id,
            message:msg
        }
        const {data} = await axios.post(sendMessageRoute,messagebody);
        if(data.status === true){
            alert('msg send')
        }
    }
    console.log(messages.length)
    return (
        <div className="chat-section">
           <div className="chat-header">
            <div className="user-details">
                <div className="avatar">
                    <img src={
                        `data:image/svg+xml;base64,${currentChat.avatarImage}`
                    } alt="avatar" />
                </div>
                <div className="username">
                    <h3 className="username text-light">{currentChat.username}</h3>
                </div>
            </div>
           </div>

           <Messages messages={messages} />
           {/* <div className="chat-messages">
            {
                messages.map((message,index)=>{
                    return(
                        <div key={index}>
                            <div className={`message ${message.fromSelf?"sended":"recieved"}`}>
                                <div className="content text-light">
                                    <p>
                                        {message?.message}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
           </div> */}
           <ChatInput handleSendMessage ={handleSendMessage} />

        </div>
    );
};

export default ChatContainer;