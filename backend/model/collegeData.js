import mongoose from "mongoose";
const courseSchema = mongoose.Schema({
  number: {
    type: [String], // Array of strings to store course-specific ranks or identifiers
  
  },
  fees: {
    type: [String], // Array of strings to store different fee values for the course
    //required: true,
  },
  likeCountCourse: {
    type: Number,
    default: 0,
  },
});
const collegeSchema = mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  number: {
    type: [String], // Array of strings to store phone numbers
    default: [],
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  courses: {
    type: Map,
    of: courseSchema, // The key is the course name, and the value follows the courseSchema
    //required: true,
  },
});

const collegeData = mongoose.model("College", collegeSchema);

export default collegeData;
