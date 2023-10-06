import express from "express"
import { getUser, updateUser ,subscribeUser,unsubscribeUser, deleteUser, searchHistory,watchHistory, addPlaylist, showplaylist, addToWatchLater } from "../controllers/users.js";
import { isWatchLater, removeWatchLater, subcheck, subscribed, subscribers } from "../controllers/subscriber.js";
const router=express.Router();

//get a user
router.get("/find/:id",getUser)

// update a user
router.put("/:id",updateUser)

// delete a user
router.delete("/:id",deleteUser)

// subscribe a user
router.post("/sub/:id",subscribeUser)


//unsubscribe a user
router.delete("/sub/:id",unsubscribeUser)

//check if subscribed
router.get("/subs",subcheck);


//check if Video is in watchlater
router.get("/iswatchlater",isWatchLater)




// dislike a video
// router.put("/dislike/:id",dislike)

//Search History
router.get("/searchHistory",searchHistory)


//Watch History
router.get("/watchHistory",watchHistory)

//add to watch later
router.post("/addToWatchlater/:videoId",addToWatchLater);

router.delete("/addToWatchlater/:videoId",removeWatchLater);



// subscibers
router.get("/subscribers",subscribers)


//get all playlist

router.get("/playlist",showplaylist);

//add a playlist
router.post("/playlist",addPlaylist);


// subscribed
router.get("/subscribed",subscribed)

export default router;