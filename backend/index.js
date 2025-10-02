//const express=require('express');
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
dotenv.config({});
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

import cors from "cors";

const allowedOrigins = [
  "http://localhost:5173",                     // local frontend
  "https://jobmitra-frontend.onrender.com"    // deployed frontend
];

const corsOptions = {
  origin: function(origin, callback) {
    // allow requests with no origin (like Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified origin: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
};

app.use(cors(corsOptions));


//API
app.get("/home", (req, res) => {
  return res.status(200).json({
    message: "I am coming from backend",
    success: true,
  });
});

const PORT = process.env.PORT || 3000;
//API
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
/*
According to userrouter
"http://localhost:8000/api/v1/user/register"
"http://localhost:8000/api/v1/user/login",
"http://localhost:8000/api/v1/user/profile/update",

*/

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running at http://localhost:${PORT}`);
});
