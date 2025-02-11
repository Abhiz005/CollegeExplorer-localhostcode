import User_review from "../model/review_model.js";

export const addReview = async (req, res) => {
  try {
    const { name, description, img, college_id, course_id, user_id } = req.body;

    if (!name || !description || !college_id || !course_id) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newReview = new User_review({
      name,
      description,
      img,
      college_id,
      course_id,
      user_id,
    });

    await newReview.save();
    res.status(201).json({ message: "Review added successfully", newReview });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding review", error: error.message });
  }
};

// Controller to fetch all reviews
export const getReviews = async (req, res) => {
  try {
    const reviews = await User_review.find().populate("college", "name");
    res.status(200).json(reviews);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching reviews", error: error.message });
  }
};
//For DASHBOARD
export const getUserReviews = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch reviews and populate college name
    const reviews = await User_review.find({ user_id: userId })
      

    res.status(200).json(reviews);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user reviews", error: error.message });
  }
};

export const updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { name, description } = req.body;

    const updatedReview = await User_review.findByIdAndUpdate(
      reviewId,
      { name, description },
      { new: true }
    );

    if (!updatedReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    res
      .status(200)
      .json({ message: "Review updated successfully", updatedReview });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating review", error: error.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const deletedReview = await User_review.findByIdAndDelete(reviewId);

    if (!deletedReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting review", error: error.message });
  }
};
