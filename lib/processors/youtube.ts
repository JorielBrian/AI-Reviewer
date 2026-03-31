import { YoutubeTranscript } from 'youtube-transcript';

export async function processYoutube(url: string) {
  try {
    // Extract video ID from URL
    const videoId = extractVideoId(url);
    if (!videoId) throw new Error('Invalid YouTube URL');

    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    const text = transcript.map(item => item.text).join(' ');
    return text;
  } catch (error) {
    console.error('Error fetching YouTube transcript:', error);
    // Fallback to basic URL processing
    const { processUrl } = await import('./url');
    return processUrl(url);
  }
}

function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/v\/([^&\n?#]+)/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}