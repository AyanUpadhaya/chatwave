import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { loginRoute } from "../utils/Routes";
import { useDispatch } from "react-redux";
import {login} from '../features/user'

const Login = () => {

    const dispatch = useDispatch();

    //state for form values
    const [values,setValues] = useState({
        username:'',
        password:'',
    })
    const navigate = useNavigate();
    const toastOptions ={
        position:'bottom-right',
        autoClose:8000,
        pauseOnHover:true,
        draggable:true,
        theme:"dark"
    }

    useEffect(()=>{
        if(localStorage.getItem('app-user')){
            navigate('/')
        }
    },[])


    //handle form submission
   
    const handleSubmit = async(e) => {
        e.preventDefault();
        if(handleValidation()){
            const {password,username}= values;
            const {data} = await axios.post(loginRoute,{
                username,
                password
            });
            if(data.status === false){
                toast.error(data.msg,toastOptions);
            }
            if(data.status === true){

                localStorage.setItem('app-user',JSON.stringify(data.user));
                const {username,email,avatarImage} = data.user
                const payload = {username,email,avatarImage}
                dispatch(login(payload))
                navigate('/');
            }
        }
    }

    //tracking inputs
    const handleChange = (event) => {
        setValues({...values,[event.target.name]:event.target.value});
    }
    

    //form validation
    const handleValidation =()=>{
        const {password,username}= values;

        if(password === ""){
            toast.error('Username and Password Required',toastOptions);
            return false;
        }else if(username.length === ""){
            toast.error('Username and Password Required',toastOptions);
            return false;
        }
        return true;
    }

    return (
        <div className="bg-dark text-light">
            <div className="container py-3 d-flex flex-column justify-content-center align-items-center gap-2">
                <h3 className="my-3">Login</h3>
                <div className="login-container">
                    <form onSubmit={handleSubmit}>
                        <div className="form-outline">
                            <input type="text" name="username" className="form-control" onChange={(e) => handleChange(e)} />
                            <label className="form-label">Username</label>
                        </div>

                        <div className="form-outline mb-3">
                            <input type="password" name="password" className="form-control" onChange={(e) => handleChange(e)} />
                            <label className="form-label">Password</label>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block mb-4">Login</button>

                        <div>
                            <p> Dont Have an account? <Link to={'/register'}>Sign Up</Link></p>
                        </div>
                    </form>
                    
                </div>
                <ToastContainer/>
            </div>
        </div>
    );
};

export default Login;