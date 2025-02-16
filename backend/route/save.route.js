import express from "express";
import {
  saveCollege,
  getSavedColleges,
  unsaveCollege,
} from "../controller/save_controller.js";

const router = express.Router();

// Route to save a college
router.post("/save", saveCollege);

// Route to get all saved colleges for a user
router.get("/saved/:user_id", getSavedColleges);

// Route to unsave a college
router.post("/unsave", unsaveCollege);

export default router;
