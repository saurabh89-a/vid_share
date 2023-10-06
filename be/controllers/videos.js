import jwt from "jsonwebtoken";

import { db } from "../database.js"


export const random=(req,res)=>{
    const q="SELECT * FROM Video ORDER BY RAND() LIMIT 12"
    db.query(q,(err,data)=>{
    if(err) return res.status(403).json(err)
    return res.json(data);
    })
}




export const trend=(req,res)=>{
    const q="SELECT v.* FROM Video v INNER JOIN VideoSpecCount s ON v.idVideo = s.idVideoSpecCount ORDER BY s.ViewCount DESC LIMIT 12";
    db.query(q,(err,data)=>{
    if(err){
        console.log(err)   
        return res.status(403).json(err)
    }
    return res.json(data);
    })
}

export const music=(req,res)=>{
    const q=`SELECT * FROM Video WHERE tag="music" ORDER BY RAND() LIMIT 12`;
    db.query(q,(err,data)=>{
    if(err){
        console.log(err)   
        return res.status(403).json(err)
    }
    return res.json(data);
    })
}

export const sports=(req,res)=>{
    const q=`SELECT * FROM Video WHERE tag="sports" ORDER BY RAND() LIMIT 12`;
    db.query(q,(err,data)=>{
    if(err){
        console.log(err)   
        return res.status(403).json(err)
    }
    return res.json(data);
    })
}

export const gaming=(req,res)=>{
    const q=`SELECT * FROM Video WHERE tag="gaming" ORDER BY RAND() LIMIT 12`;
    db.query(q,(err,data)=>{
    if(err){
        console.log(err)   
        return res.status(403).json(err)
    }
    return res.json(data);
    })
}

export const movie=(req,res)=>{
    const q=`SELECT * FROM Video WHERE tag="movie" ORDER BY RAND() LIMIT 12`;
    db.query(q,(err,data)=>{
    if(err){
        console.log(err)   
        return res.status(403).json(err)
    }
    return res.json(data);
    })
}


export const news=(req,res)=>{
    const q=`SELECT * FROM Video WHERE tag="news" ORDER BY RAND() LIMIT 12`;
    db.query(q,(err,data)=>{
    if(err){
        console.log(err)   
        return res.status(403).json(err)
    }
    return res.json(data);
    })
}


export const lifestyle=(req,res)=>{
    const q=`SELECT * FROM Video WHERE tag="lifestyle" ORDER BY RAND() LIMIT 12`;
    db.query(q,(err,data)=>{
    if(err){
        console.log(err)   
        return res.status(403).json(err)
    }
    return res.json(data);
    })
}




export const watchhistory=(req,res)=>{
    const q=`SELECT * FROM Video WHERE tag="sports" ORDER BY RAND() LIMIT 12`;
    db.query(q,(err,data)=>{
    if(err){
        console.log(err)   
        return res.status(403).json(err)
    }
    return res.json(data);
    })
}





export const getVideos=(req,res)=>{
    const token=req.cookies.access_token

    if(!token)  return res.status(401).json("Not authenticated");
    jwt.verify(token,"jwtkey",(err,userIdInfo)=>{
        if(err) res.status(403).json("Token is not valid")
        // const q="select distinct * from user as u1 join subscriber as sub on  u1.idUser=sub.userId join user as u2 on sub.subToID=u2.idUser where u1.idUser=?";

        const q="select distinct v.*  from user as u1 join subscriber as subs on u1.idUser=subs.userId join user as u2 on subs.subToID=u2.idUser join video as v on subs.subToID=v.postedByUser where u1.idUser=? order by v.createTime DESC;"

        db.query(q,[userIdInfo.id],(err,data)=>{
            if(err){
                console.log(err)
                return res.status(403).json(err)
            }
            return res.json(data);
        })
    })    
}


export const getVideo=(req,res)=>{
    const q="select video.* from Video join user on Video.postedByUser=User.idUser where postedByUser=?"
    db.query(q,[req.params.id],(err,data)=>{
        if(err) return res.json(err)
        return res.status(200).json(data);
    })
}

export const getUserVideos=(req,res)=>{
    const q="select * from Video where postedByUser=?"
    db.query(q,[req.params.id],(err,data)=>{
        if(err) return res.json(err)
        return res.status(200).json(data);
    })
}


export const getVideoData=(req,res)=>{

    const q="select * from video where idVideo=?";
    db.query(q,[req.params.id],(err,data)=>{
        if(err)     return res.status(404).json(err)
        return res.status(200).json(data);
    })
}

//Get videoSpec

export const getVideoSpecData=(req,res)=>{

    const q="select * from videoSpecCount where idVideoSpecCount=?";
    db.query(q,[req.params.id],(err,data)=>{
        if(err)     return res.status(404).json(err)
        return res.status(200).json(data);
    })
}


//post a view

export const viewed=(req,res)=>{
    const token=req.cookies.access_token
    
    if(!token)  return res.status(401).json("Plz login to watch");
    jwt.verify(token,"jwtkey",(err,data)=>{
        if(err) res.status(403).json("Token is not valid")
        const q="INSERT INTO `videoView` (`user_id`,`video_id`,`createTime` ) VALUES (?,NOW())";
        console.log("here")
        const values=[data.id,req.params.videoId];
        console.log(values);
        db.query(q,[values],(err,data)=>{
            if(err){
                console.error(err);
                return res.status(500).json("Internal server error");
            }
            console.log("View Counted");
            res.status(200).json("View created");
        });
    });
}

export const addVideo=(req,res)=>{
    const token=req.cookies.access_token
    
    if(!token)  return res.status(401).json("Plz login before uploading");
    jwt.verify(token,"jwtkey",(err,data)=>{
        if(err) res.status(403).json("Token is not valid")
        const q="INSERT INTO `Video` (`videoTitle`, `videoDesc`, `videoUrl`,`vidImg`,`tag`, `postedByUser`, `createTime`) VALUES (?,NOW())";
        const values=[req.body.videoTitle,req.body.videoDesc,req.body.videoUrl,req.body.vidImg,req.body.tag,data.id];
        console.log("here")
        db.query(q,[values],(err,data1)=>{
            if(err) {
                console.error("Error while adding video:", err);
                return res.status(500).json("Internal server error");
            } 
            console.log("Video added successfully:", data1[0]);
            return res.json(data1.insertId);
        });        
    })
}

export const deleteVideo=(req,res)=>{
    const token=req.cookies.access_token
    if(!token)  return res.status(401).json("Please login first");

    jwt.verify(token,"jwtkey",(err,userInfo)=>{
        if(err) return res.status(403).json(err)

        const videoId=req.params.id;
        const q="delete from video where idVideo=? and postedByUser=?"
        db.query(q,[videoId,userInfo.id],(err,data)=>{
            if(err) return res.status(403).json(err);

            return res.json("Video deleted!")
        })
    })
}


export const updateVideo=(req,res)=>{
    const token=req.cookies.access_token;
    if(!token)  return res.status(401).json("Login first to subscribe");

    jwt.verify(token,"jwtkey",(err,userInfo)=>{
        if(err) return res.status(403).json(err)
        const q="select postedByUser from video where idVideo=?";

        db.query(q,[req.params.id],(err,data)=>{
            if(err)     res.status(403).json(err);

            console.log(data[0].postedByUser);
            if(data[0].postedByUser == userInfo.id){
            const q1="update Video set videoTitle=?, videoDesc=? where idVideo=? and postedByUser=?  "
            const values=[req.body.title,req.body.desc];

            db.query(q1,[...values,req.params.id,userInfo.id],(err,data)=>{
                if(err) return res.status(403).json(err)
                
                return res.status(200).json("Video details updated")
            })
        }else{
            return res.status(403).json("You can only edit your Video");
        }
        });   
    });
}



export const likeVideo=(req,res)=>{
    const token=req.cookies.access_token;
    if(!token)  return res.status(401).json("Login to like this post");


    jwt.verify(token,"jwtkey",(err,userInfo)=>{
        if(err)  return res.status(403).json(err);
    });
}


// get videos of watch later
export const watchlater=(req,res)=>{
    const token=req.cookies.access_token;
    if(!token)  return res.status(401).json("Login first to see watchlater");
    console.log("here")
    jwt.verify(token,"jwtkey",(err,userInfo)=>{
        if(err) return res.status(403).json(err)
        console.log(req.params.id,userInfo.id)
        const q="select video.* from watchlater join video on watchlater.videoId=video.idVideo where watchlater.userId=(?)";
        db.query(q,[userInfo.id],(err,data)=>{
            if(err)     return res.status(404).json(err)

            console.log("Done dona done")

            return res.status(200).json(data);
    })
});
}


export const isLiked=(req,res)=>{
    const { userId, videoId } = req.query;
    // console.log(userId,videoId);
    const q = "SELECT * FROM likes WHERE user_id = ? AND video_id = ?";
    db.query(q, [userId, videoId], (err, data) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (data.length === 0) {
        return res.status(200).json({ isLiked: false });
      } else {
        return res.status(200).json({ isLiked: true });
      }
    });
  } 
  

  export const like=(req,res)=>{
    const token=req.cookies.access_token
    
    if(!token)  return res.status(401).json("Plz login to Like the Video");
    jwt.verify(token,"jwtkey",(err,data)=>{
        if(err) res.status(403).json("Token is not valid")
        const q="INSERT INTO `likes` (`user_id`,`video_id`,`created_at` ) VALUES (?,NOW())";
        console.log("here")
        const values=[data.id,req.params.videoId];
        console.log(values);
        db.query(q,[values],(err,data)=>{
            if(err){
                console.error(err);
                return res.status(500).json("Internal server error");
            }
            console.log("Added to Like Table");
            res.status(200).json("Added to Like");
        });
    });
  }

  export const unlike=(req,res)=>{
    const token=req.cookies.access_token;
    if(!token)  return res.status(401).json("Login first to remove Like");

    jwt.verify(token,"jwtkey",(err,userInfo)=>{
        if(err) return res.status(403).json(err)
        const videoId=req.params.videoId;

        const q="delete from likes where user_id=? and video_id=?"
        
        db.query(q,[userInfo.id,videoId],(err,data)=>{
            if(err) return res.status(403).json(err);

            return res.status(200).json("successfully removed Like");
        })
    })
  }