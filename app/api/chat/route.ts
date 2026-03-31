import { NextRequest, NextResponse } from "next/server";
import { openai } from "@/lib/openai";

export async function POST(req: NextRequest) {
  try {
    const { messages, content } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages array is required" }, { status: 400 });
    }

    const systemMessage = content
      ? {
          role: "system",
          content: `You are an AI assistant that helps users understand and analyze content. The user has provided the following content for analysis: ${content.slice(0, 10000)}. Answer questions about this content and provide insights.`
        }
      : {
          role: "system",
          content: "You are a helpful AI assistant."
        };

    const res = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [systemMessage, ...messages],
      stream: false,
    });

    const aiMessage = res.choices[0].message.content ?? "";

    return NextResponse.json({ message: aiMessage });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}