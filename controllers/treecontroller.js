import Tree from "../models/Tree.js";
import Node from "../models/Node.js";

export const createTree = async (req, res) => {
  try {
    const { subjectId, title, tree } = req.body;

    const newTree = new Tree({ subjectId, title });
    const savedTree = await newTree.save();

    // Recursively insert nodes
    const insertNodes = async (nodes, parentId = null) => {
      for (const node of nodes) {
        const createdNode = await Node.create({
          treeId: savedTree._id,
          parentId,
          title: node.title,
          content: node.content
        });

        if (node.children && node.children.length > 0) {
          await insertNodes(node.children, createdNode._id);
        }
      }
    };

    await insertNodes(tree);

    res.status(201).json({ treeId: savedTree._id });
  } catch (err) {
    console.error("Error creating tree:", err);
    res.status(500).json({ error: "Failed to create tree" });
  }
};
