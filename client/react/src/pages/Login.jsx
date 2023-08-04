import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { loginRoute } from "../utils/Routes";
const Login = () => {
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
    }

    return (
        <div className="bg-dark text-light">
            <div className="container py-3">
                <h3 className="my-3">Login</h3>
                <div className="">
                    <form onSubmit={handleSubmit}>
                        <div className="form-outline">
                            <input type="text" name="username" className="form-control" onChange={(e) => handleChange(e)} min="3" />
                            <label className="form-label" htmlFor="form3Example1">Username</label>
                        </div>

                        <div className="form-outline mb-3">
                            <input type="password" name="password" className="form-control" onChange={(e) => handleChange(e)} />
                            <label className="form-label" htmlFor="form3Example4">Password</label>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block mb-4">Login</button>

                        <div>
                            <p> Don't Have an account? <Link to={'/register'}>Sign Up</Link></p>
                        </div>
                    </form>
                    <ToastContainer/>
                </div>
            </div>
        </div>
    );
};

export default Login;