import ChatInput from "./ChatInput";
import Messages from "./Messages";

const ChatContainer = ({ currentChat }) => {
    const handleSendMessage = async(msg)=>{
        alert(msg)
    }
    return (
        <div>
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

           <Messages />
           <ChatInput handleSendMessage ={handleSendMessage} />

        </div>
    );
};

export default ChatContainer;