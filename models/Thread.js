import mongoose from "mongoose";

const threadSchema = new mongoose.Schema({
  treeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tree"
  },
  theme: String,
  nodes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Node" }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Thread", threadSchema);