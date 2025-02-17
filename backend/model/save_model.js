import mongoose from "mongoose";

const saveSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  college_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "College",
    required: true,
  },
  course_name: {
    type: String,
  },
});

const Save = mongoose.model("Save", saveSchema);
export default Save;
