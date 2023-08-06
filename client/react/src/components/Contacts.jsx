import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Contacts = ({ contacts, currentUser,chatChange }) => {
    //import states
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);


    useEffect(() => {
        if (currentUser) {
            setCurrentUserImage(currentUser.avatarImage);
            setCurrentUserName(currentUser.username);
        }
    }, [currentUser])

    const navigate = useNavigate();

    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        chatChange(contact);
    }

    const handleLogOut = ()=>{
        localStorage.removeItem('app-user');
        navigate('/login');
    }


    return (
        <>{
            currentUserImage&&(
                <div className="second-color position-relative">
                    <div className="brand my-2 text-center">
                        <h4 className="logo text-light">ChatWave</h4>
                    </div>
                    <div className="mx-2 my-4">
                        <button className="btn btn-outline-light w-100">Create Chat Room</button>
                    </div>
                    <div className="contacts">
                        {
                            contacts.map((contact, index) => {
                                return (
                                    <div className={`contact ${index === currentSelected ? "selectContact" : ""}`} key={index} onClick={()=>changeCurrentChat(index,contact)}>
                                        <div className="avatar">
                                            <img src={
                                                `data:image/svg+xml;base64,${contact.avatarImage}`
                                            } alt="avatar" />
                                        </div>

                                        <div className="username">
                                            <h4>{contact.username}</h4>
                                        </div>
                                    </div>
                                );
                            })
                        }

                    </div>

                    <div className="current-user">
                        <div className="avatar">
                            <img src={
                                `data:image/svg+xml;base64,${currentUserImage}`
                            } style={{ height: '3rem' }} alt="avatar" />
                        </div>

                        <div className="username">
                            <h4 className="text-light">{currentUserName}</h4>
                        </div>

                        <div>
                            <button className="btn btn-danger" onClick={handleLogOut}>Logout</button>
                        </div>
                    </div>

                </div>
            )
        }
        </>
    );
};

export default Contacts;