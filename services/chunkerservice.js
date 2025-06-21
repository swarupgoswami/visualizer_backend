import { chunkText } from "../utils/chunker.js";

export const prepareChunksForAI = (text) => {
  const chunks = chunkText(text, 2000);
  return chunks;
};
