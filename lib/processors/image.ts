import { openai } from "../openai";

export async function processImage(file: File, prompt: string) {
  const bytes = await file.arrayBuffer();
  const base64 = Buffer.from(bytes).toString("base64");

  const dataUrl = `data:${file.type};base64,${base64}`;

  const res = await openai.responses.create({
    model: "gpt-4.1",
    input: [
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: prompt,
          },
          {
            type: "input_image",
            image_url: dataUrl,
            detail: "auto",
          },
        ],
      },
    ],
  });

  return { content: res.output_text };
}