import collegeData from "../model/collegeData.js";
import { sendFeedbackEmail } from "../mailtrap/email.js";
import Review from "../model/review_model.js";
import College from "../model/collegeData.js";

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
export const updateLikeCount = async (req, res) => {
  const { id } = req.params; // College ID
  const { likeCount, courseName } = req.body; // Like count and course name (if course-specific)

  try {
    // Find the college by ID
    const college = await College.findById(id);
    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }

    if (courseName) {
      // Update like count for a specific course
      const course = college.courses.get(courseName); // Get the course from the Map
      if (!course) {
        return res.status(400).json({ message: "Course not found" });
      }

      // Update the course's like count
      course.likeCountCourse = likeCount;

      // Save the updated college
      await college.save();
    } else {
      // Update the general like count
      college.likeCount = likeCount;

      // Save the updated college
      await college.save();
    }

    // Return the updated college data
    return res.status(200).json(college);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while updating like count", error });
  }
};
// Get all reviews from MongoDB
// Get all reviews from MongoDB
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      course_id: { $exists: true }, // Check if the course_id field exists
    });
    res.status(200).json(reviews); // Send successful response
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch reviews", error: error.message });
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
