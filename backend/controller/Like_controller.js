import Like from "../model/Like_model.js";
import axios from "axios";

import College from "../model/collegeData.js"; // Import College model

export const likeCollege = async (req, res) => {
  const { user_id, college_id, course_name } = req.body;

  if (!user_id || !college_id || !course_name) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Ensure course_name is properly assigned
  const finalCourseName = course_name === "default" ? "default" : course_name; // Use "default" if course_name is missing

  try {
    const query = { user_id, college_id };
    if (finalCourseName) {
      // like specific course
      query.course_name = finalCourseName;
    }
    const existingLike = await Like.findOne(query);
    if (existingLike) {
      return res
        .status(400)
        .json({ message: "College or course already Liked" });
    }

    const newLike = new Like({
      user_id,
      college_id,
      course_name: finalCourseName, // Ensure it's saved properly
    });

    await newLike.save();

    // Increment likeCount in the College model
    const updatedCollege = await College.findByIdAndUpdate(
      college_id,
      { $inc: { likeCount: 1 } },
      { new: true }
    );

    res.status(200).json({
      message: "College liked successfully",
      likeCount: updatedCollege.likeCount,
    });
  } catch (error) {
    console.error("Error liking college:", error);
    res.status(500).json({ message: "Error liking college" });
  }
};

export const unlikeCollege = async (req, res) => {
  const { user_id, college_id, course_name } = req.body;

  if (!user_id || !college_id) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const query = { user_id, college_id };

  if (course_name) {
    query.course_name = course_name; // Ensure it removes only for the specific course
  }

  try {
    const like = await Like.findOneAndDelete(query);

    if (!like) {
      return res
        .status(400)
        .json({ message: "College not liked yet for this course" });
    }

    // Decrement likeCount in the College model, ensuring it doesn't go below 0
    await College.findByIdAndUpdate(college_id, { $inc: { likeCount: -1 } });

    res.status(200).json({ message: "College or course unliked successfully" });
  } catch (error) {
    console.error("Error unliking college:", error);
    res.status(500).json({ message: "Error unliking college or course" });
  }
};

// Check if a college or course is liked
export const isCollegeLiked = async (req, res) => {
  const { user_id, college_id, course_name } = req.query;
  const query = { user_id, college_id };

  if (course_name) {
    query.course_name = course_name; // Ensure it checks for a specific course
  }

  try {
    const liked = await Like.findOne(query);
    res.status(200).json({ isLiked: !!liked });
  } catch (error) {
    res.status(500).json({ message: "Error checking like status" });
  }
};

// Controller to fetch all likes
export const getLikes = async (req, res) => {
  const { user_id } = req.query;

  if (!user_id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const likedItems = await Like.find({ user_id })
      .select("college_id course_name -_id") // Ensure course_name is included
      .lean(); // Convert to plain JavaScript objects

    res.status(200).json(likedItems);
  } catch (error) {
    console.error("Error fetching liked colleges:", error);
    res
      .status(500)
      .json({ message: "Error fetching liked colleges or courses" });
  }
};

export const getLikeCount = async (req, res) => {
  const { college_id, course_name } = req.query;

  if (!college_id) {
    return res.status(400).json({ message: "College ID is required" });
  }

  try {
    const college = await College.findById(college_id);
    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }

    if (course_name && college.courses[course_name]) {
      return res
        .status(200)
        .json({ likeCount: college.courses[course_name].likeCountCourse });
    }

    res.status(200).json({ likeCount: college.likeCount });
  } catch (error) {
    console.error("Error fetching like count:", error);
    res.status(500).json({ message: "Error fetching like count" });
  }
};
