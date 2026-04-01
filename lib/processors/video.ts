// /lib/processors/video.ts

export async function processVideo(file: File) {
  // For now, return a helpful message with file info
  const fileInfo = `Video file: ${file.name} (${(file.size / (1024 * 1024)).toFixed(2)} MB, ${file.type})`;

  return `Video processing is not yet implemented. ${fileInfo}

To analyze this video, please:
1. Upload a transcript file (.txt, .srt, .vtt)
2. Use a YouTube link if the video is available on YouTube
3. Or provide a text summary of the video content`;
}