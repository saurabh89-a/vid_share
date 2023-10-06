import "../pages/home/home.css"
import React, { useState,useEffect } from 'react';
import { PlaylistCard } from "./PlaylistCard";


function Playlist() {

    const [playlists,setVideos]=useState([]);

    // useEffect(()=>{
    //     async function fetchData() {
    //         const res = await fetch(`http://localhost:8800/api/videos/${type}`,{credentials: 'include',});
    //         const json = await res.json();
    //         console.log(json)
    //         setVideos(json);
    //     }
    //     fetchData();
    // },[type])

    return (
        <div className="container">
            <PlaylistCard/>
            <PlaylistCard/>
            <PlaylistCard/>
            <PlaylistCard/>
            <PlaylistCard/>
            <PlaylistCard/>

        </div>
    );
}

export default Playlist;