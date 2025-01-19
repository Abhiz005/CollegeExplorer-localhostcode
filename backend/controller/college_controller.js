import collegeData from "../model/collegeData.js";
import { sendFeedbackEmail } from "../mailtrap/email.js";
import Review from "../model/review_model.js";

// Controller function for getting all colleges
export const getcollege = async (req, res) => {
  try {
    const colleges = await collegeData.find();
    res.status(200).json(colleges);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json(error);
  }
};

// Controller function for searching colleges by course
export const searchColleges = async (req, res) => {
  const { course } = req.query; // Retrieve the course from query parameters

  try {
    const college = await collegeData.find({
      [`courses.${course}`]: { $exists: true }, // Check if the course exists in the courses map
    });

    res.status(200).json(college);
  } catch (error) {
    console.log("Error during search:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Controller function for updating the like count
// Controller function for updating the like count
export const updateLikeCount = async (req, res) => {
  const { id } = req.params; // College ID
  const { courseName } = req.body; // Course name (optional)

  try {
    const college = await collegeData.findById(id);
    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }

    if (courseName) {
      // Check if the courses field exists and contains the course
      if (!college.courses) {
        college.courses = {}; // Initialize if not present
      }

      if (!college.courses[courseName]) {
        // Optionally create a new course entry
        college.courses[courseName] = { likeCountCourse: 0 };
      }

      // Increment course like count
      college.courses[courseName].likeCountCourse += 1;
    } else {
      // Increment college like count
      college.likeCount = (college.likeCount || 0) + 1;
    }

    const updatedCollege = await college.save(); // Save changes
    res.status(200).json(updatedCollege); // Return updated data
  } catch (error) {
    console.error("Error updating like count:", error);
    res.status(500).json({ message: "An error occurred", error });
  }
};

// Get all reviews from MongoDB
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reviews", error });
  }
};

export const sendFeedback = async (req, res) => {
  try {
    const { name, collegeName, note, email } = req.body;

    // Validate the data
    if (!name || !collegeName || !note || !email) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Prepare the feedback data
    const feedbackData = {
      name,
      collegeName,
      note,
      email,
    };

    // Send feedback email to the specified email address
    await sendFeedbackEmail(feedbackData);
    console.log("Received feedback:", req.body);

    // Ensure the response is sent back indicating success
    res.status(200).json({
      success: true,
      message: "Feedback submitted successfully",
    });
  } catch (error) {
    console.error("Error in sendFeedback: ", error);
    res.status(400).json({
      success: false,
      message: "Error sending feedback. Please try again later.",
    });
  }
};

