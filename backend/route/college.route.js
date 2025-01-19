import express from "express";
import {
  getcollege,
  updateLikeCount,
  searchColleges,
  sendFeedback,
  getReviews,
} from "../controller/college_controller.js";

const router = express.Router();

// Route for fetching all colleges
router.get("/", getcollege);

// Route for updating like count
router.put("/:id", updateLikeCount);
router.get("/search", searchColleges);
// Route for sending feedback
router.post("/feedback", sendFeedback); // Use POST instead of PUT
router.get("/review", getReviews);
export default router;
