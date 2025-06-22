import Tree from "../models/Tree.js";
import mongoose from "mongoose";

export const updateParentChildRelationship = async (req, res) => {
  try {
    const { filter, update } = req.body;
    console.log("Received request:", { filter, update });

    if (!filter._id || !mongoose.Types.ObjectId.isValid(filter._id)) {
      return res.status(400).json({ error: "Invalid node ID" });
    }

    // Initialize variables
    let nodeToUpdate = await Tree.findById(filter._id);
    if (!nodeToUpdate) {
      return res.status(404).json({ error: "Node not found", requestedId: filter._id });
    }

    // Handle parent update if specified
    if (update.parent) {
      if (!mongoose.Types.ObjectId.isValid(update.parent)) {
        return res.status(400).json({ error: "Invalid parent ID" });
      }
      
      const parentExists = await Tree.findById(update.parent);
      if (!parentExists) {
        return res.status(404).json({ error: "Parent node not found", requestedParentId: update.parent });
      }

      nodeToUpdate = await Tree.findByIdAndUpdate(
        filter._id,
        { $set: { parentId: update.parent } },
        { new: true }
      );
    }

    // Handle children update if specified
    if (update.children) {
      if (!Array.isArray(update.children)) {
        return res.status(400).json({ error: "Children must be an array" });
      }

      // Empty children array is valid - it means removing all children
      if (update.children.length > 0) {
        // Validate child IDs
        const invalidChildIds = update.children.filter(id => !mongoose.Types.ObjectId.isValid(id));
        if (invalidChildIds.length > 0) {
          return res.status(400).json({ error: "Invalid child IDs found", invalidIds: invalidChildIds });
        }

        // Verify children exist
        const existingChildren = await Tree.find({ _id: { $in: update.children } });
        const missingChildren = update.children.filter(id => 
          !existingChildren.find(child => child._id.toString() === id)
        );
        
        if (missingChildren.length > 0) {
          return res.status(404).json({
            error: "Some children nodes not found",
            missingIds: missingChildren
          });
        }
      }

      // Update node's children array
      nodeToUpdate = await Tree.findByIdAndUpdate(
        filter._id,
        { $set: { children: update.children } },
        { new: true }
      );

      // Update children's parent reference
      if (update.children.length > 0) {
        await Tree.updateMany(
          { _id: { $in: update.children } },
          { $set: { parentId: filter._id } }
        );
      }
    }

    // Get final state
    const updatedNode = await Tree.findById(filter._id);
    const updatedChildren = update.children ? 
      await Tree.find({ _id: { $in: update.children } }) : 
      await Tree.find({ parentId: filter._id });

    res.json({
      message: "Tree relationships updated successfully",
      node: updatedNode,
      children: updatedChildren
    });

  } catch (err) {
    console.error("Error updating tree relationships:", err);
    res.status(500).json({ 
      error: "Failed to update tree relationships",
      details: err.message
    });
  }
};

export const getRootNodes = async (req, res) => {
  const { treeId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  try {
    const nodes = await Node.find({ treeId, parentId: null })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({ nodes });
  } catch (err) {
    console.error("Error fetching root nodes:", err);
    res.status(500).json({ error: "Failed to fetch root nodes" });
  }
};

export const getChildrenNodes = async (req, res) => {
  const { parentId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  try {
    const nodes = await Node.find({ parentId })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({ nodes });
  } catch (err) {
    console.error("Error fetching children nodes:", err);
    res.status(500).json({ error: "Failed to fetch children nodes" });
  }
};
