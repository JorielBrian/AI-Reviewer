import { NextRequest, NextResponse } from "next/server";
import { generateText } from "@/lib/services/ollama";

type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

export async function POST(req: NextRequest) {
  try {
    const { messages, content }: { messages: ChatMessage[]; content?: string } =
      await req.json();

    const conversation = messages
      .map((m) => `${m.role}: ${m.content}`)
      .join("\n");

    const prompt = `
You are a helpful AI assistant.

${content ? `Context:\n${content.slice(0, 8000)}\n` : ""}

Conversation:
${conversation}

Answer the latest user question.
`;

    const response = await generateText(prompt);

    return NextResponse.json({ message: response });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}