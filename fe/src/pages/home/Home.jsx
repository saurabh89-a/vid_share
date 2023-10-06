import React, { useState,useEffect } from 'react';
import Card from "../../components/Card";
import "./home.css"

const Home = ({type,userId}) => {

   const [videos,setVideos]=useState([]);

   useEffect(()=>{
      async function fetchData() {
         const res = await fetch(`http://localhost:8800/api/videos/${type}`,{credentials: 'include',});
         const json = await res.json();
         console.log(json)
         setVideos(json);
       }

       async function fetchData2(){
         const res = await fetch(`http://localhost:8800/api/videos/${userId}`,{credentials: 'include',});
         const json = await res.json();
         console.log(json)
         setVideos(json);
       }
       if(userId){
         fetchData2();
       }else{
         fetchData();
       }
       
   },[type])

    return (
       <div className='container'>
       {videos.map(video=>{
         return <Card key={video.idVideo} video={video}/>
       })}
          
          
       </div>
    );
};

export default Home;