import { openai } from "../openai";

export async function askAI(content: string, prompt: string) {
  const res = await openai.chat.completions.create({
    model: "gpt-4.1",
    messages: [
      {
        role: "system",
        content: "You analyze and extract useful information from content.",
      },
      {
        role: "user",
        content: `CONTENT:\n${content}\n\nREQUEST:\n${prompt}`,
      },
    ],
  });

  return res.choices[0].message.content ?? "";
}