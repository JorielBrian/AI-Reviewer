"use client";

import { Message } from "@/lib/types";

type Props = {
  messages: Message[];
  loading: boolean;
  responseTime: number | null;
};

const ChatWindow = ({ messages, loading, responseTime }: Props) => {
  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      <div className="flex-1 overflow-y-auto mb-4">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  msg.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start items-center gap-2">
              <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-gray-200 text-black">
                Thinking...
              </div>
              {responseTime !== null && (
                <span className="text-xs text-gray-900">
                  ⏱ {responseTime.toFixed(2)}s
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