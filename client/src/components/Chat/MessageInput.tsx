import { useState } from "react";
import { Send, Smile } from "lucide-react";
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";

interface MessageInputProps {
  roomId: string;
  onMessageSent: (roomId: string, message: string) => Promise<void>;
}

export default function MessageInput({
  roomId,
  onMessageSent,
}: MessageInputProps) {
  const [message, setMessage] = useState("");
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;
    setSending(true);
    await onMessageSent(roomId, message.trim());
    setMessage("");
    setSending(false);
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setMessage((prev) => prev + emojiData.emoji);
    setEmojiPickerOpen(false);
  };

  return (
    <div className="border-t border-slate-700 p-4 relative">
      <div className="bg-slate-800 border border-slate-700 rounded-lg focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all relative">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Type your message..."
          className="w-full px-4 py-3 bg-transparent text-white placeholder-slate-500 resize-none focus:outline-none"
          rows={1}
          disabled={sending}
        />
        <div className="flex items-center justify-between px-3 pb-3">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setEmojiPickerOpen(!emojiPickerOpen)}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded"
            >
              <Smile className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={handleSend}
            disabled={!message.trim() || sending}
            className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        {emojiPickerOpen && (
          <div className="absolute bottom-16 right-4 z-50">
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              theme={Theme.DARK}
              searchDisabled={false}
              previewConfig={{ showPreview: false }}
              width={300}
              height={400}
            />
          </div>
        )}
      </div>
    </div>
  );
}
