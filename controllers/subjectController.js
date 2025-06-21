import Subject from "../models/Subject.js";

export const createSubject = async (req, res) => {
  try {
    const { name, rawSyllabus, createdBy } = req.body;

    const subject = new Subject({
      name,
      rawSyllabus,
      createdBy
    });

    await subject.save();
    res.status(201).json({ _id: subject._id });
  } catch (err) {
    console.error("Error creating subject:", err);
    res.status(500).json({ error: "Failed to create subject" });
  }
};
