import { Trash2, Pin } from "lucide-react";
import { IMessage } from "../../types/message";

interface MessageItemProps {
  message: IMessage;
  onDelete: () => void;
  onPinToggle: () => void;
  isPinned: boolean; // Handles both pin and unpin
}

export default function MessageItem({
  message,
  onDelete,
  onPinToggle,
  isPinned,
}: MessageItemProps) {
  return (
    <div
      className={`flex gap-3 group -mx-3 px-3 py-2 rounded-lg transition-colors relative ${
        isPinned
          ? "bg-yellow-900/20 border-l-4 border-yellow-400"
          : "hover:bg-slate-800/30"
      }`}
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-sm font-medium text-white">
          {message.u?.username?.charAt(0).toUpperCase() || "?"}
        </div>
      </div>

      {/* Message Content */}
      <div className="flex-1 min-w-0">
        {/* Header */}
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="font-semibold text-white">
              {message.u?.username || "Unknown"}
            </span>
            <span className="text-xs text-slate-500">
              {new Date(message.ts).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={onDelete}
              className="p-1 text-slate-400 hover:text-red-500"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={onPinToggle}
              className={`p-1 ${
                isPinned
                  ? "text-yellow-400 hover:text-yellow-300"
                  : "text-slate-400 hover:text-blue-400"
              }`}
            >
              <Pin className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Message Text */}
        <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap mt-1">
          {message.msg}
        </p>

        {/* Optional pinned label */}
        {isPinned && (
          <span className="text-xs text-yellow-400 mt-1 block">📌 Pinned</span>
        )}
      </div>
    </div>
  );
}
