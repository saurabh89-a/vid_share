import {React,useState,useEffect} from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago'
import { useSelector } from 'react-redux';


const Container=styled.div`
width:${(props)=>props.type!=="sm"&&"380px"};
margin-bottom:${(props)=>props.type==="sm" ? "10px" : "45px"};
cursor:pointer;
display:${(props)=>props.type==="sm"&&"flex"};
box-shadow: 0px 0px 8px #ccc;
padding: 5px;
border-radius: 8px;
gap:20px;
`
const Image=styled.img`
width:100%;
height:${(props)=>props.type==="sm"?"120px":"202px"};
background-color:#999;
transition: transform 0.3s ease-in-out;
flex:1;
&:hover {
      transform: scale(1.1);
    }
`

const Details=styled.div`
display:flex;
margin-top:${(props)=>props.type !=="sm"&&"16px"};
gap:12px;
flex:1;
`
const ChannelImage=styled.img`
width:50px;
height:50px;
border-radius:50%;
background:#999;
display:${(props)=>props.type==="sm"&&"none"};
`
const Texts=styled.div`
gap:5`;
const Title=styled.h1`
font-size:16px;
font-weight:500;
color:${({theme})=> theme.text};
`;
const ChannelName=styled.h5`
font-size:12px;

font-weight:400;
color:black;
margin:10px opx; 
`;
const Info=styled.div`
font-size:14px;
color:${({theme})=> theme.textSoft};

`;
const Card = ({type,video}) => {

    const currentUser=useSelector(state=>state.user.currentUser)[0];
    console.log(currentUser)

    const [videoSpec,setVideoSpec]=useState();
    const [user,setUser]=useState();

    useEffect(()=>{
        async function fetchData() {
            const userRes = await fetch(`/users/find/${video.postedByUser}`);
            const userjson = await userRes.json();
            setUser(userjson);

            const videospecRes=await fetch(`/videos/getspec/${video.idVideo}`)
            const videospecjson=await videospecRes.json();
            // console.log(videospecjson[0])
            setVideoSpec(videospecjson);
            // console.log(videoSpec)
            // console.log(video)
        } 
        fetchData();
    },[type])


    return (
       
        <Container type={type}>
        <Link to={`/video/${video.idVideo}`} style={{textDecoration:"none"}}>
            <Image type={type} src={video.vidImg}/></Link>         
        <Details type={type}>
            <Link exact to={currentUser.idUser===video.postedByUser?`http://localhost:3000/profile`:`http://localhost:3000/profile/${video.postedByUser}`}  style={{textDecoration:"none",color:"inherit"}} >
           <ChannelImage type={type} src={user?(user[0].userImg?user[0].userImg:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwq5BVdvAGuzlHOIAHC9O2RfC0R9Qoa9ReboFk1ud9sQ&"):""}/>
           </Link>
           <Texts>
            <Title>{video.videoTitle}</Title>
            <ChannelName>{user?user[0].firstName:" "} {user?user[0].lastName:" "}</ChannelName>
            <Info>{videoSpec?(videoSpec[0]?videoSpec[0].ViewCount:"..."):"..."} view ·<ReactTimeAgo date={video.CreateTime?video.CreateTime:"2023-03-29 16:07:54"}/></Info>
             </Texts>
            </Details>
        </Container>
        
      )
}
 
export default Card;