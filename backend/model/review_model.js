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
});
const User_review = mongoose.model("Review", user_reviewSchema);
export default User_review;
