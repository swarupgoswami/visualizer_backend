export function buildPrompt(textChunk) {
  return `
You are an assistant that transforms raw syllabus text into a structured hierarchical format.

Given the following syllabus:

"""${textChunk}"""

Return the elaboration as a JSON array of modules. Each module should have:
- a "title"
- an array of "topics", and each topic should have:
  - a "title"
  - a "content" field elaborating the topic in detail

Respond ONLY with the valid JSON array — no explanation, no markdown.

Format:
[
  {
    "title": "Module title",
    "topics": [
      {
        "title": "Topic title",
        "content": "Detailed explanation of the topic"
      }
    ]
  }
]
`;
}
