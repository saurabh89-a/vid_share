import React from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ReplyIcon from '@mui/icons-material/Reply';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import Comments from '../../components/Comments';
// import Card from "../../components/Card";
import "./video.css";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';


const Video = () => {
    const currentUser=useSelector(state=>state.user.currentUser)[0]
    const path=useLocation().pathname.split("/")[2];
    const [video,setVideo]=useState({});
    const [videoSpec,setVideoSpec]=useState({});
    const [user,setUser]=useState({})
    const [subs,setSubs]=useState(false);
    const [likeButton,setLikeButton]=useState(true);
    const [watchlaterbutton,setWatchlaterButton]=useState(false);
    const [formattedDate,setFormattedDate]=useState();
    useEffect(()=>{
        const fetchData=async()=>{
            try {
                console.log(" currentUser", currentUser.idUser);
                axios.get(`http://localhost:8800/api/videos/getspec/${path}`)
                .then((videoSpecRes)=>{
                  setVideoSpec(videoSpecRes.data[0]);
                })

                axios.get(`http://localhost:8800/api/users/iswatchlater?userId=${currentUser.idUser}&videoId=${path}`)
                .then((watchlaterres)=>{
                  // console.log(watchlaterres)
                  setWatchlaterButton(watchlaterres.data.isWatchlater)
                  // console.log(watchlaterbutton)
                }).catch((err)=>{
                    console.log(err)
                });



                
                axios.get(`http://localhost:8800/api/videos/isliked?userId=${currentUser.idUser}&videoId=${path}`)
                .then((res) => {
                  const isLiked = res.data.isLiked === "true";
                  console.log(res.data.isLiked)
                  setLikeButton(res.data.isLiked)
                  
                })
                .catch((err) => {
                  console.log(err);
                });





                axios.post(`http://localhost:8800/api/videos/viewed/${path}`,{},
                {
                  headers: { 'Content-Type': 'application/json' },
                  withCredentials: true,
                })
                .then((viewres)=>{
                    // console.log("view recorded")
                }
                )

                axios.get(`/videos/find/${path}`)
                  .then((videoRes) => {
                    setVideo(videoRes.data[0]);


                    const dt = new Date(video.CreateTime * 1000); // Convert timestamp to milliseconds
                    // const dt = new Date(Date.parse(video.CreateTime));
                    const options = { day: 'numeric', month: 'long', year: 'numeric' };
                    setFormattedDate(dt.toLocaleDateString('en-US', options));

                    return axios.get(`/users/find/${videoRes.data[0].postedByUser}`);
                  })
                  .then((userRes) => {
                    setUser(userRes.data[0]);
                    // console.log("videoUser", userRes.data[0].idUser);
                    return axios.get(`http://localhost:8800/api/users/subs?userId=${currentUser.idUser}&subToId=${userRes.data[0].idUser}`)
                  })
                  .then((subsRes) => {
                    // console.log(subsRes.data.subscribed);
                    setSubs(subsRes.data.subscribed)
                    // console.log("subscribed or not",subs)

                  })
                  .catch((err) => {
                    console.error(err);
                  });
              } catch (err) {
                console.error(err);
              }


        }

        fetchData();
    },[path])


    console.log(likeButton);

    const subscribe = async () => {
        try {
          const response = await axios.post(
            `http://localhost:8800/api/users/sub/${user.idUser}`,
            {},
            {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true,
            }
          );
          // console.log(response.data);  for debugging purposes
          setSubs(true);
        } catch (error) {
          console.error(error);
        }
      };
      

      const unsubscribe=async()=>{
        axios.delete(`http://localhost:8800/api/users/sub/${user.idUser}`, { 
            headers: {'Content-type':'application/json'}, 
            withCredentials: true 
            })
            .then(res => {
            const data = res.data;
            // console.log(data);
            setSubs(false);
            })
            .catch(error => {
            console.error(error);
            });
      }
      
      const watchlater=async()=>{
        axios.post(`http://localhost:8800/api/users/addToWatchLater/${path}`,{},
                {
                  headers: { 'Content-Type': 'application/json' },
                  withCredentials: true,
                })
                .then((viewres)=>{
                    setWatchlaterButton(true); 
                    console.log("Added to watch Later")
                }
                )
      }

      const removewatchlater=async()=>{
        
        axios.delete(`http://localhost:8800/api/users/addToWatchLater/${path}`, { 
          headers: {'Content-type':'application/json'}, 
          withCredentials: true 
          })
          .then(res => {
          const data = res.data;
          console.log(data);
          setWatchlaterButton(false);
          })
          .catch(error => {
          console.error(error);
          });
      }

      const like=async()=>{
        axios.post(`http://localhost:8800/api/videos/like/${path}`,{},
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        })
        .then((likeres)=>{
            setLikeButton(true); 
            console.log("Like Registered")
        }
        )
      }

      const unlike=async()=>{
        axios.delete(`http://localhost:8800/api/videos/like/${path}`, { 
          headers: {'Content-type':'application/json'}, 
          withCredentials: true 
          })
          .then(res => {
          const data = res.data;
          console.log("video unliked");
          setLikeButton(false);
          })
          .catch(error => {
          console.error(error);
          });
      }

    return (
        <div className='container'>
            <div className='content'><div className ='VideoWrappper'>
                <iframe
                    width="100%"
                    height="720px"
                    src={video.videoUrl}
                    title="VidShare video player"
                    allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture"
                    allowFullScreen
                    >
                </iframe>
                </div>
                <h1 className='title'>{video.videoTitle}</h1>
                <p className='description'>{video.videoDesc} </p>
                <div className='details'>
                    <span className='info'>{videoSpec.ViewCount} views· {formattedDate}</span>
                    <div className='buttons'>
                      
                        <div className='button'>{!likeButton?<ThumbUpIcon onClick={like}/>:<ThumbUpIcon onClick={unlike} style={{color:"tomato"}}/>} {videoSpec.likeCount} </div>
                        <div className='button'><ReplyIcon/>Share</div>
                        {watchlaterbutton?
                          <div className='button' onClick={removewatchlater}><LibraryAddIcon style={{color:"tomato"}}/>remove</div>
                          :
                          <div className='button' onClick={watchlater}><LibraryAddIcon/>save</div>
                        }
                    </div>
                </div>
                <hr className='hr'/>
                <div className='channel'>
                    <div className='channelInfo'>
                        <img className='image' alt="" src={user.userImg}/>
                        <div className='channelDetail'>
                         <span className='channelName'>{user.firstName} {user.lastName}</span>
                         <span className='channelCounter'>{user.subscribers} subscribers </span>
                         <p className='description'> Like and subscribe </p>
                        </div>
                        
                        {subs ? (
                            <button className="subscribe" onClick={unsubscribe}>
                            UNSUBSCRIBE
                            </button>
                        ) : (
                            <button className="subscribe" onClick={subscribe}>
                            SUBSCRIBE
                            </button>
                        )}
                        </div>
                </div>
                <hr className='hr'/>
                <Comments videoId={path}/>
                </div>
        </div>
    );
};

export default Video;