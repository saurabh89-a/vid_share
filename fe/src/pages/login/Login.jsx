import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux'
import axios from "axios";
import './login.css';
import { loginFailure, loginStart, loginSuccess } from '../../redux/userSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login=(props)=> {

    const [userName,setUserName]=useState();
    const [password,setPassword]=useState();

    const navigate=useNavigate();
    const dispatch=useDispatch();

    const login= async (e)=>{
        e.preventDefault();
        dispatch(loginStart());
        
        try{
            console.log(userName,password);
        const res= await axios.post('http://localhost:8800/api/auths/login',{userName,password},  {withCredentials: true});
          dispatch(loginSuccess(res.data))
          console.log(res.data)
          toast.success("Logged in successfully!");
          setTimeout(() => {
            navigate("/")
          }, 2000);
          
        }
        catch(err){
            dispatch(loginFailure())
            toast.error("Login failed!");
            console.log(err)
        }
        setPassword("");
        setUserName("");
    }

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">VidShare</h3>
                    <span className="loginDesc">
                        Login to Connect.......
                    </span>
                </div>
                <div className="loginRight">
                    <div className="loginBox">
                        <input placeholder="Email or Username" value={userName} onChange={(e)=>{setUserName(e.target.value)}} className="loginInput"/>
                        <input placeholder="Password" type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} className="loginInput"/>
                        <button className="loginButton"  onClick={login}>Log IN</button>
                        <span className="loginForgot">Forgot Password</span>
                        <Link to='/signup'>
                        <button className="loginRegister">Create a new Account</button>
                        </Link>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default Login;