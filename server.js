import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

import userRoutes from "./routes/userRoutes.js";
// import uploadRoutes from "./routes/uploadRoutes.js";
import nodeRoutes from "./routes/nodeRoutes.js";
// import threadRoutes from "./routes/";
// import flashcardRoutes from "./routes/flashcardsRoutes.js";
// import analogyRoutes from "./routes/analogyRoutes.js";
// import threadRoutes from "./routes/threadRoutes.js";
import treeRoutes from "./routes/treeRoutes.js";

import syllabusRoute from "./routes/syllabusRoute.js";
import subjectRoutes from "./routes/subjectRoutes.js";



const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/syllabus", syllabusRoute);
// app.use("/api/auth", authRoutes);
app.use("/api/subject", subjectRoutes);
app.use("/api/users", userRoutes);
// app.use("/api/upload", uploadRoutes);
app.use("/api/tree", treeRoutes);

app.use("/api/nodes", nodeRoutes);
app.use("/api/threads", threadRoutes);
app.use("/api/flashcards", flashcardRoutes);
app.use("/api/analogy", analogyRoutes);

app.use( (req, res) => {
  res.status(404).json({ message: "Route not found", url: req.originalUrl });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});


