// API route for processing uploaded content (files and URLs)
// This endpoint handles different content types:
// - PDF files: extracts text using pdf-parse
// - Images: extracts text using Tesseract OCR
// - Videos: placeholder (not implemented)
// - URLs: scrapes webpage content
// - YouTube URLs: extracts video transcripts

import { NextRequest, NextResponse } from "next/server";
import { processVideo } from "@/lib/processors/video";
import { processImage } from "@/lib/processors/image";
import { processUrl } from "@/lib/processors/url";
import { processPdf } from "@/lib/processors/pdf";
import { processYoutube } from "@/lib/processors/youtube";

// POST handler for content processing requests
export async function POST(req: NextRequest) {
  // Extract form data from the request
  const formData = await req.formData();

  // Get file and URL from form data
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

  // Variable to store the processed content
  let content = "";

  try {
    // Process file if provided
    if (file) {
      // Route to appropriate processor based on file type
      if (file.type === "application/pdf") {
        // Extract text from PDF using pdf-parse library
        content = await processPdf(file);
      } else if (file.type.startsWith("image/")) {
        // Extract text from image using Tesseract OCR
        const result = await processImage(file);
        content = result.content || "Image processed but no text found";
      } else if (file.type.startsWith("video/")) {
        // Process video (currently just returns a message)
        content = await processVideo(file);
      } else {
        // Return error for unsupported file types
        return NextResponse.json(
          { error: `Unsupported file type: ${file.type}` },
          { status: 400 }
        );
      }
    }

    // Process URL if provided
    if (url) {
      // Basic URL validation to ensure it's a valid web URL
      try {
        const urlObj = new URL(url);

        // Only allow HTTP and HTTPS protocols for security
        if (!['http:', 'https:'].includes(urlObj.protocol)) {
          return NextResponse.json(
            { error: "Only HTTP and HTTPS URLs are supported" },
            { status: 400 }
          );
        }
      } catch {
        // Handle invalid URL format
        return NextResponse.json(
          { error: "Invalid URL format" },
          { status: 400 }
        );
      }

      // Route to appropriate processor based on URL type
      if (url.includes('youtube.com') || url.includes('youtu.be')) {
        // Extract transcript from YouTube video
        content = await processYoutube(url);
      } else {
        // Scrape content from regular webpage
        content = await processUrl(url);
      }
    }

    // Return the processed content
    return NextResponse.json({ content });
  } catch (error) {
    // Log the error for debugging
    console.error("Processing error:", error);

    // Provide specific error messages based on error type
    if (error instanceof Error) {
      if (error.message.includes('fetch')) {
        // Network error when fetching URL
        return NextResponse.json(
          { error: "Failed to fetch content from URL" },
          { status: 400 }
        );
      }
      if (error.message.includes('PDF')) {
        // PDF processing error
        return NextResponse.json(
          { error: "Failed to process PDF file" },
          { status: 500 }
        );
      }
      if (error.message.includes('OCR') || error.message.includes('tesseract')) {
        // OCR processing error for images
        return NextResponse.json(
          { error: "Failed to extract text from image" },
          { status: 500 }
        );
      }
    }

    // Generic error for unhandled cases
    return NextResponse.json(
      { error: "Something went wrong processing the content" },
      { status: 500 }
    );
  }
}