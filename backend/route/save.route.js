// routes/saveRoutes.js
import express from "express";
import {
  saveCollege,
  unsaveCollege,
  isCollegeSaved,
} from "../controller/save_controller.js";

const router = express.Router();

router.post("/save", saveCollege);
router.post("/unsave", unsaveCollege);
router.get("/isSaved", isCollegeSaved);

export default router;
