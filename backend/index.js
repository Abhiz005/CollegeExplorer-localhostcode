import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import collegeRoute from "./route/college.route.js";
import feedbackRoutes from "./route/college.route.js";
import Review from "./route/college.route.js";
import scraperRoute from "./route/scraper.route.js";

import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
import authRoutes from "./route/auth.route.js";

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

//defing routes
app.use("/college", collegeRoute);

////
app.use("/api/auth", authRoutes);
///
app.use("/feedback", feedbackRoutes);
app.use("/review", Review);

app.use("/scraper", scraperRoute);
//app.use("/scraper", scraperRoute);
app.listen(PORT, () => {
  console.log(`Server app listening on port ${PORT}`);
});
