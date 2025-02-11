import express from "express";
import {
  addReview,
  getUserReviews,
  updateReview,
  deleteReview,
} from "../controller/addreview_controller.js";

const router = express.Router();

// Endpoint to add a review
router.post("/review-add", addReview);
router.get("/user/reviews/:userId", getUserReviews);
router.put("/review-update/:reviewId", updateReview);
router.delete("/review-delete/:reviewId", deleteReview);

export default router;
