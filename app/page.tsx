"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

import ChatWindow from "@/components/ChatWindow";
import ChatInput from "@/components/ChatInput";
import UploadContentModal from "@/components/UploadContentModal";

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
  const [responseTime, setResponseTime] = useState<number | null>(null);

  async function processContent() {
    if (!file && !url) return;
    setProcessingContent(true);

    const formData = new FormData();
    if (file) formData.append("file", file);
    if (url) formData.append("url", url);

    try {
      const res = await fetch("/api/process-content", { method: "POST", body: formData });
      const data = await res.json();

      if (data.content) {
        setProcessedContent(data.content);
        setMessages(prev => [
          ...prev,
          { role: "assistant", content: "Content processed successfully! You can now ask me questions about it." }
        ]);
        setShowUploadPopup(false);
      } else {
        setMessages(prev => [
          ...prev,
          { role: "assistant", content: data.error || "Failed to process content" }
        ]);
      }
    } catch {
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: "Failed to process content" }
      ]);
    } finally {
      setProcessingContent(false);
      setFile(null);
      setUrl("");
    }
  }

  async function handleSend() {
    if (!input.trim()) return;

    const startTime = Date.now();
    setLoading(true);
    setResponseTime(null);

    // Check if Ollama is running
    try {
      const check = await fetch("/api/check-ollama");
      const data = await check.json();
      if (data.status !== "ok") {
        setMessages(prev => [
          ...prev,
          { role: "assistant", content: "⚠️ Ollama is not running. Please start it with `ollama run llama3` or `ollama serve`." }
        ]);
        setLoading(false);
        return;
      }
    } catch {
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: "⚠️ Failed to connect to Ollama. Please make sure it is running." }
      ]);
      setLoading(false);
      return;
    }

    if (!processedContent) {
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: "Please upload or process content first." }
      ]);
      setLoading(false);
      return;
    }

    const userMessage: Message = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");

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
      const endTime = Date.now();
      setResponseTime((endTime - startTime) / 1000); // store seconds

      if (data.message) {
        setMessages(prev => [...prev, { role: "assistant", content: data.message }]);
      } else {
        setMessages(prev => [...prev, { role: "assistant", content: data.error || "Something went wrong" }]);
      }
    } catch (err) {
      console.error(err);
      const endTime = Date.now();
      setResponseTime((endTime - startTime) / 1000);

      setMessages(prev => [
        ...prev,
        { role: "assistant", content: "Error: Failed to get response. Check if Ollama is running." }
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex w-full h-screen items-center justify-center p-4">
      <Card className="w-full max-w-4xl h-full flex flex-col shadow-lg">
        <CardContent className="flex-1 p-4 overflow-hidden flex flex-col">
          <ChatWindow messages={messages} loading={loading} responseTime={responseTime} />
          {processedContent && <div className="text-xs text-gray-500 mb-2">Content loaded ({processedContent.length} chars)</div>}
          <ChatInput
            input={input}
            setInput={setInput}
            handleSend={handleSend}
            loading={loading}
            onUploadClick={() => setShowUploadPopup(!showUploadPopup)}
          />
        </CardContent>
      </Card>

      <UploadContentModal
        show={showUploadPopup}
        setShow={setShowUploadPopup}
        file={file}
        setFile={setFile}
        url={url}
        setUrl={setUrl}
        processContent={processContent}
        processingContent={processingContent}
        processedContent={processedContent}
      />
    </main>
  );
}