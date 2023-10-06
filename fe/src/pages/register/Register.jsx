import React, { useState } from 'react';
import { Link ,} from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './register.css';

const Register=(props)=> {

    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [confirmpass,setConfirmpass]=useState("");
    const [email,setEmail]=useState("");
    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [phone,setPhone]=useState();
    
    const postUser= async (e)=>{
        e.preventDefault();
    
        // Send a POST request to the server with the user data
        fetch('auths/register', {
            method: 'POST',
            headers:{
                'Content-type':'application/json',
            },
            body: JSON.stringify({username,password,email,firstName,lastName,phone})
        })
        .then((res) => {
            if (res.ok) {
              console.log(res, 'User created successfully');
              toast.success('User created successfully', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
              });
              setTimeout(() => {
                window.location.href = '/login';
            }, 2000);
            } else {
              console.log('Error creating user');
              res.text().then((errorMessage) => {
                toast.error(errorMessage.error || 'Error creating user', {
                  position: toast.POSITION.TOP_RIGHT,
                  autoClose: 3000,
                });
              });
            }
          })
          .catch((error) => console.error('error'));
    };
    

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">VidShare</h3>
                    <span className="loginDesc">
                        Stream your world,share your story
                    </span>
                </div>
                <div className="loginRight">
                    <div className="loginBox">
                        <input placeholder="Username" name="username" value={username} onChange={(e)=>{setUsername(e.target.value)}} className="loginInput"/>
                        <input placeholder="Email" name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} className="loginInput"/>
                        <input placeholder="First Name" name="firstName" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} className="loginInput"/>
                        <input placeholder="Last Name" name="lastName" value={lastName} onChange={(e)=>{setLastName(e.target.value)}} className="loginInput"/>
                        <input type="phone" placeholder="Phone" name="phone" value={phone} onChange={(e)=>{setPhone(e.target.value)}} className="loginInput"/>
                        <input type="password" placeholder="Password" name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} className="loginInput"/>
                        <input type="password" placeholder="Confirm Password" value={confirmpass} onChange={(e)=>{setConfirmpass(e.target.value)}} className="loginInput"/>
                        <button onClick={postUser} className="loginButton">Sign Up</button>
                        <Link to='/login'><button className="loginRegister">Log into Account</button></Link>
                    </div>
                </div>
            </div>
            
        </div>
    );
};
export default Register;
