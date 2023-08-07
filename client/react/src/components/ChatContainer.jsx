import axios from "axios";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import { sendMessageRoute,getMessageRoute } from "../utils/Routes";
import { useState,useEffect, useRef } from "react";
import {v4 as uuidv4} from 'uuid';

const ChatContainer = ({ currentChat,currentUser,socket }) => {
    const [messages,setMessages] = useState([]);
    const [arrivalMsg,setArrivalMsg] = useState(null);
    const scrollRef = useRef();
    useEffect(()=>{
        const fetchData = async()=>{
            const res = await axios.post(getMessageRoute,{
                from:currentUser._id,
                to:currentChat._id,
            })
            setMessages(res.data)
        }
        if(currentChat){
            fetchData()
        }
    },[currentChat])

    const handleSendMessage = async(msg)=>{
        const messagebody={
            from:currentUser._id,
            to:currentChat._id,
            message:msg
        }
        const {data} = await axios.post(sendMessageRoute,messagebody);
        socket.current.emit("send-msg",{
            to:currentChat._id,
            from:currentUser._id,
            message:msg,
        })
        const msgs = [...messages];
        msgs.push({fromSelf:true,message:msg})
        setMessages(msgs)
      
    }
    useEffect(()=>{
        if(socket.current){
            socket.current.on("msg-recieve",(msg)=>{
                setArrivalMsg({fromSelf:false,message:msg})
            })
        }
    },[])

    useEffect(()=>{
        arrivalMsg && setMessages((prev)=>[...prev,arrivalMsg])
    },[arrivalMsg])

    useEffect(()=>{
       scrollRef.current?.scrollIntoView({behaviour:"smooth"}) 
    },[messages])
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

           <Messages messages={messages} scrollRef={scrollRef} uuidv4={uuidv4} />

           <ChatInput handleSendMessage ={handleSendMessage} />

        </div>
    );
};

export default ChatContainer;