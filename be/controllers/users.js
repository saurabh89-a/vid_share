import jwt from "jsonwebtoken";
import { db } from "../database.js";

export const getUser=(req,res)=>{

    const q="select * from user where idUser=?";
    db.query(q,[req.params.id],(err,data)=>{
        if(err)     return res.status(404).json(err)
        return res.status(200).json(data);
    })
}

export const updateUser=(req,res)=>{
    const token=req.cookies.access_token;
    if(!token)  return res.status(401).json("Login first to subscribe");

    jwt.verify(token,"jwtkey",(err,userInfo)=>{
        if(err) return res.status(403).json(err)
        console.log(req.params.id,userInfo.id)
        if(req.params.id == userInfo.id){
            const q="update User set firstName=?, lastName=?, emailID=?, gender=?, phone=?,userImg=? where idUser=?"

            const values=[req.body.firstName,req.body.lastName,req.body.emailID,req.body.gender,req.body.phone,req.body.userImg];

            db.query(q,[...values,userInfo.id],(err,data)=>{
                if(err) return res.status(403).json(err)
                const q2 = "SELECT * FROM user WHERE idUser = ?";
                db.query(q2, [userInfo.id], (err, result) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }

                const updatedUser = result[0];
                return res.status(200).json(updatedUser);
                });

            })
        }else{
            return res.status(403).json("You can only update your profile");
        }
    });
}

export const deleteUser=(req,res)=>{
    
}


export const subscribeUser=(req,res)=>{

    const token=req.cookies.access_token;
    if(!token)  return res.status(401).json("Login first to subscribe");

    jwt.verify(token,"jwtkey",(err,userInfo)=>{
        if(err) return res.status(403).json(err)

        const q="INSERT INTO Subscriber(`userId`, `subToId`, `createTime`) VALUES (?,NOW())"

        const subToId=req.params.id;
        const values=[userInfo.id,subToId];
        db.query(q,[values],(err,data)=>{
            if(err) return res.status(403).json(err);

            return res.status(200).json("subscribed..");
        })
    })

}


export const unsubscribeUser=(req,res)=>{
    
    const token=req.cookies.access_token;
    if(!token)  return res.status(401).json("Login first to unsubscribe");

    jwt.verify(token,"jwtkey",(err,userInfo)=>{
        if(err) return res.status(403).json(err)
        const subToId=req.params.id;

        const q="delete from Subscriber where userId=? and subToId=?"
        
        db.query(q,[userInfo.id,subToId],(err,data)=>{
            if(err) return res.status(403).json(err);

            return res.status(200).json("successfully unsubscribed..");
        })
    })
}



export const searchHistory=(req,res)=>{
    const token=req.cookies.access_token;
    if(!token)  return res.status(401).json("Login first to subscribe");

    jwt.verify(token,"jwtkey",(err,userInfo)=>{
        if(err) return res.status(403).json(err)
        console.log(req.params.id,userInfo.id)
        const q="select * from searchhistory where userId=?";
        db.query(q,[userInfo.id],(err,data)=>{
            if(err)     return res.status(404).json(err)
            return res.status(200).json(data);
    })
});
}

export const watchHistory=(req,res)=>{
    const token=req.cookies.access_token;
    if(!token)  return res.status(401).json("Login first to subscribe");

    jwt.verify(token,"jwtkey",(err,userInfo)=>{
        if(err) return res.status(403).json(err)
        console.log(req.params.id,userInfo.id)
        const q="select * from watchhistory where userId=?";
        db.query(q,[userInfo.id],(err,data)=>{
            if(err)     return res.status(404).json(err)
            return res.status(200).json(data);
    })
});
}

export const showplaylist=(req,res)=>{
        const token=req.cookies.access_token;
        if(!token)  return res.status(401).json("Login first to subscribe");
    
        jwt.verify(token,"jwtkey",(err,userInfo)=>{
            if(err) return res.status(403).json(err)
            console.log(req.params.id,userInfo.id)
            const q="select * from playlist where userId=(?)";
            db.query(q,[userInfo.id],(err,data)=>{
                if(err)     return res.status(404).json(err)
                return res.status(200).json(data);
        })
    });
}

export const addPlaylist=(req,res)=>{
    const token=req.cookies.access_token;
    if(!token)  return res.status(401).json("Login first to subscribe");

    jwt.verify(token,"jwtkey",(err,userInfo)=>{
        if(err) return res.status(403).json(err)
        console.log(req.body.playlistName,userInfo.id)
        const q="INSERT INTO `Playlist` (`playlistName`, `userID`) VALUE(?,?)";
            db.query(q,[req.body.playlistName,userInfo.id],(err,data)=>{
                if(err)     return res.status(404).json(err)
                return res.status(200).json(data);
        });
    })
}


//add to Watch later
export const addToWatchLater=(req,res)=>{
    const token=req.cookies.access_token
    
    if(!token)  return res.status(401).json("Plz login to add this");
    jwt.verify(token,"jwtkey",(err,data)=>{
        if(err) res.status(403).json("Token is not valid")
        const q="INSERT INTO `watchlater` (`userId`,`videoId`,`createTime` ) VALUES (?,NOW())";
        console.log("here")
        const values=[data.id,req.params.videoId];
        console.log(values);
        db.query(q,[values],(err,data)=>{
            if(err){
                console.error(err);
                return res.status(500).json("Internal server error");
            }
            console.log("Added to Watch Later");
            res.status(200).json("Added to watch created");
        });
    });
}


