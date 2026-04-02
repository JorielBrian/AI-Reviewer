// URL processing module for web scraping
// This module fetches webpage content and extracts readable text
// Uses cheerio for HTML parsing and text extraction

import * as cheerio from "cheerio";

// Function to process a URL and extract text content from the webpage
export async function processUrl(url: string) {
  // Fetch the webpage content
  const res = await fetch(url);

  // Get the HTML content as text
  const html = await res.text();

  // Load HTML into cheerio for jQuery-like DOM manipulation
  const $ = cheerio.load(html);

  // Extract text content from the body element
  // This removes HTML tags and gets readable text
  const text = $("body").text();

  // Limit the text to 10,000 characters to prevent extremely long content
  return text.slice(0, 10000);
}