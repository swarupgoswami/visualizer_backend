import mongoose from "mongoose";

const treeSchema = new mongoose.Schema({
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject"
  },
  title: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Tree", treeSchema);