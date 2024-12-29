import collegeData from "../model/collegeData.js";

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
  const { id } = req.params; // Get college ID from the URL parameters
  const { likeCount } = req.body; // Get the updated likeCount from the request body

  try {
    const college = await collegeData.findById(id); // Find the college by ID
    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }

    // Update the like count and save the college
    college.likeCount = likeCount;
    await college.save();

    res.status(200).json(college); // Return the updated college
  } catch (error) {
    console.log("Error updating like count:", error);
    res.status(500).json(error);
  }
};
