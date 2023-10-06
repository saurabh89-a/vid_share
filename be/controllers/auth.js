import { db } from "../database.js";
import jwt from "jsonwebtoken";

export const register=(req,res)=>{
    
        //check if user exist or not 
        const q="select * from userauth where userName=?"

        db.query(q,[req.body.username],(err,data)=>{
            if(err) return res.json(err);
            if(data.length!=0) return res.status(409).json({error:"UserName Already exists"})
            const q="INSERT INTO `UserAuth` (`userName`, `password`) VALUES (?)"
            console.log(req.body.username,req.body.password)
            const values=[req.body.username,req.body.password]
            db.query(q,[values],(err,data)=>{
                if(err) return res.json({err:"Problem in insertion"});
            })
            console.log("UserAuth has been created");
            const q1="select idUserAuth from UserAuth where userName=?"


            db.query(q1,[req.body.username],(err,data)=>{
                 const q2="INSERT INTO `User` (`firstName`, `lastName`, `emailID`, `gender`, `phone`, `userAuthId`, `CreateTime`) VALUES (?,NOW())"
                 const val2=[req.body.firstName, req.body.lastName, req.body.email, 'M', req.body.phone,data[0].idUserAuth]
                 db.query(q2,[val2],(err,data)=>{
                     if(err)    return res.json({error:err})
                     console.log("User created")
                     return res.status(200).json({message:"User created successfully"})
                 })
            })
        })
}

export const login =(req,res)=>{
         //CHeck user
         const q="select * from userAuth where userName=?"

         db.query(q,[req.body.userName],(err,data)=>{
             if(err)    return res.json(err);
             if(data.length==0)  return res.status(404).json("User not found");
             // check the password 
             if(req.body.password!=data[0].password)    return res.status(400).json("Wrong username or password")

            
            const q1="select * from user where userAuthId=?"
            db.query(q1,[data[0].idUserAuth],(err,dt)=>{
                    const token=jwt.sign({id:dt[0].idUser},"jwtkey");
                    res.cookie("access_token",token,{
                        httpOnly:true,
                    }).status(200).json(dt)
            })
         })
}


export const logout =(req, res)=>{
    res.clearCookie("access_token",{
        sameSite:"none",
        secure:true
    }).status(200).json("User has been logged out");
}