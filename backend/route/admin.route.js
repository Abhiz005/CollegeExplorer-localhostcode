import express from "express";
import { adminLogin, checkAuthAdmin } from "../controller/admin_controller.js";
import mongoose from "mongoose";

const router = express.Router();

// Define Models using existing models or creating if not available
const User =
  mongoose.models.User ||
  mongoose.model("User", new mongoose.Schema({}, { collection: "users" }));
const College =
  mongoose.models.College ||
  mongoose.model(
    "College",
    new mongoose.Schema({}, { collection: "colleges" })
  );
const Review =
  mongoose.models.Review ||
  mongoose.model("Review", new mongoose.Schema({}, { collection: "reviews" }));

// ✅ Admin Authentication Routes
router.post("/login", adminLogin);
router.get("/check-auth-admin", checkAuthAdmin);

// ✅ Admin Stats Route - Count Functionality
router.get("/stats", async (req, res) => {
  try {
    const usersCount = await User.countDocuments();
    const collegesCount = await College.countDocuments();
    const reviewsCount = await Review.countDocuments();

    res.status(200).json({
      users: usersCount,
      colleges: collegesCount,
      reviews: reviewsCount,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

// ✅ Get All Users - For Remove User Section
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "name email _id");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// ✅ Delete User
router.delete("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
});
// ✅ Get All Reviews
router.get("/reviews", async (req, res) => {
    try {
      const reviews = await Review.find({}, "name description _id");
      res.status(200).json(reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      res.status(500).json({ error: "Failed to fetch reviews" });
    }
  });
  
  // ✅ Delete Review
  router.delete("/reviews/:id", async (req, res) => {
    try {
      const reviewId = req.params.id;
      const deletedReview = await Review.findByIdAndDelete(reviewId);
      if (!deletedReview) {
        return res.status(404).json({ error: "Review not found" });
      }
      res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
      console.error("Error deleting review:", error);
      res.status(500).json({ error: "Failed to delete review" });
    }
  });

  // ✅ Get All Colleges
router.get("/colleges", async (req, res) => {
    try {
      const colleges = await College.find({}, "name location _id");
      res.status(200).json(colleges);
    } catch (error) {
      console.error("Error fetching colleges:", error);
      res.status(500).json({ error: "Failed to fetch colleges" });
    }
  });
  
  // ✅ Delete College
  router.delete("/colleges/:id", async (req, res) => {
    try {
      const collegeId = req.params.id;
      const deletedCollege = await College.findByIdAndDelete(collegeId);
      if (!deletedCollege) {
        return res.status(404).json({ error: "College not found" });
      }
      res.status(200).json({ message: "College deleted successfully" });
    } catch (error) {
      console.error("Error deleting college:", error);
      res.status(500).json({ error: "Failed to delete college" });
    }
  });
  
export default router;
