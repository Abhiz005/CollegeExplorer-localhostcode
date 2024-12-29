import express from "express";
import {
  getcollege,
  updateLikeCount,
  searchColleges,
} from "../controller/college_controller.js";

const router = express.Router();

// Route for fetching all colleges
router.get("/", getcollege);

// Route for updating like count
router.put("/:id", updateLikeCount);
router.get("/search", searchColleges);

export default router;
