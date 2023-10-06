import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';

const Container = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: whitesmoke;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 800px;
  height: 800px;
  background-color: whitesmoke;
  color: black;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;

const Title = styled.h1`
  text-align: center;
`;

const Input = styled.input`
  border: 1px solid #f5f5f5;
  color: black;
  border-radius: 3px;
  padding: 10px;
  background-color: white;
  z-index: 999;
`;

const Desc = styled.textarea`
  border: 1px solid #f5f5f5;
  color: black;
  border-radius: 3px;
  padding: 10px;
  background-color: white;
`;


const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: tomato;
  color: black;
`;
const Label = styled.label`
  font-size: 14px;
  font-style:bold;
`;



const Upload = () => {
    const [img,setImg]=useState();
    const [imgUrl,setImgUrl]=useState();
    const [video,setVideo]=useState();
    const [videoUrl,setVideoUrl]=useState();
    const [title,setTitle]=useState();
    const [desc,setDesc]=useState();

    const options = [
      { value: 'music', label: 'Music' },
      { value: 'sports', label: 'Sports' },
      { value: 'gaming', label: 'Gaming' },
      { value: 'movie', label:'Movie'},
      { value: 'news', label: 'News' },
      { value: 'lifestyle', label: 'Lifestyle' }
    ]

    const [selectedOption, setSelectedOption] = useState(null);
    const handleChange = (e) => {
      setSelectedOption(e['value']);
      console.log(`Option selected:`, selectedOption);
    };



    const navigate=useNavigate();
    const currentUser=useSelector(state=>state.user.currentUser)[0]
   useEffect(() => {
    if(video){
      const data = new FormData()
      data.append("file",video)
      data.append("upload_preset","vidShare")
      data.append("cloud_name","dpqtkwo1e")
      fetch("https://api.cloudinary.com/v1_1/dpqtkwo1e/video/upload",{
          method:"post",
          body:data
      })
      .then(res=>res.json("Video Uploaded"))
      .then(async data=>{
        setVideoUrl(data.url)
        toast.success('Video Uploaded', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
      }).then();
   }}, [video]);

   useEffect(() => {
    if(img){
      const data = new FormData()
      data.append("file",img)
      data.append("upload_preset","vidShare")
      data.append("cloud_name","dpqtkwo1e")
      fetch("https://api.cloudinary.com/v1_1/dpqtkwo1e/image/upload",{
          method:"post",
          body:data
      })
      .then(res=>res.json("Image Uploaded"))
      .then(async data=>{
        setImgUrl(data.url)
        toast.success('Thumbnail Uploaded', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
      });
      
   }}, [img]);

   const upload=async()=>{

    if(imgUrl && videoUrl)
    {
      const res = await axios.post(
      `http://localhost:8800/api/videos/`,
      {videoTitle:title, videoDesc:desc, videoUrl:videoUrl, vidImg:imgUrl,tag:selectedOption},
      { headers: {'Content-type':'application/json'}, withCredentials: true },);
      console.log(res.data)
      window.location = `/video/${res.data}`;
    }else{
      toast.error('Wait till video and thumbnail gets uploaded', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
   }

    return(
        <>
        <Container>
           <Wrapper>
           <Title>Upload a New Video</Title>
                <Label>Video:</Label>
                <Input type="file" accept="video/*" onChange={(e) => setVideo(e.target.files[0])}/>
                <Label>Thumbnail:</Label>
                <Input type="file" accept="image/*" onChange={(e) => setImg(e.target.files[0])}/>
                <Input type="text" placeholder="Title" name="title" onChange={(e) => setTitle(e.target.value)} />
                <Desc placeholder="Description" name="desc" rows={8} onChange={(e)=>setDesc(e.target.value)} />
                <Select  placeholder="Select a tag.." value={selectedOption}
                    onChange={handleChange}
                    options={options} />
                {/* <Input type="text" placeholder="Separate the tags with commas." onChance={handleTags} /> */}
                
                
                <Button onClick={upload}>Upload</Button>
           </Wrapper>
           </Container>
        </>
    );

}

export default Upload;