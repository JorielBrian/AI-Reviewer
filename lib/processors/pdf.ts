type PdfParseResult = {
  text: string;
  numpages: number;
  info: Record<string, unknown>;
  metadata: unknown;
};

type PdfParseFn = (dataBuffer: Buffer) => Promise<PdfParseResult>;

export async function processPdf(file: File) {
  const buffer = await file.arrayBuffer();

  const pdfModule = await import("pdf-parse");

  const pdfParse: PdfParseFn =
    "default" in pdfModule
      ? (pdfModule.default as PdfParseFn)
      : (pdfModule as unknown as PdfParseFn);

  const data = await pdfParse(Buffer.from(buffer));
  return data.text;
}