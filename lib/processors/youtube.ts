// YouTube processing module for transcript extraction
// This module extracts video transcripts from YouTube videos
// Falls back to basic URL scraping if transcript is unavailable

import { YoutubeTranscript } from 'youtube-transcript';

// Function to process a YouTube URL and extract video transcript
export async function processYoutube(url: string) {
  try {
    // Extract the video ID from various YouTube URL formats
    const videoId = extractVideoId(url);
    if (!videoId) throw new Error('Invalid YouTube URL');

    // Fetch the transcript for the video
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);

    // Combine all transcript segments into a single text string
    const text = transcript.map(item => item.text).join(' ');

    // Return the combined transcript text
    return text;
  } catch (error) {
    // Log any errors that occur during transcript fetching
    console.error('Error fetching YouTube transcript:', error);

    // Fallback to basic URL processing if transcript fails
    const { processUrl } = await import('./url');
    return processUrl(url);
  }
}

// Helper function to extract video ID from various YouTube URL formats
function extractVideoId(url: string): string | null {
  // Regular expressions for different YouTube URL patterns
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/, // Standard and short URLs
    /youtube\.com\/v\/([^&\n?#]+)/ // Legacy embed format
  ];

  // Try each pattern until one matches
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1]; // Return the captured video ID
  }

  // Return null if no pattern matches
  return null;
}