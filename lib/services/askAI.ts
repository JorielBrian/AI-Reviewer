import { generateText } from "./ollama";

export async function askAI(content: string, question: string) {
  const prompt = `
You are an AI assistant.

Answer the question ONLY based on the context below.

Context:
${content.slice(0, 8000)}

Question:
${question}
`;

  return await generateText(prompt);
}