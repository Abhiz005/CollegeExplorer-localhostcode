import express from "express";
import {
  likeCollege,
  unlikeCollege,
  isCollegeLiked,
  getLikeCount,
  getLikes,
} from "../controller/Like_controller.js";

const router = express.Router();

router.post("/like", likeCollege);
router.post("/unlike", unlikeCollege);
router.get("/isLiked", isCollegeLiked);
router.get("/getLikes", getLikeCount);
router.get("/getlike", getLikes);

export default router;
