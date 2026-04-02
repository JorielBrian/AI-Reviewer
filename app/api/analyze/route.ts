// API route for AI-powered content analysis
// This endpoint processes content and asks AI questions about it
// Supports images (OCR), videos (placeholder), and URLs (scraping)

import { NextRequest, NextResponse } from "next/server";
import { processVideo } from "@/lib/processors/video";
import { processImage } from "@/lib/processors/image";
import { processUrl } from "@/lib/processors/url";
import { askAI } from "@/lib/services/askAI";

// POST handler for content analysis requests
export async function POST(req: NextRequest) {
  // Extract form data from the request
  const formData = await req.formData();

  // Get file, URL, and analysis prompt from form data
  const file = formData.get("file") as File | null;
  const url = formData.get("url") as string | null;
  const prompt = formData.get("prompt") as string;

  // Variable to store processed content
  let content = "";

  try {
    // Process file if provided
    if (file) {
      // Special handling for images - return OCR result directly
      if (file.type.startsWith("image")) {
        const result = await processImage(file);
        return NextResponse.json({ result: result.content });
      }

      // Process video files (currently returns placeholder message)
      if (file.type.startsWith("video")) {
        content = await processVideo(file);
      }
    }

    // Process URL if provided
    if (url) {
      content = await processUrl(url);
    }

    // Send content and prompt to AI for analysis
    const result = await askAI(content, prompt);

    // Return the AI analysis result
    return NextResponse.json({ result });
  } catch (error) {
    // Log any errors that occur during processing
    console.error(error);

    // Return generic error response
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}