import mongoose from "mongoose";

const treeSchema = new mongoose.Schema({
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject"
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tree",
    default: null
  },
  children: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tree",
    default: []
  }],
  title: String,
  content: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Tree", treeSchema);