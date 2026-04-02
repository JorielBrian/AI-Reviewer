// Main page component for the AI Reviewer application
// This component provides a chat interface where users can upload content
// and ask questions about it using AI (Ollama)

"use client";

// React imports for state management and UI
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

// Custom components for the chat interface
import ChatWindow from "@/components/ChatWindow";
import ChatInput from "@/components/ChatInput";
import UploadContentModal from "@/components/UploadContentModal";

// Type definition for chat messages
type Message = {
  role: "user" | "assistant"; // Who sent the message
  content: string; // The actual message text
};

// Main component that renders the entire chat application
export default function Home() {
  // State for managing chat messages
  const [messages, setMessages] = useState<Message[]>([]);

  // State for the current input field value
  const [input, setInput] = useState("");

  // State to show loading indicator while AI is thinking
  const [loading, setLoading] = useState(false);

  // State to store the processed content from uploaded files/URLs
  const [processedContent, setProcessedContent] = useState<string>("");

  // State for uploaded file
  const [file, setFile] = useState<File | null>(null);

  // State for URL input
  const [url, setUrl] = useState("");

  // State to show loading during content processing
  const [processingContent, setProcessingContent] = useState(false);

  // State to control upload modal visibility
  const [showUploadPopup, setShowUploadPopup] = useState(false);
  const [responseTime, setResponseTime] = useState<number | null>(null);

  // State to track response time for performance monitoring
  const [responseTime, setResponseTime] = useState<number | null>(null);

  // Function to process uploaded content (files or URLs)
  async function processContent() {
    // Don't process if no file or URL provided
    if (!file && !url) return;

    // Set loading state to show processing indicator
    setProcessingContent(true);

    // Create FormData to send file/URL to the API
    const formData = new FormData();
    if (file) formData.append("file", file);
    if (url) formData.append("url", url);

    try {
      // Send request to process-content API endpoint
      const res = await fetch("/api/process-content", {
        method: "POST",
        body: formData
      });

      // Parse the response
      const data = await res.json();

      // If content was successfully processed
      if (data.content) {
        // Store the processed content
        setProcessedContent(data.content);

        // Add success message to chat
        setMessages(prev => [
          ...prev,
          {
            role: "assistant",
            content: "Content processed successfully! You can now ask me questions about it."
          }
        ]);
>>>>>>> e734d731a02b4f562c330bf3a26263ad1a3991f3
        ]);

        // Close the upload modal
        setShowUploadPopup(false);
      } else {
        // Show error message if processing failed
        setMessages(prev => [
          ...prev,
          { role: "assistant", content: data.error || "Failed to process content" }
        ]);
      }
    } catch {
      // Handle network or other errors
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: "Failed to process content" }
      ]);
    } finally {
      // Always reset loading state and clear inputs
      setProcessingContent(false);
      setFile(null);
      setUrl("");
    }
  }

  // Function to handle sending chat messages
  async function handleSend() {
    // Don't send empty messages
    if (!input.trim()) return;

    // Record start time for response time calculation
    const startTime = Date.now();

    // Set loading state
    setLoading(true);
    setResponseTime(null);

    // Check if Ollama service is running before sending message
    try {
      const check = await fetch("/api/check-ollama");
      const data = await check.json();

      // If Ollama is not running, show error message
      if (data.status !== "ok") {
        setMessages(prev => [
          ...prev,
          {
            role: "assistant",
            content: "⚠️ Ollama is not running. Please start it with `ollama run llama3` or `ollama serve`."
          }
        ]);
        ]);
        setLoading(false);
        return;
      }
    } catch {
      // Handle connection errors to Ollama check
      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: "⚠️ Failed to connect to Ollama. Please make sure it is running."
        }
      ]);
      setLoading(false);
      return;
    }

    // Check if content has been processed first
    if (!processedContent) {
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: "Please upload or process content first." }
      ]);
      setLoading(false);
      return;
    }

    // Create user message and add to chat
    const userMessage: Message = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

    // Clear input field
    setInput("");

    try {
      // Send chat request to API with recent messages and processed content
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.slice(-3), // Send last 3 messages for context
          content: processedContent.slice(0, 1000), // Limit content to 1000 chars
        }),
      });

      // Parse response
      const data = await res.json();

      // Calculate response time
      const endTime = Date.now();
      setResponseTime((endTime - startTime) / 1000); // Convert to seconds

      // Add AI response to chat
      if (data.message) {
        setMessages(prev => [
          ...prev,
          { role: "assistant", content: data.message }
        ]);
      } else {
        // Handle API errors
        setMessages(prev => [
          ...prev,
          { role: "assistant", content: data.error || "Something went wrong" }
        ]);
      }
    } catch (err) {
      // Handle network errors
      console.error(err);

      // Still calculate response time even on error
      const endTime = Date.now();
      setResponseTime((endTime - startTime) / 1000);

      // Show error message
      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: "Error: Failed to get response. Check if Ollama is running."
        }
      ]);
    } finally {
      // Always reset loading state
      setLoading(false);
    }
  }

  // Render the main UI
  return (
    // Main container with full screen layout
    <main className="flex w-full h-screen items-center justify-center p-4">
      {/* Card container for the chat interface */}
      <Card className="w-full max-w-4xl h-full flex flex-col shadow-lg">
        <CardContent className="flex-1 p-4 overflow-hidden flex flex-col">
          {/* Chat window component to display messages */}
          <ChatWindow
            messages={messages}
            loading={loading}
            responseTime={responseTime}
          />

          {/* Show content status if content is loaded */}
          {processedContent && (
            <div className="text-xs text-gray-500 mb-2">
              Content loaded ({processedContent.length} chars)
            </div>
          )}

          {/* Chat input component for user input and upload button */}
=======
  return (
    <main className="flex w-full h-screen items-center justify-center p-4">
      <Card className="w-full max-w-4xl h-full flex flex-col shadow-lg">
        <CardContent className="flex-1 p-4 overflow-hidden flex flex-col">
          <ChatWindow messages={messages} loading={loading} responseTime={responseTime} />
          {processedContent && <div className="text-xs text-gray-500 mb-2">Content loaded ({processedContent.length} chars)</div>}
>>>>>>> e734d731a02b4f562c330bf3a26263ad1a3991f3
          <ChatInput
            input={input}
            setInput={setInput}
            handleSend={handleSend}
            loading={loading}
            onUploadClick={() => setShowUploadPopup(!showUploadPopup)}
          />
        </CardContent>
      </Card>

      {/* Upload modal for content processing */}
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