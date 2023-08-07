import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { registerRoute } from "../utils/Routes";
const Register = () => {
    //state for form values
    const [values,setValues] = useState({
        username:'',
        email:'',
        password:'',
        confirmPassword:''    
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
        }else{
            document.title="Registration"
        }
    },[])
    //handle form submission
    const handleSubmit = async(e) => {
        e.preventDefault();
        if(handleValidation()){
            const {password,email,username}= values;
            const {data} = await axios.post(registerRoute,{
                username,
                email,
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
        const {password,confirmPassword,email,username}= values;

        if(password!==confirmPassword){
            toast.error('password and confirm password should be same',toastOptions);
            return false;
        }else if(username.length<3){
            toast.error('Username should be greater than 3 characters',toastOptions);
            return false;
        }else if(password.length<8){
            toast.error('Password should be 8 Characters',toastOptions);
            return false;
        }else if(email==''){
            toast.error('Email is required',toastOptions);
            return false;
        }else{
            return true;
        }
    }

    return (
        <div className="bg-dark text-light">
            <div className="container py-3">
                <h3 className="my-3">ChatWave Register</h3>
                <div className="reg_container">
                    <form onSubmit={handleSubmit}>
                        <div className="form-outline">
                            <input type="text" name="username" className="form-control" onChange={(e) => handleChange(e)} />
                            <label className="form-label" htmlFor="form3Example1">Username</label>
                        </div>
                        <div className="form-outline mb-4">
                            <input type="email" name="email" className="form-control" onChange={(e) => handleChange(e)} />
                            <label className="form-label" htmlFor="form3Example3">Email address</label>
                        </div>


                        <div className="form-outline mb-4">
                            <input type="password" name="password" className="form-control" onChange={(e) => handleChange(e)} />
                            <label className="form-label" htmlFor="form3Example4">Password</label>
                        </div>
                        <div className="form-outline mb-4">
                            <input type="password" name="confirmPassword" className="form-control" onChange={(e) => handleChange(e)} />
                            <label className="form-label" htmlFor="form3Example4">Confirm Password</label>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block mb-4">Sign up</button>

                        <div>
                            <p>Already Have an account? <Link to={'/login'}>Login</Link></p>
                        </div>
                    </form>
                    <ToastContainer/>
                </div>
            </div>
        </div>
    );
};

export default Register;