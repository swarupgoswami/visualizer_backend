import Node from "../models/Node.js";

export async function insertTreeNodes(treeJson, treeId, parentId = null) {
  for (const node of treeJson) {
    const newNode = await Node.create({
      treeId,
      parentId,
      title: node.title,
      content: node.content || "",
      metadata: {},
    });

    if (node.children && node.children.length > 0) {
      await insertTreeNodes(node.children, treeId, newNode._id);
    }
  }
}
