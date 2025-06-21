import Node from "../models/Node.js";

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
