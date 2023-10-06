import React, { useState,useEffect } from "react";
// import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import "./Profile.css";
import { useLocation } from "react-router-dom";
import Home from "../home/Home";
import { Button } from "@mui/material";

const UserProfile = () => {

//   const dispatch=useDispatch();
  const userId=useLocation().pathname.split("/")[2];
  console.log(userId)
  const [user,setUser]=useState(null);
    
//   const currentUser=useSelector(state=>state.user.currentUser)[0]

  useEffect(() => {
    fetch(`http://localhost:8800/api/users/find/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUser(data[0]);
      })
      .catch((err) => console.log(err));
  }, [userId]);








  return (
    <div className="profile">
      <div className="profile-header">
      <div>
        <img
          className="profile-picture"
          src={user?user.userImg:"https://via.placeholder.com/150x150"}
          alt="Profile"
        />
        </div>
        <div className="profile-header-info">
          <h1>{user?user.firstName+" "+user.lastName:""}</h1>
          {/* <p>{user.bio?user.bio:"..."}</p> */}
          <p>Hello there</p>
            <Button>subscribe</Button>
        </div>
          <div className="subs">
            <label htmlFor="subscribers">Subscribers:</label>
            <span>{user?user.subscribers:""}</span>
          </div>
          <div className="subs">
            <label htmlFor="subscribed">Subscribed:</label>
            <span>{user?user.subscribed:""}</span>
          </div>
      </div>
      <div className="profile-info">
        <h2>Profile videos</h2>
            <Home type="userVideos" userId={userId}/>
      </div>
    </div>
  );
};

export default UserProfile;
