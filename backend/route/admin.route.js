// admin_route.js
import express from "express";
import { adminLogin, checkAuthAdmin } from "../controller/admin_controller.js";
const router = express.Router();

router.post("/login", adminLogin);
router.get("/check-auth-admin", checkAuthAdmin);
export default router;
