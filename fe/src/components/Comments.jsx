
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Comment from './Comment';

const Container =styled.div`
  margin-top:10px
`;
const NewComment =styled.div`
display:flex;
align-item:center;
gap:10px;
`
const Avatar=styled.img`
width:50px;
height:50px;
border-radius:50%`;
const Input=styled.input`
border:none;
border-bottom:1px solid ${({theme})=>theme.soft};
background-color:transparent;  
padding:5px;
width:100%;
`;

const Comments=({videoId})=>{
  
    const currentUser=useSelector(state=>state.user.currentUser)[0]
    const [comments,setComments]=useState([])
    const [text,setText]=useState();
    const [commentAdded,setCommentAdded]=useState();
    // console.log("videoId" ,videoId)
    useEffect(()=>{
      const fetchComments=async()=>{
        axios.get(`http://localhost:8800/api/comments/${videoId}`)
        .then((res)=>{
            console.log("comments",res)
            setComments(res.data)
            console.log(comments)
        })
      }
      // console.log(NOW())

      fetchComments();
    },[videoId,commentAdded])

    const handleKeyDown=(event)=>{
      if (event.key === "Enter") {
          event.preventDefault();
          axios.post(`/comments/add?videoId=${videoId}`,{text},{withCredentials:true})
          .then((res)=>{
            console.log(res);
            setCommentAdded(res);
            setText("")
          })
        }
    }

    return(
        <Container>
            <NewComment>
                <Avatar src={currentUser?currentUser.userImg:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwq5BVdvAGuzlHOIAHC9O2RfC0R9Qoa9ReboFk1ud9sQ&s"} />
                <Input placeholder='Add a comment...'  
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                    onKeyDown={handleKeyDown}/>
            </NewComment>

            {comments.map((data)=>(
              <Comment key={data.idComment} data={data}/>)
            )}
            {/* <Comment/>
            <Comment/>
            <Comment/>
            <Comment/>
            <Comment/> */}
        </Container>
    )
}
export default Comments;