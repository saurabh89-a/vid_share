import express from "express"
import {getVideos,getVideoData,getVideo,addVideo,deleteVideo,updateVideo, random, getVideoSpecData, viewed, watchlater, trend, isLiked, like, unlike, music, sports, gaming, movie, news, lifestyle, watchhistory, getUserVideos } from "../controllers/videos.js";


const router=express.Router();


// is video liked
router.get("/isliked",isLiked)


router.post("/like/:videoId",like);


router.delete("/like/:videoId",unlike)

router.get("/trend",trend)
//all videos in watch later
router.get("/watchlater",watchlater);

router.get("/random",random)

router.get("/trend",trend)

router.get("/music",music)

router.get("/sports",sports)

router.get("/gaming",gaming)

router.get("/movie",movie)

router.get("/news",news)

router.get("/lifestyle",lifestyle)

router.get("/watchhistory",watchhistory)

router.get("/userVideos/:id",getUserVideos)

router.get("/",getVideos)

router.get("/:id",getVideo)


//all videos in watch later
router.get("/watchlater",watchlater);

// is video liked
router.get("/isliked",isLiked)

router.get("/find/:id",getVideoData)

router.get("/getspec/:id",getVideoSpecData)

router.post("/",addVideo)

router.post("/viewed/:videoId",viewed);

//all videos in watch later
router.get("/watchlater",watchlater);

router.delete("/:id",deleteVideo)

router.put("/:id",updateVideo)


export default router;