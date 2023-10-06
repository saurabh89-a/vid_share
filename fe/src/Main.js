import styled from "styled-components";
import Menu from"./components/Menu";
import Navbar from"./components/Navbar";
import { ThemeProvider } from 'react-ui'
import React from "react";
import {  Routes, Route } from "react-router-dom";


import Home from "./pages/home/Home";
import Video from "./pages/Video/Video";
import Profile from "./pages/profile/profile";
import Upload from "./components/VideoUpload";
import Playlist from "./components/Playlist";
import UserProfile from "./pages/profile/userProfile";
const Container=styled.div`
display:flex;
`;
const Hero=styled.div`
flex:7; 
background-color:${({theme})=>theme.bg};
`;
const Wrapper= styled.div`
    padding: 20px;
    height: 100%;
`;


const Main=()=>{
  return (
    <ThemeProvider >
    <Container>
      <Menu />
        <Hero>
          <Navbar/>
          <Wrapper>
            <Routes>
              <Route path="*">
              <Route index element={<Home type="random"/>}/>
              <Route path="trends" element={<Home type="trend"/>}/>
              <Route path="subscriptions" element={<Home type=""/>}/>
              <Route path="watchlater" element={<Home type="watchlater"/>}/>
              <Route path="music" element={<Home type="music"/>}/>
              <Route path="sports" element={<Home type="sports"/>}/>
              <Route path="gaming" element={<Home type="gaming"/>}/>
              <Route path="movie" element={<Home type="movie"/>}/>
              <Route path="news" element={<Home type="news"/>}/>
              <Route path="lifestyle" element={<Home type="lifestyle"/>}/>
              <Route path="watchhistory" element={<Home type="watchhistory"/>}/>


              <Route path="playlist" element={<Playlist/>}/>
              <Route path="profile" element={<Profile/>}/>
              <Route path="profile/:id" element={<UserProfile/>}/>
              <Route path="videoUpload" element={<Upload/>}/>

              {/* <Route path="signup" element={<Register/>}/>
              <Route path="login" element={<Login/>}/> */}
              <Route path="video">
                <Route path=":id" element={<Video/>}/>
              </Route>
              </Route>
            </Routes>
            </Wrapper>
      </Hero>
    </Container>
    </ThemeProvider>
  );
}

export default Main;