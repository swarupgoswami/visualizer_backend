import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
    picture: String,
    email: String,
    civicId: String,
    role: String,
    school: String,
    company: String,
    year: String,
    dept: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("User", userSchema);