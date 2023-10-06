import express from "express";
import videoRoute from "./routes/videos.js"
import userRoute from "./routes/users.js"
import authRoute from "./routes/auth.js"
import commentRoute from "./routes/comments.js"
import cookieParser from "cookie-parser";
import cors from "cors";

const app=express()

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true, // Allow credentials such as cookies to be sent
    optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  
app.use(cors(corsOptions));


app.use(express.json());

app.use(cookieParser());

app.use("/api/videos",videoRoute)
app.use("/api/users",userRoute)
app.use("/api/auths",authRoute)
app.use("/api/comments",commentRoute)

app.listen(8800,()=>{
    console.log("connected to backend")
})