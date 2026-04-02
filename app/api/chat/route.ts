// API route for handling chat messages with AI
// This endpoint processes user messages and generates AI responses
// using the Ollama service with context from processed content

import { NextRequest, NextResponse } from "next/server";
import { generateText } from "@/lib/services/ollama";

// Type definition for chat messages
type ChatMessage = {
  role: "user" | "assistant" | "system"; // Who sent the message
  content: string; // The message content
};

// POST handler for chat requests
export async function POST(req: NextRequest) {
  try {
    // Extract messages and optional content from request body
    const { messages, content }: { messages: ChatMessage[]; content?: string } =
      await req.json();

    // Convert messages array to conversation string format
    const conversation = messages
      .map((m) => `${m.role}: ${m.content}`)
      .join("\n");

    // Create the AI prompt with context and conversation
    const prompt = `
You are a helpful AI assistant.

${content ? `Context:\n${content.slice(0, 8000)}\n` : ""}

Conversation:
${conversation}

Answer the latest user question.
`;

    // Generate response using Ollama service
    const response = await generateText(prompt);

    // Return the AI response
    return NextResponse.json({ message: response });
  } catch (error) {
    // Log any errors that occur
    console.error(error);

    // Return error response
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}