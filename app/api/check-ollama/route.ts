// API route to check if Ollama service is running
// This endpoint pings the Ollama server to verify it's available
// before allowing users to send chat messages

import { NextResponse } from "next/server";

// GET handler to check Ollama service status
export async function GET() {
  try {
    // Attempt to connect to Ollama's default HTTP API endpoint
    // Ollama runs on localhost:11434 by default
    const res = await fetch("http://localhost:11434");

    // If the response is successful (status 200-299)
    if (res.ok) {
      // Return success status
      return NextResponse.json({ status: "ok" });
    }

    // If response is not ok, Ollama is running but not responding properly
    return NextResponse.json({ status: "offline" }, { status: 503 });
  } catch {
    // If fetch throws an error, Ollama is not running or not accessible
    return NextResponse.json({ status: "offline" }, { status: 503 });
  }
}