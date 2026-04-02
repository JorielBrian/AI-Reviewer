// Service for asking AI questions about content
// This module provides a high-level interface for querying AI models
// about processed content with context-aware prompts

import { generateText } from "./ollama";

// Function to ask AI a question about provided content
export async function askAI(content: string, question: string) {
  // Create a focused prompt that instructs the AI to answer based only on the content
  const prompt = `
You are an AI assistant.

Answer the question ONLY based on the context below.

Context:
${content.slice(0, 8000)}

Question:
${question}
`;

  // Generate and return the AI response using Ollama
  return await generateText(prompt);
}