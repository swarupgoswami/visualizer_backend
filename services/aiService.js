import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateContent = async (prompt) => {
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};

export const generateThreadSummary = async (combinedNodeText) => {
  const prompt = `Summarize the following content into 3-5 conceptual threads that show the learning themes:\n\n${combinedNodeText}`;
  return await generateContent(prompt);
};
