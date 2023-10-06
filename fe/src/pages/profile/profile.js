import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../redux/userSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import  axios from "axios";
import "./Profile.css";
import { useLocation } from "react-router-dom";

const Profile = () => {

  const dispatch=useDispatch();
  const path=useLocation().pathname.split("/")[2];
  console.log(path)

  const currentUser=useSelector(state=>state.user.currentUser)[0]
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(currentUser.firstName);
  const [lastName,setLastName]= useState(currentUser.lastName);
  const [emailID, setEmailID] = useState(currentUser.emailID);
  const [phone, setPhone] = useState(currentUser.phone );
  const [subscribed,setSubscribed]=useState(10);
  const [gender,setGender]=useState("M");
  const [img,setImg]=useState();
  const [userImg,setUserImg]=useState(currentUser.userImg);
  const [subscribers,setSubscribers]=useState(10);
  const [bio, setBio] = useState(
    "Write something here to change the bio"
  );



  useEffect(()=>{
    if(img){
     const data = new FormData()
     data.append("file",img)
     data.append("upload_preset","vidShare")
     data.append("cloud_name","dpqtkwo1e")
     fetch("https://api.cloudinary.com/v1_1/dpqtkwo1e/image/upload",{
         method:"post",
         body:data
     })
     .then(res=>res.json())
     .then(async data=>{
        

      console.log('currentUser.idUser:', currentUser.idUser);
      console.log('firstName:', firstName);
      console.log('lastName:', lastName);
      console.log('emailID:', emailID);
      console.log('phone:', phone);
      console.log('gender:', gender);
      console.log('data.url:', data.url);
        setUserImg(data.url)
        console.log(userImg)

        // fetch(`http://localhost:8800/api/users/${currentUser.idUser}`,{
        //     method:"put",
        //     headers:{
        //         "Content-Type":"application/json",
        //     },credentials: 'include',
        //     body:JSON.stringify({
        //         firstName,lastName,emailID,phone,gender,userImg
        //     })
        // })
        const res = await axios.put(
          `http://localhost:8800/api/users/${currentUser.idUser}`,
          {firstName:firstName, lastName:lastName, emailID:emailID, phone:phone, gender:gender, userImg:data.url},
          { headers: {'Content-type':'application/json'}, withCredentials: true },
      );

      console.log(res.data)

     })
     .catch(err=>{
         console.log(err)
     })
    }
 },[img])
  

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if(userImg)
    {
      const res = await axios.put(
        `http://localhost:8800/api/users/${currentUser.idUser}`,
        {firstName:firstName, lastName:lastName, emailID:emailID, phone:phone, gender:gender, userImg:userImg
        },
        { headers: {'Content-type':'application/json'}, withCredentials: true },
      );
    // console.log(res.data);
    toast.success('Profile Updated', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
      dispatch(updateProfile(res.data));
      setIsEditing(false);
    }else{
      toast.success('Wait till Image gets uploaded', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const updatePhoto = (file)=>{
    setImg(file)
}

  return (
    <div className="profile">
      <div className="profile-header">
      <div>
        <img
          className="profile-picture"
          src={userImg?`${userImg}`:"https://via.placeholder.com/150x150"}
          alt="Profile"
        />
        {isEditing ? (
          <div>
            <input type="file" accept="image/*" onChange={(e)=>updatePhoto(e.target.files[0])} />
        </div>
          ):""}
        
        </div>
        <div className="profile-header-info">
          <h1>{firstName}</h1>
          <button className="edit-button" onClick={handleEdit}>
            Edit Profile
          </button>
        </div>
          <div className="subs">
            <label htmlFor="subscribers">Subscribers:</label>
            <span>{currentUser.subscribers}</span>
          </div>
          <div className="subs">
            <label htmlFor="subscribed">Subscribed:</label>
            <span>{currentUser.subscribed}</span>
          </div>
      </div>
      <div className="profile-info">
        <h2>Profile Information</h2>
        <div className="profile-info-item">
          <label htmlFor="name">First Name</label>
          {isEditing ? (
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          ) : (
            <input type="text" id="firstName" value={firstName} readOnly />
          )}
        </div>
        <div className="profile-info-item">
          <label htmlFor="lastName">Last Name</label>
          {isEditing ? (
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          ) : (
            <input type="text" id="lastName" value={lastName} readOnly />
          )}
        </div>
        <div className="profile-info-item">
          <label htmlFor="emailID">Email</label>
          {isEditing ? (
            <input
              type="text"
              id="emailID"
              value={emailID}
              onChange={(e) => setEmailID(e.target.value)}
            />
          ) : (
            <input type="email" id="emailID" value={emailID} readOnly />
          )}
        </div>
        <div className="profile-info-item">
          <label htmlFor="phone">Phone</label>
          {isEditing ? (
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          ) : (
            <input type="tel" id="phone" value={phone} readOnly />
          )}
        </div>
        <div className="profile-info-item">
          <label htmlFor="bio">Bio</label>
          {isEditing ? (
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          ) : (
            <textarea id="bio" value={bio} readOnly />
          )}
        </div>
        {isEditing && (
          <div className="profile-info-buttons">
            <button className="save-button" onClick={handleSave}>
              Save
            </button>
            <button className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
