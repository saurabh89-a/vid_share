import jwt from "jsonwebtoken";

import { db } from "../database.js"


export const subscribed=(req,res)=>{
    const token=req.cookies.access_token

    if(!token)  return res.status(401).json("Not Authenticated")

    jwt.verify(token,"jwtkey",(err,userInfo)=>{
        if(err) return res.status(403).json(err)
        const q="SELECT subscriber.userId,u2.firstName as subscribed_to_name,subscriber.createTime,subscriber.subToId as subscribedto_id FROM subscriber JOIN user as u1  join user as u2 on u1.idUser=subscriber.userId and  subscriber.subToId=u2.idUser WHERE u1.idUser=? ORDER BY createTime ASC;"
        db.query(q,[userInfo.id],(err,data)=>{
            if(err)     return res.status(404).json(err)
            return res.status(200).json(data);
        })
    })
}

export const subscribers=(req,res)=>{
    const token=req.cookies.access_token

    if(!token)  return res.status(401).json("Not Authenticated")

    jwt.verify(token,"jwtkey",(err,userInfo)=>{
        if(err) return res.status(403).json(err)
        console.log(userInfo.id)
        const q="SELECT distinct user.firstName,user.idUser FROM subscriber JOIN user on user.idUser=subscriber.userId WHERE subscriber.subToId=? ;"
        db.query(q,[userInfo.id],(err,data)=>{
            if(err)     return res.status(404).json(err)
            return res.status(200).json(data);
        })
    })
}
export const subcheck = (req, res) => {
    const { userId, subToId } = req.query;
    // console.log(userId,subToId);
    const q = "SELECT * FROM subscriber WHERE userId = ? AND subToId = ?";
    db.query(q, [userId, subToId], (err, data) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (data.length === 0) {
        return res.status(200).json({ subscribed: false });
      } else {
        return res.status(200).json({ subscribed: true });
      }
    });
  };
  

export const isWatchLater=(req,res)=>{
  const { userId, videoId } = req.query;
  // console.log(userId,videoId);
  const q = "SELECT * FROM watchlater WHERE userId = ? AND videoId = ?";
  db.query(q, [userId, videoId], (err, data) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (data.length === 0) {
      return res.status(200).json({ isWatchlater: false });
    } else {
      return res.status(200).json({ isWatchlater: true });
    }
  });
} 

export const removeWatchLater=(req,res)=>{    
    const token=req.cookies.access_token;
    if(!token)  return res.status(401).json("Login first to remove from watch later");

    jwt.verify(token,"jwtkey",(err,userInfo)=>{
        if(err) return res.status(403).json(err)
        const videoId=req.params.videoId;

        const q="delete from watchlater where userId=? and videoId=?"
        
        db.query(q,[userInfo.id,videoId],(err,data)=>{
            if(err) return res.status(403).json(err);

            return res.status(200).json("successfully removed watch later..");
        })
    })

}