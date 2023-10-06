import jwt from "jsonwebtoken";

import { db } from "../database.js"

export const getComments=(req,res)=>{
    const q="select * from comment where videoId=?";
    db.query(q,[req.params.id],(err,data)=>{
        if(err)     return res.status(404).json(err)
        return res.status(200).json(data);
    })
}

export const addComment=(req,res)=>{
    const token=req.cookies.access_token
    const cont=req.body.text;
    if(!token)  return res.status(401).json("Plz login to Comment on the Video");
    jwt.verify(token,"jwtkey",(err,data)=>{
        if(err) res.status(403).json("Token is not valid")
        const q="INSERT INTO `comment` (`userId`,`videoId`,`content`,`CreateTime` ) VALUES (?,NOW())";
        console.log("here")
        const values=[data.id,req.query.videoId,cont];
        console.log(values);
        db.query(q,[values],(err,data)=>{
            if(err){
                console.error(err);
                return res.status(500).json("Internal server error");
            }
            console.log("Comment Added");
            res.status(200).json("Comment added");
        });
    });


}