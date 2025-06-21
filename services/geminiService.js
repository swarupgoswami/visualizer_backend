import fetch from "node-fetch";
import dotenv from"dotenv";
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

console.log("gemini key is",GEMINI_API_KEY);


export async function askGemini(prompt) {
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite-preview-06-17:generateContent?key=${GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    })
  });

  const data = await response.json();

  console.log("🌐 Gemini Response:", JSON.stringify(data, null, 2));

  return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini.";
}








export async function inferThreadsWithGemini(nodes) {
  const prompt = `
You are an expert tutor. Below is a list of concept nodes from a subject's topic tree.

Your task is to analyze them and group them into 3–5 conceptual threads.
For each thread, give:
1. A title
2. A 1-line description
3. The list of node titles that belong to it.

Nodes:
${nodes.map((n) => `- ${n.title}`).join("\n")}

Respond strictly in JSON format like this:
[
  {
    "title": "Thread Name",
    "description": "One line about the thread",
    "relatedNodes": ["node title 1", "node title 2"]
  },
  ...
]
`;

  const response = await askGemini(prompt);

  try {
    return JSON.parse(response);
  } catch (err) {
    console.error("❌ Failed to parse Gemini response as JSON:", err);
    return [];
  }
}


export async function generateFlashcardWithGemini(title, content) {
  const prompt = `You are an AI tutor. Generate a simple and concise flashcard to help a student remember the following concept.\n\nTitle: ${title}\nContent: ${content}\n\nFormat:\nQuestion:\nAnswer:`;

  const response = await askGemini(prompt);

  // Optional: validate/clean the result
  return response;
}
