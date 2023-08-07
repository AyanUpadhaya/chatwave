import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {Buffer} from 'buffer';
import { setAvatarRoute } from "../utils/Routes";
import Loader from "../components/Loader";

const SetAvatar = () => {
    const avatarApi = "https://api.multiavatar.com/45678945";
    const navigate = useNavigate();
    const [avatars,setAvatars] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [selectedAvatar,setSelectedAvatar] = useState(undefined);
    const toastOptions ={
        position:'bottom-right',
        autoClose:8000,
        pauseOnHover:true,
        draggable:true,
        theme:"dark"
    }

    useEffect(()=>{
        if(!localStorage.getItem("app-user")){
            navigate('/login')
        }else{
            document.title="Set Avatar"
        }
    },[])



    const setProfilePicture = async()=>{
        if(selectedAvatar === undefined){
            toast.error("Not selected",toastOptions);
        }else{
            const user = await JSON.parse(localStorage.getItem('app-user'));

            const {data} = await axios.post(`${setAvatarRoute}/${user._id}`,{
                image:avatars[selectedAvatar],
            });
            console.log(data)

            if(data.isSet){
                user.isAvatarImageSet =true;
                user.avatarImage = data.image;
                localStorage.setItem("app-user",JSON.stringify(user));
                navigate('/');
            }else{
                toast.error("Error:setting avatar,try again later",toastOptions)
            }
        }
    };
    useEffect(()=>{
        const fetchData = async()=>{
            const data = [];
            for(let i = 0; i<4;i++){
                const image = await axios.get(`${avatarApi}/${Math.round(Math.random()*1000)}`)
                const buffer = new Buffer.from(image.data);
                data.push(buffer.toString("base64"))
            }
            setAvatars(data);
            setIsLoading(false);
            
        }
        fetchData();
    },[])
    if(isLoading){
        return <Loader></Loader>
    }
    return (
        
        <div>
            <div className="my-5 d-flex flex-column justify-content-center align-items-center">
                <div className="title-container">
                    <h2 className="text-light">Pick your avatar</h2>
                </div>
                <div className="avatars my-5 d-flex gap-2 align-items-center">
                    {
                        avatars.map((avatar,index)=>{
                            return(
                                <div className={
                                    `avatar p-2 ${selectedAvatar === index?"selected":""}`
                                } key={index}>

                                    <img src={
                                        `data:image/svg+xml;base64,${avatar}`
                                    } style={{height:'6rem'}} alt="avatar" onClick={()=>setSelectedAvatar(index)} />

                                </div>
                            )
                        })
                    }
                </div>
                <button onClick={setProfilePicture} className="btn btn-lg btn-primary" >SELECT</button>

            </div>
            <ToastContainer/>
        </div>
    );
};

export default SetAvatar;