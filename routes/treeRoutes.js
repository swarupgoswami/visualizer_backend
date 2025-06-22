import express from "express";
import { createTree } from "../controllers/treecontroller.js";
import { updateParentChildRelationship } from "../controllers/nodeController.js";

const router = express.Router();

router.post("/create", createTree);
router.post("/update-relationships", updateParentChildRelationship);

export default router;
