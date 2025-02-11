import mongoose from "mongoose";

const user_reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  img: { type: String },
  college_id: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the College model
    ref: "colleges", // Reference to the College model
    required: true, // Make this a required field
  },
  course_id: {
    type: String, // Add the course name
    required: true,
    default: "default",
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the College model
    ref: "users", // Reference to the College model
    required: false,
  },
});

const User_review = mongoose.model("Review", user_reviewSchema);

export default User_review;
