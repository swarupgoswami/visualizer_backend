import express from "express";
import { getRootNodes, getChildrenNodes, updateParentChildRelationship } from "../controllers/nodeController.js";

const router = express.Router();

router.get("/root/:treeId", getRootNodes);
router.get("/children/:parentId", getChildrenNodes);
router.post("/update-relationships", updateParentChildRelationship);

export default router;
