import express from "express";
import { getRootNodes, getChildrenNodes } from "../controllers/nodeController.js";

const router = express.Router();

router.get("/root/:treeId", getRootNodes);
router.get("/children/:parentId", getChildrenNodes);

export default router;
