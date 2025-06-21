import express from "express";
import { createTree } from "../controllers/treecontroller.js";

const router = express.Router();

router.post("/create", createTree);

export default router;
