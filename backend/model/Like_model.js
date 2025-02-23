import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema({
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

const Like = mongoose.model("like", LikeSchema);
export default Like;
