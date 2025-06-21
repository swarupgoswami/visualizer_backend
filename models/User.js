import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  civicId: String,
  name: String,
  email: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("User", userSchema);