import React from 'react'
import styled from 'styled-components'
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import  VideoCallOutLinedIcon  from "@mui/icons-material/VideoCallOutlined";
// import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const Container=styled.div`
position:sticky;
top:0;
opacity:1;
background-color:${(theme)=>theme.bgLighter};
background-color:whitesmoke;
height:56px;
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;
const Wrapper=styled.div
`display: flex;
align-items:center;
justify-content:flex-end;
height:100%;
padding:0px 20px;
position:relative;
 `;
const Search=styled.div`
width:40%;
position:absolute;
left:0px;
right:0px;
margin:auto;
display:flex;
align-items:center;
justify-content:space-between;
padding:5px;
border:1px solid #ccc;
border-radius:30px;
`
const Input=styled.input`
border:none;
background-color:transparent;
padding:10px;
width: -webkit-fill-available;
outline: none;
`
const NavRight=styled.div`
display:flex;
align-items:center;
gap:20px;
margin-right:20px
`

const User=styled.div`
display:flex;
align-items:center;
font-size:18px;
font-weight:500;
gap:5px;
margin-right:10px;
color:black;
`
const Avatar=styled.img`
width:36px;
height:36px;
border-radius:50%;
background-color:#999
`


const Button=styled.button`
 padding:5px 15px;
 background-color:transparent;
 border:1px solid #3ea6ff;
 color:#3ea6ff;
 border-radius:3px;
 font-weight:500;

 cursor:pointer;
 display:flex;
 align-items:center;
 gap:5px;
 `;
const Navbar = () => {
    const currentUser=useSelector(state=>state.user.currentUser)
    return (
        <>
       <Container>
        <Wrapper>
            <Search>
                <Input placeholder="Search"/>
                <SearchIcon />
            </Search>
            <NavRight>
            <Link to="videoUpload"><VideoCallOutLinedIcon style={{fontSize:30,height: 30,width:30}}/></Link> 
            <Link to="profile"> <User>
                
                    <Avatar src={currentUser[0].userImg?currentUser[0].userImg:"https://t4.ftcdn.net/jpg/04/08/24/43/360_F_408244382_Ex6k7k8XYzTbiXLNJgIL8gssebpLLBZQ.jpg"}/>
                    {currentUser[0].firstName}
                </User>
            </Link>
            </NavRight>
        </Wrapper>
       </Container>
       {/* {open && <Upload setOpen={setOpen}/>} */}
       </>
    );
};

export default Navbar;