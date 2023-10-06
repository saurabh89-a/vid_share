 //import react from "react"
 import styled from "styled-components";
 import HomeIcon from '@mui/icons-material/Home';
//  import ExploreIcon from '@mui/icons-material/Explore';
 import SubscriptionsIcon from '@mui/icons-material/Subscriptions'; 
 import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
 import HistoryIcon from '@mui/icons-material/History';
 import MusicVideoIcon from '@mui/icons-material/MusicVideo';
 import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
 import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
 import MovieIcon from '@mui/icons-material/Movie';
 import ArticleIcon from '@mui/icons-material/Article';
 import LiveTvIcon from '@mui/icons-material/LiveTv';
 import SettingsIcon from '@mui/icons-material/Settings';
 import FlagIcon from '@mui/icons-material/Flag';
 import { WatchLaterOutlined } from '@mui/icons-material';
 import HelpIcon from '@mui/icons-material/Help';
 import { Link } from "react-router-dom";
 
 const Container=styled.div`
 flex:1;
 background-color:${(theme)=>theme.bgLighter};
 height:100vh;
   
 color:${({theme})=>theme.text};
 font-size:14px;
 position:sticky;
 top:0;

 `
 const Wrapper=styled.div`
 padding:18px 26px;
 `;
 const Logo=styled.div`
 display:flex;
 align-items:center;
 gap:20px;
 font-weight:bold;
 margin-bottom:25px;
 `;
 const LogoTitle=styled.span`
    font-family: 'Pacifico', cursive;
    font-size: 25px;
    font-weight: 500;
    color: tomato;
 `;

 const Item=styled.div`
 display:flex;
 align-items:center;
 gap:20px;
 cursor:pointer;
 padding:7.5px 0px;
 &:hover{
    background-color:#f5f5f5;
 }
 `;
 const Hr=styled.hr`
 margin:15px 0px;
 border:0.5px solid ${({theme})=>theme.soft};
 `
//  const Login=styled.div``;
//  const Button=styled.button`
//  padding:5px 15px;
//  background-color:transparent;
//  border:1px solid #3ea6ff;
//  color:#3ea6ff;
//  border-radius:3px;
//  font-weight:500;
//  margin-top:10px;
//  cursor:pointer;
//  display:flex;
//  align-items:center;
//  gap:5px;
//  `;
 const Title=styled.h2`
 font-size:14px;
 font-weight:500;
 color:#aaaaaa;
 margin-bottom:20px;
 `
 
const Menu=()=>{

    const logout=()=>{
            fetch('http://localhost:8800/api/auths/logout', {
              method: 'POST',
              credentials: 'include'
            })
            .then(response => {
              if (response.ok) {
                // Localstorage.clear();
                window.location = '/login'; // Navigate to login page
              } else {
                console.log('Error logging out');
              }
            })
            .catch(error => {
              console.error('Error logging out:', error);
            });
          
    }


    return(
        <Container>
            <Wrapper>
            <Link to="/" style={{textDecoration:"none",color:"inherit"}}>
                <Logo>
                    <LogoTitle>VidShare</LogoTitle>
                    
                </Logo>
                </Link>
                <Link to="/" style={{textDecoration:"none",color:"inherit"}}>
                    <Item>
                        <HomeIcon />
                        Home 
                    </Item>
                </Link>

                <Link to="trends" style={{textDecoration:"none",color:"inherit"}}>
                    <Item>
                    <SubscriptionsIcon />
                        Trending
                    </Item>
                </Link> 
                <Link to="subscriptions" style={{textDecoration:"none",color:"inherit"}}>
                    <Item>
                    <SubscriptionsIcon />
                    Subscriptions 
                    </Item>
                </Link>
                <Hr/>
                <Link to="watchlater" style={{textDecoration:"none",color:"inherit"}}>
                    <Item>
                    <WatchLaterOutlined/>
                        Watch Later
                    </Item>
                </Link>
                <Link to="playlist" style={{textDecoration:"none",color:"inherit"}}>
                    <Item>
                        <VideoLibraryIcon />
                        Playlist
                    </Item>
                </Link>
                <Item>
                    <HistoryIcon/>
                     History
                </Item>
                
                <Hr/>
                <Title>BEST OF VIDSHARE</Title>
                <Link to="music" style={{textDecoration:"none",color:"inherit"}}>
                    <Item>
                        <MusicVideoIcon />
                         Music
                    </Item>
                </Link>
                <Link to="sports" style={{textDecoration:"none",color:"inherit"}}>
                    <Item>
                        <SportsBasketballIcon/>
                        Sports
                    </Item>
                </Link>
                <Link to="gaming" style={{textDecoration:"none",color:"inherit"}}>

                <Item>
                    <SportsEsportsIcon/>
                     Gaming
                </Item>
                </Link>
                <Link to="movies" style={{textDecoration:"none",color:"inherit"}}>
                <Item>
                    <MovieIcon />
                     Movies
                </Item>
                </Link>
                <Link to="news" style={{textDecoration:"none",color:"inherit"}}>
                <Item>
                    <ArticleIcon/>
                    News
                </Item>
                </Link>
                <Link to="lifestyle" style={{textDecoration:"none",color:"inherit"}}>
                <Item>
                    <LiveTvIcon/>
                     Lifestyle
                </Item>
                </Link>
                <Hr/>
                <Item onClick={logout}>
                    <SettingsIcon />
                     Logout
                </Item>
                       <Item>
                    <FlagIcon />
                     Report
                </Item>
                <Item>
                    <HelpIcon/>
                     Help
                </Item>
                
            </Wrapper>
        </Container>
    );
};
export default Menu