// Service for interacting with Ollama AI models
// This module provides functions to generate text using local Ollama models
// Ollama must be running locally on port 11434

// Function to generate text using Ollama's generate API
export async function generateText(prompt: string) {
  // Send POST request to Ollama's generate endpoint
  const res = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama3", // Specify which model to use
      prompt, // The text prompt to send to the model
      stream: false, // Disable streaming for simpler response handling
    }),
  });

  // Parse the JSON response from Ollama
  const data = await res.json();

  // Return the generated text response
  return data.response as string;
}