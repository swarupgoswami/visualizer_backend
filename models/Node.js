// models/Node.js
import mongoose from "mongoose";

const nodeSchema = new mongoose.Schema({
  treeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tree"
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Node",
    default: null
  },
  children: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Node",
    default: []
  }],
  title: String,
  content: String,
  metadata: {
    flashcard: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Node", nodeSchema);