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

  // Validate that at least one input is provided
  if (!file && !url) {
    return NextResponse.json(
      { error: "Either a file or URL must be provided" },
      { status: 400 }
    );
  }

  // Validate that both aren't provided (for now, prioritize file)
  if (file && url) {
    return NextResponse.json(
      { error: "Please provide either a file OR a URL, not both" },
      { status: 400 }
    );
  }

  // File size validation (10MB limit)
  if (file && file.size > 10 * 1024 * 1024) {
    return NextResponse.json(
      { error: "File size must be less than 10MB" },
      { status: 400 }
    );
  }

  let content = "";

  try {
    if (file) {
      // Validate file type
      if (file.type === "application/pdf") {
        content = await processPdf(file);
      } else if (file.type.startsWith("image/")) {
        const result = await processImage(file);
        content = result.content || "Image processed but no text found";
      } else if (file.type.startsWith("video/")) {
        content = await processVideo(file);
      } else {
        return NextResponse.json(
          { error: `Unsupported file type: ${file.type}` },
          { status: 400 }
        );
      }
    }

    if (url) {
      // Basic URL validation
      try {
        const urlObj = new URL(url);
        if (!['http:', 'https:'].includes(urlObj.protocol)) {
          return NextResponse.json(
            { error: "Only HTTP and HTTPS URLs are supported" },
            { status: 400 }
          );
        }
      } catch {
        return NextResponse.json(
          { error: "Invalid URL format" },
          { status: 400 }
        );
      }

      // Check if it's a YouTube URL
      if (url.includes('youtube.com') || url.includes('youtu.be')) {
        content = await processYoutube(url);
      } else {
        content = await processUrl(url);
      }
    }

    return NextResponse.json({ content });
  } catch (error) {
    console.error("Processing error:", error);

    // More specific error messages
    if (error instanceof Error) {
      if (error.message.includes('fetch')) {
        return NextResponse.json(
          { error: "Failed to fetch content from URL" },
          { status: 400 }
        );
      }
      if (error.message.includes('PDF')) {
        return NextResponse.json(
          { error: "Failed to process PDF file" },
          { status: 500 }
        );
      }
      if (error.message.includes('OCR') || error.message.includes('tesseract')) {
        return NextResponse.json(
          { error: "Failed to extract text from image" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { error: "Something went wrong processing the content" },
      { status: 500 }
    );
  }
}