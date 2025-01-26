import express from "express";
import { getFeedPosts, Delete, getUserPosts, likePost, Get, commentPosts, Count, UpdateStatus, countPostsByDayOfWeek } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";


const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);

router.get("/get", Get);

router.get("/count/all", Count)

router.get("/countofposts/day",countPostsByDayOfWeek)

router.delete("/delete/:id", Delete)

router.post("/update/status/:id", UpdateStatus)

router.post("/:id/comment", verifyToken, commentPosts);


router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);

export default router;