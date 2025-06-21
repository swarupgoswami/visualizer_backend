import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  name: String,
  rawSyllabus: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Subject", subjectSchema);