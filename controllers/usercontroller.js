// controllers/userController.js
import User from "../models/User.js";

// Create user (no auth)
export const createUser = async (req, res) => {
  try {
    const { name, email , picture, civicId, role, school, company, year, dept } = req.body;

    if (!name || !email || !role) {
      return res.status(400).json({ error: "Name, email, and role are required." });
    }

    if (role === "student") {
      if (!school || !dept || !year) {
        return res.status(400).json({ error: "Students must provide school, dept, and year." });
      }
    }

    if (role === "professional") {
      if (!company) {
        return res.status(400).json({ error: "Professionals must provide company." });
      }
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const newUser = new User({
      name, 
      email,
      picture, 
      civicId, 
      role, 
      school, 
      company, 
      year, 
      dept,
      createdAt: new Date()
    });

    const savedUser = await newUser.save();
    res.status(201).json({ message: "User created", userId: savedUser._id });
  } catch (err) {
    console.error("❌ Error creating user:", err);
    res.status(500).json({ error: "Failed to create user" });
  }
};


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json({ users });
  } catch (err) {
    console.error(" Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};
