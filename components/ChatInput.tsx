// Chat input component for user message input and actions
// This component provides the input field for typing messages,
// send button, and upload button for content processing

import { Input } from "@/components/ui/input"; // Reusable input component
import { Button } from "@/components/ui/button"; // Reusable button component
import { RiSendPlaneFill } from "react-icons/ri"; // Send message icon
import { FiPaperclip } from "react-icons/fi"; // Attachment/upload icon

// Props interface for the ChatInput component
type Props = {
  input: string; // Current input field value
  setInput: (val: string) => void; // Function to update input value
  handleSend: () => void; // Function to send the message
  loading: boolean; // Whether a message is being sent (disables input)
  onUploadClick: () => void; // Function to open upload modal
};

// ChatInput component definition
const ChatInput = ({
  input,
  setInput,
  handleSend,
  loading,
  onUploadClick,
}: Props) => {
  return (
    // Container for input controls with flexbox layout
    <div className="flex gap-2 items-end">
      {/* Upload/attachment button */}
      <Button
        onClick={onUploadClick} // Opens the upload content modal
        className="px-4 py-2 bg-white text-black shadow border border-gray-200"
      >
        <FiPaperclip /> {/* Paperclip icon for file attachment */}
      </Button>

      {/* Main text input field */}
      <Input
        placeholder="Ask questions about your content..." // Placeholder text
        value={input} // Controlled input value
        onChange={(e) => setInput(e.target.value)} // Update input on change
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSend(); // Send on Enter key press
        }}
        disabled={loading} // Disable input while sending
      />

      {/* Send message button */}
      <Button
        onClick={handleSend} // Send the current message
        disabled={loading || !input.trim()} // Disable if loading or input is empty
        className="input-button"
      >
        <RiSendPlaneFill /> {/* Send icon */}
      </Button>
    </div>
  );
};

export default ChatInput;
