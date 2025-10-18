import { IPinnedMessage } from "../../types/message";
import { Pin } from "lucide-react";

interface PinnedMessageItemProps {
  message: IPinnedMessage;
}

export default function PinnedMessageItem({ message }: PinnedMessageItemProps) {
  return (
    <div className="bg-yellow-800/30 border-l-4 border-yellow-400 rounded-lg p-3 flex flex-col gap-1 shadow-sm hover:bg-yellow-800/50 transition-colors">
      <div className="flex items-center gap-2">
        <Pin className="w-5 h-5 text-yellow-400" />
        <span className="font-semibold text-white">
          {message.u?.username || "Unknown"}
        </span>
        <span className="text-xs text-slate-300 ml-auto">
          {new Date(message.ts).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
      <p className="text-slate-200 text-sm">{message.msg}</p>
      {message.pinnedBy && (
        <span className="text-xs text-yellow-300">
          Pinned by {message.pinnedBy.username}
        </span>
      )}
    </div>
  );
}
