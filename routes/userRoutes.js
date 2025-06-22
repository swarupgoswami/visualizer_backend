
import express from "express";
import { createUser, getAllUsers } from "../controllers/usercontroller.js";

const router = express.Router();

router.post("/create", createUser);
router.get("/:id", getAllUsers); // optional: to fetch all users

export default router;
