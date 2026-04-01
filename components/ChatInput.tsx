import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RiSendPlaneFill } from "react-icons/ri";
import { FiPaperclip } from "react-icons/fi";

type Props = {
  input: string;
  setInput: (val: string) => void;
  handleSend: () => void;
  loading: boolean;
  onUploadClick: () => void; // new
};

const ChatInput = ({
  input,
  setInput,
  handleSend,
  loading,
  onUploadClick,
}: Props) => {
  return (
    <div className="flex gap-2 items-end">
      <Button
        onClick={onUploadClick}
        className="px-4 py-2 bg-white text-black shadow border border-gray-200"
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
  )
}

export default ChatInput