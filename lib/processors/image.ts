import Tesseract from "tesseract.js";

export async function processImage(file: File) {
  const buffer = await file.arrayBuffer();

  const { data } = await Tesseract.recognize(
    Buffer.from(buffer),
    "eng"
  );

  return { content: data.text };
}