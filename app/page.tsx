"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// import { GoPaperclip } from "react-icons/go";
import { BsPlusCircleFill } from "react-icons/bs";
import { BsPlusCircle } from "react-icons/bs";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState("");
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // Toggle for showing file/url inputs
  const [showAdvanced, setShowAdvanced] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    const formData = new FormData();
    if (file) formData.append("file", file);
    if (url) formData.append("url", url);
    formData.append("prompt", prompt);

    const res = await fetch("/api/analyze", { method: "POST", body: formData });
    const data = await res.json();
    setResult(data.result || data.error);
    setLoading(false);
  }

  return (
    <main className="flex w-full h-200 items-start justify-center space-y-6">
      <div className="flex w-1/2 *:w-full h-full items-start">
        <Card className="flex h-full justify-between border border-gray-300 shadow-2xl">
          <CardContent className="flex space-y-4">
            {result && (
              <Card>
                <CardHeader>
                  <CardTitle>AI Response</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="whitespace-pre-wrap">{result}</pre>
                </CardContent>
              </Card>
            )}
            {/* Advanced inputs */}
            {showAdvanced && (
              <div className="flex flex-col gap-3">
                <input
                  type="file"
                  className="w-full p-4 rounded-2xl border"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
                <Input
                  placeholder="Enter URL"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
            )}
          </CardContent>
          <CardFooter className="flex gap-3">

            {/* Toggle button for advanced inputs */}
            <Button
              variant="outline"
              onClick={() => setShowAdvanced((prev) => !prev)}
              className="size-12 border-none shadow-none"
            >
              {showAdvanced ? <BsPlusCircle className="size-6" /> : <BsPlusCircleFill className="size-6" />}
            </Button>


            <Textarea
              placeholder="Enter your prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />

            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Processing..." : "Send"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}