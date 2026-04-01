import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Ollama default HTTP API
    const res = await fetch("http://localhost:11434");
    if (res.ok) {
      return NextResponse.json({ status: "ok" });
    }
    return NextResponse.json({ status: "offline" }, { status: 503 });
  } catch {
    return NextResponse.json({ status: "offline" }, { status: 503 });
  }
}