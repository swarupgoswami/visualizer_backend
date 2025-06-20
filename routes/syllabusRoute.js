import express from "express";
import multer from "multer";
import { extractTextFromPdf } from "../utils/pdfParser.js";
import { chunkText } from "../utils/chunker.js";
import { buildPrompt } from "../utils/promptBuilder.js";
import { askGemini } from "../services/geminiService.js";

const router = express.Router();
const upload = multer();

console.log("✅ /api/syllabus/elaborate route loaded");



router.post("/elaborate",  upload.single("file"), async (req, res) => {
  try {
    // console.log("Received request to elaborate syllabus");
    let rawText = req.body.syllabusText;

    if (req.file) {
      rawText = await extractTextFromPdf(req.file.buffer);
    }

    if (!rawText) {
      return res.status(400).json({ error: "No syllabus content found." });
    }

    const chunks = chunkText(rawText, 2000);
    const elaborations = [];

    for (const chunk of chunks) {
      const prompt = buildPrompt(chunk);
      const result = await askGemini(prompt);
      elaborations.push(result);
    }

    const finalOutput = elaborations.join("\n\n");
    res.json({ elaboratedSyllabus: finalOutput });

  } catch (err) {
    console.error("Error elaborating syllabus:", err);
    res.status(500).json({ error: "Something went wrong." });
  }
});

export default router;
