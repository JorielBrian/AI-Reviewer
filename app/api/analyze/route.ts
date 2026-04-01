import { NextRequest, NextResponse } from "next/server";
import { processVideo } from "@/lib/processors/video";
import { processImage } from "@/lib/processors/image";
import { processUrl } from "@/lib/processors/url";
import { askAI } from "@/lib/services/askAI";

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const file = formData.get("file") as File | null;
  const url = formData.get("url") as string | null;
  const prompt = formData.get("prompt") as string;

  let content = "";

  try {
    if (file) {
      if (file.type.startsWith("image")) {
        const result = await processImage(file);
        return NextResponse.json({ result: result.content });
      }

      if (file.type.startsWith("video")) {
        content = await processVideo(file);
      }
    }

    if (url) {
      content = await processUrl(url);
    }

    const result = await askAI(content, prompt);

    return NextResponse.json({ result });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}