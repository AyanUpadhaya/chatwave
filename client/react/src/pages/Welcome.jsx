import chatbot from '../../public/chatbot.png'

const Welcome = ({currentUser}) => {
    return (
        <div>
            <div className='d-flex flex-column justify-content-center align-items-center'>
                <div className='chatbot-section'>
                    <img src={chatbot} alt="chatbot" />
                </div>
                <div className='welcome-content'>
                    <h2>Welcome <span className='text-primary'>{currentUser?.username}!</span></h2>
                    <h3>Please Select chat to start chating</h3>
                </div>
            </div>
        </div>
    );
};

export default Welcome;