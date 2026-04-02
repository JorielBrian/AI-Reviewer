// Image processing module using OCR (Optical Character Recognition)
// This module extracts text from images using Tesseract.js
// Supports various image formats (PNG, JPEG, etc.)

import Tesseract from "tesseract.js";

// Function to process an image file and extract text using OCR
export async function processImage(file: File) {
  // Convert the File object to ArrayBuffer for processing
  const buffer = await file.arrayBuffer();

  // Use Tesseract to recognize text in the image
  // Parameters: image buffer, language (English)
  const { data } = await Tesseract.recognize(
    Buffer.from(buffer), // Convert ArrayBuffer to Buffer
    "eng" // Language code for English
  );

  // Return the extracted text content
  return { content: data.text };
}