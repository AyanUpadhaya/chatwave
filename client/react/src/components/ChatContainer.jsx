
const ChatContainer = ({currentChat}) => {
    return (
        <div>
            <div className="chat-header">
                <div className="user-details">
                    <div className="avatar">
                        <img src={
                                    `data:image/svg+xml;base64,${currentChat.avatarImage}`
                                } style={{ height: '3rem' }} alt="avatar" />
                    </div>
                    <div className="username">
                        <h3>{currentChat.username}</h3>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default ChatContainer;