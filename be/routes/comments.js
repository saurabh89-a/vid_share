import express from "express"
import { addComment, getComments } from "../controllers/comments.js";
const router=express.Router();



router.get("/:id",getComments);

router.post("/add",addComment);

export default router;