import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRoomRoute } from "../utils/Routes";
import { useSelector } from "react-redux/es/hooks/useSelector";
const Contacts = ({ contacts, currentUser, chatChange }) => {
    //import states
    const user = useSelector((state)=>state.user.value)
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);
    const [chatRoomName,setChatRoomName] = useState('');

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

    const handleLogOut = () => {
        localStorage.removeItem('app-user');
        navigate('/login');
    }

    const handleCreateChatRoom = async(name)=>{
        const res = await axios.post(createRoomRoute,{name})
        const data = res.data;
        if(data.status === true){
            alert('Room Created')
        }
    }


    return (
        <>{
            currentUserImage && (
                <div className="second-color position-relative">
                    <div className="brand my-2 text-center">
                        <h4 className="logo text-light">ChatWave</h4>
                    </div>
                    <div className="mx-2 my-4">
                        <button className="btn btn-outline-light w-100" data-bs-toggle="modal" data-bs-target="#exampleModal">Create Chat Room</button>
                    </div>
                    <div className="contacts">
                        {
                            contacts.map((contact, index) => {
                                return (
                                    <div className={`contact ${index === currentSelected ? "selectContact" : ""}`} key={index} onClick={() => changeCurrentChat(index, contact)}>
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
            <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog bg-secondary">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Create Chat Room</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="chatroom-name" className="col-form-label">Chatroom Name</label>
                                    <input type="text" value={chatRoomName} className="form-control" id="chatroom-name" onChange={(e)=>setChatRoomName(e.target.value)} />
                                </div>
        
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={()=>handleCreateChatRoom(chatRoomName)}>Create</button>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    );
};

export default Contacts;