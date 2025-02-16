import mongoose from "mongoose";

const user_saveSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  college_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "colleges",
    required: true,
  },
  collegeName: {
    type: String,
    required: true,
  },
  courseName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  courseFees: {
    type: [String], // Array of strings to store different fee values for the course
    required: true,
  },
});

const UserSave = mongoose.model("UserSave", user_saveSchema);

export default UserSave;
