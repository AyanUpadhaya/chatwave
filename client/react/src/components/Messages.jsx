
const Messages = ({messages,scrollRef,uuidv4}) => {
    return (
        <div className="messages chat-messages">
        {
            messages.map((message,index)=>{
                return(
                    <div ref={scrollRef} key={uuidv4()}>
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