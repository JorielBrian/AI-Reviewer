import { NextRequest, NextResponse } from "next/server";
import { processVideo } from "@/lib/processors/video";
import { processImage } from "@/lib/processors/image";
import { processUrl } from "@/lib/processors/url";
import { processPdf } from "@/lib/processors/pdf";
import { processYoutube } from "@/lib/processors/youtube";

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const file = formData.get("file") as File | null;
  const url = formData.get("url") as string | null;

  let content = "";

  try {
    if (file) {
      if (file.type === "application/pdf") {
        content = await processPdf(file);
      } else if (file.type.startsWith("image")) {
        const result = await processImage(file, "Extract and describe the content of this image");
        content = result.content || "Image processed";
      } else if (file.type.startsWith("video")) {
        content = await processVideo(file);
      }
    }

    if (url) {
      // Check if it's a YouTube URL
      if (url.includes('youtube.com') || url.includes('youtu.be')) {
        content = await processYoutube(url);
      } else {
        content = await processUrl(url);
      }
    }

    return NextResponse.json({ content });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong processing the content" },
      { status: 500 }
    );
  }
}