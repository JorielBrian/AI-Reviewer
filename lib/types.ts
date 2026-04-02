// Type definitions for the application
// This module contains shared TypeScript type definitions used across components

// Type definition for chat messages in the conversation
export type Message = {
  role: "user" | "assistant"; // Who sent the message
  content: string; // The actual message content
};