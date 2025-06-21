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

export function buildExplanation (sub, topic) {
  return `
You are given the following data about a subject and a topic:

Subject: ${sub}
Topic: ${topic}

Prepare a summary of the given topic to teach it to someone of a similar knowledge level. You are to provide with only the summarized content and nothing else at all, no pleasantries or greetings or goodbyes or anything.
`;
}
