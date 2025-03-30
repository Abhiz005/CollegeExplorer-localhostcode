import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import collegeRoute from "./route/college.route.js";
import feedbackRoutes from "./route/college.route.js";
import Review from "./route/college.route.js";
import scraperRoute from "./route/scraper.route.js";
import reviewRoutes from "./route/review.route.js";
import saveRoutes from "./route/save.route.js";
import likeRoutes from "./route/like.route.js";
import authRoutes from "./route/auth.route.js";
import adminRoutes from "./route/admin.route.js";

import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());

app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
dotenv.config();
const PORT = process.env.PORT || 4000;

//connect to mongodb
const URI = process.env.MongoDBURI;
try {
  mongoose.connect(
    "mongodb+srv://abhi:abhi%40db@testdb.vcyi0.mongodb.net/auth_db?retryWrites=true&w=majority&appName=testdb"
  );
  console.log("Connected to mongoDB");
} catch (error) {
  console.log("Error:", error);
}
// Increase the request body size limit

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
//defing routes
app.use("/college", collegeRoute);

////
app.use("/api/auth", authRoutes);
///
app.use("/feedback", feedbackRoutes);
app.use("/review", Review);

app.use("/scraper", scraperRoute);
app.use("/review-add", reviewRoutes);
app.use("/", saveRoutes);
app.use("/", likeRoutes);
app.use("/admin", adminRoutes);
//app.use("/scraper", scraperRoute);
app.listen(PORT, () => {
  console.log(`Server app listening on port ${PORT}`);
});
