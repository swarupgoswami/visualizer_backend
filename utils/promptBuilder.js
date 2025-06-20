export function buildPrompt(textChunk) {
  return `
Here is a syllabus or course description:

"${textChunk}"

Please elaborate this syllabus in detail. Break it into modules and topics with descriptions, and make it structured and easy to understand.
  `;
}
