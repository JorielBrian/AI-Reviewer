// /lib/processors/url.ts
import * as cheerio from "cheerio";

export async function processUrl(url: string) {
  const res = await fetch(url);
  const html = await res.text();

  const $ = cheerio.load(html);

  const text = $("body").text();

  return text.slice(0, 10000);
}