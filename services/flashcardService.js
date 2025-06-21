import { generateContent } from "./aiService.js";

export const generateFlashcard = async (title, content) => {
  const prompt = `Generate a flashcard for the following topic:\n\nTitle: ${title}\nContent: ${content}`;

  const result = await generateContent(prompt);
  return result;
};
