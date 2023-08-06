
const Messages = ({messages}) => {
    return (
        <div className="messages chat-messages">
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
       </div>
    );
};

export default Messages;