"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// Icons
import { FiPaperclip } from "react-icons/fi";
import { RiSendPlaneFill } from "react-icons/ri";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [processedContent, setProcessedContent] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState("");
  const [processingContent, setProcessingContent] = useState(false);
  const [showUploadPopup, setShowUploadPopup] = useState(false);

  async function processContent() {
    if (!file && !url) return;

    setProcessingContent(true);
    const formData = new FormData();
    if (file) formData.append("file", file);
    if (url) formData.append("url", url);

    try {
      const res = await fetch("/api/process-content", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.content) {
        setProcessedContent(data.content);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Content processed successfully! You can now ask me questions about it.",
          },
        ]);
        setShowUploadPopup(false);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.error || "Failed to process content",
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Failed to process content",
        },
      ]);
    } finally {
      setProcessingContent(false);
      setFile(null);
      setUrl("");
    }

  }

  async function handleSend() {
  if (!input.trim()) return;

  // 1️⃣ Check if Ollama is running
  try {
    const check = await fetch("/api/check-ollama");
    const data = await check.json();
    if (data.status !== "ok") {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "⚠️ Ollama is not running. Please start it with `ollama run llama3` or `ollama serve`.",
        },
      ]);
      return;
    }
  } catch {
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content:
          "⚠️ Failed to connect to Ollama. Please make sure it is running.",
      },
    ]);
    return;
  }

  if (!processedContent) {
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: "Please upload or process content first.",
      },
    ]);
    return;
  }

  const userMessage: Message = { role: "user", content: input };
  const updatedMessages = [...messages, userMessage];

  setMessages(updatedMessages);
  setInput("");
  setLoading(true);

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: updatedMessages.slice(-5),
        content: processedContent.slice(0, 3000),
      }),
    });

    const data = await res.json();

    if (data.message) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message },
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.error || "Something went wrong" },
      ]);
    }
  } catch (err) {
    console.error(err);
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content:
          "Error: Failed to get response. Check if Ollama is running.",
      },
    ]);
  } finally {
    setLoading(false);
  }
}

  return ( 
    <main className="flex w-full h-screen items-center justify-center p-4"> 
      <Card className="w-full max-w-4xl h-full flex flex-col shadow-lg"> 
        <CardContent className="flex-1 p-4 overflow-hidden flex flex-col">
          {/* Chat Section */} 
          <div className="flex-1 overflow-hidden flex flex-col"> 
            <div className="flex-1 overflow-y-auto mb-4"> 
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${ msg.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-black" }`}
                    >
                      {msg.content} 
                    </div> 
                  </div>
                ))}
                {loading && ( 
                  <div className="flex justify-start"> 
                    <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-gray-200 text-black">
                    Thinking... 
                    </div> 
                  </div>
                )} 
              </div> 
            </div>

            {/* Content Indicator */}
            {processedContent && (
              <div className="text-xs text-gray-500 mb-2">
                Content loaded ({processedContent.length} chars)
              </div>
            )}

            {/* Input Section */}
            <div className="flex gap-2 items-end">
              <Button
                onClick={() => setShowUploadPopup(!showUploadPopup)}
                className="input-button px-4 py-2 bg-white text-black shadow-2xl border border-gray-200"
                title="Upload content"
              >
                <FiPaperclip />
              </Button>

              <Input
                placeholder="Ask questions about your content..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
                disabled={loading}
              />

              <Button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="input-button"
              >
                <RiSendPlaneFill />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upload Content Popup Modal */}
      {showUploadPopup && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                  Upload Content
                </h3>
                <button
                  onClick={() => setShowUploadPopup(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
                >
                  ×
                </button>
              </div>

              <div className="flex flex-col gap-3">
                <input
                  type="file"
                  accept=".pdf,image/*,video/*"
                  onChange={(e) =>
                    setFile(e.target.files?.[0] || null)
                  }
                  className="w-full p-2 border rounded"
                />

                <Input
                  placeholder="Enter YouTube URL or website URL"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />

                <Button
                  onClick={processContent}
                  disabled={
                    processingContent || (!file && !url)
                  }
                >
                  {processingContent
                    ? "Processing..."
                    : "Process Content"}
                </Button>
              </div>

              {processedContent && (
                <p className="text-sm text-green-600 mt-3">
                  Content loaded and ready for questions!
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </main>
  );
}
