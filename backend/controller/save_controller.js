import Save from "../model/save_model.js";

// Save a college or a specific course
export const saveCollege = async (req, res) => {
  const { user_id, college_id, course_name } = req.body;

  // Handle default course name
  const finalCourseName = course_name === "default" ? "default" : course_name;

  try {
    const query = { user_id, college_id };

    if (finalCourseName) {
      // Save specific course
      query.course_name = finalCourseName;
    }

    const existingSave = await Save.findOne(query);
    if (existingSave) {
      return res
        .status(400)
        .json({ message: "College or course already saved" });
    }

    const newSave = new Save({
      user_id,
      college_id,
      course_name: finalCourseName,
    });
    await newSave.save();
    res.status(200).json({ message: "College or course saved successfully" });
  } catch (error) {
    console.error("Error saving college:", error);
    res.status(500).json({ message: "Error saving college or course" });
  }
};
// Unsave a college or course
// Unsave a college or course
export const unsaveCollege = async (req, res) => {
  const { user_id, college_id, course_name } = req.body;
  const query = { user_id, college_id };

  if (course_name) {
    query.course_name = course_name; // So it only removes that specific course
  }

  try {
    await Save.findOneAndDelete(query);
    res.status(200).json({ message: "College or course unsaved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error unsaving college or course" });
  }
};

// Check if a college or course is saved
export const isCollegeSaved = async (req, res) => {
  const { user_id, college_id, course_name } = req.query;
  const query = { user_id, college_id };

  if (course_name) {
    query.course_name = course_name;
  }

  try {
    const saved = await Save.findOne(query);
    res.status(200).json({ isSaved: !!saved });
  } catch (error) {
    res.status(500).json({ message: "Error checking save status" });
  }
};
