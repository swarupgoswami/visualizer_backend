import express from "express";
import dotenv from "dotenv";
dotenv.config();

import syllabusRoute from "./routes/syllabusRoute.js";


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/syllabus", syllabusRoute);

app.use( (req, res) => {
  res.status(404).json({ message: "Route not found", url: req.originalUrl });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});


