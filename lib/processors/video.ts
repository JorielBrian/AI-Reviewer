// /lib/processors/video.ts
import { openai } from "../openai";

export async function processVideo(file: File) {
  const transcription = await openai.audio.transcriptions.create({
    file,
    model: "gpt-4o-transcribe",
  });

  return transcription.text;
}