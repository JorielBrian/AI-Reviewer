// PDF processing module for text extraction
// This module extracts text content from PDF files using pdf-parse library
// Supports text-based PDFs (may not work well with image-based PDFs)

// Type definition for the result returned by pdf-parse
type PdfParseResult = {
  text: string; // The extracted text content
  numpages: number; // Number of pages in the PDF
  info: Record<string, unknown>; // PDF metadata information
  metadata: unknown; // Additional metadata
};

// Type definition for the pdf-parse function
type PdfParseFn = (dataBuffer: Buffer) => Promise<PdfParseResult>;

// Function to process a PDF file and extract its text content
export async function processPdf(file: File) {
  // Convert the File object to ArrayBuffer
  const buffer = await file.arrayBuffer();

  // Dynamically import pdf-parse to avoid bundling issues
  const pdfModule = await import("pdf-parse");

  // Handle different export patterns (CommonJS vs ES modules)
  const pdfParse: PdfParseFn =
    "default" in pdfModule
      ? (pdfModule.default as PdfParseFn) // ES module export
      : (pdfModule as unknown as PdfParseFn); // CommonJS export

  // Parse the PDF and extract text
  const data = await pdfParse(Buffer.from(buffer));

  // Return only the extracted text content
  return data.text;
}