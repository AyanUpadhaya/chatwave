
import {IoMdSend} from 'react-icons/io';

import { useState } from 'react';

const ChatInput = ({handleSendMessage}) => {

    const [msg,setMsg] = useState("");

    const sendChat =(event)=>{
        event.preventDefault();
        if(msg.length>0){
            handleSendMessage(msg);
            setMsg('')
        }
    }
   
    return (
        <div className='d-flex gap-2 align-items-center p-3'>
            
            <form className="input-container flex-grow-1" onSubmit={(e)=>sendChat(e)}>
                <div className="form-group d-flex ">
                    <input type="text" placeholder="type msg here..." className='form-control rounded-end-0 bg-transparent text-light shadow-none' value={msg} onChange={(e)=>setMsg(e.target.value)} />
                    <button className="submit btn btn-primary rounded-start-0">
                        <IoMdSend/>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChatInput;