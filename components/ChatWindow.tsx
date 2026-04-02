// Chat window component for displaying conversation messages
// This component renders the chat interface showing user and AI messages,
// loading states, and response times

"use client"; // Client-side component directive

import { Message } from "@/lib/types"; // Import message type definition
import { RxStopwatch } from "react-icons/rx"; // Icon for response time display

// Props interface for the ChatWindow component
type Props = {
  messages: Message[]; // Array of chat messages to display
  loading: boolean; // Whether AI is currently generating a response
  responseTime: number | null; // Time taken for last AI response (in seconds)
};

// ChatWindow component definition
const ChatWindow = ({ messages, loading, responseTime }: Props) => {
  return (
    // Main container with flex layout and scrolling
    <div className="flex-1 overflow-hidden flex flex-col">
      {/* Scrollable message area */}
      <div className="flex-1 overflow-y-auto mb-4">
        <div className="space-y-4">
          {/* Render each message in the conversation */}
          {messages.map((msg, index) => (
            <div
              key={index} // Unique key for React rendering
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start" // Align based on sender
              }`}
            >
              {/* Message bubble with conditional styling */}
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  msg.role === "user"
                    ? "bg-blue-500 text-white" // User messages: blue background
                    : "bg-gray-200 text-black" // AI messages: gray background
                }`}
              >
                {msg.content} {/* Display the message text */}
              </div>
            </div>
          ))}

          {/* Show thinking indicator and/or response time */}
          {(loading || responseTime !== null) && (
            <div className="flex justify-start items-center gap-2">
              {/* Loading indicator when AI is thinking */}
              {loading && (
                <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-gray-200 text-black">
                  Thinking...
                </div>
              )}

              {/* Response time display when available */}
              {responseTime !== null && (
                <span className="flex gap-1 items-center text-xs text-gray-500">
                  <RxStopwatch /> {/* Stopwatch icon */}
                  {responseTime.toFixed(2)}s {/* Formatted time with 2 decimal places */}
                </span>
              )}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;