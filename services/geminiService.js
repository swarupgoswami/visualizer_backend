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

