import UserSave from "../model/review_model.js";
import College from "../model/collegeData.js"; // Ensure you import the college model

// Save a college
export const saveCollege = async (req, res) => {
  const { user_id, college_id } = req.body;

  try {
    // Check if the college is already saved
    const existingSave = await UserSave.findOne({ user_id, college_id });
    if (existingSave) {
      return res.status(400).json({ message: "College already saved." });
    }

    // Fetch college details to save additional information
    const college = await College.findById(college_id);
    if (!college) {
      return res.status(404).json({ message: "College not found." });
    }

    const newSave = new UserSave({
      user_id,
      college_id,
      collegeName: college.name,
      courseName: college.courseName,
      location: college.location,
      courseFees: college.fees,
    });

    await newSave.save();

    res.status(201).json({ message: "College saved successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error saving college.", error });
  }
};

// Get saved colleges for a user
export const getSavedColleges = async (req, res) => {
  const { user_id } = req.params;

  try {
    const savedColleges = await UserSave.find({ user_id }).populate(
      "college_id"
    );
    res.status(200).json(savedColleges);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving saved colleges.", error });
  }
};

// Unsave a college
export const unsaveCollege = async (req, res) => {
  const { user_id, college_id } = req.body;

  try {
    await UserSave.findOneAndDelete({ user_id, college_id });
    res.status(200).json({ message: "College unsaved successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error unsaving college.", error });
  }
};
console.log("Save college endpoint hit"); // Add this for debugging
