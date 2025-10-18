import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { IPinnedMessage } from "../../types/message";
import PinnedMessageItem from "./PinnedMessageItem";

interface PinnedMessagesPanelProps {
  pinnedMessages: IPinnedMessage[];
}

export default function PinnedMessagesPanel({
  pinnedMessages,
}: PinnedMessagesPanelProps) {
  const [expanded, setExpanded] = useState(false);

  if (pinnedMessages.length === 0) return null;

  const latestPinned = pinnedMessages[pinnedMessages.length - 1];

  return (
    <div className="sticky top-0 z-20 bg-slate-900 p-3 border-b border-yellow-500">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-yellow-400 font-semibold">
          📌 Pinned Messages
        </span>
        {pinnedMessages.length > 1 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-yellow-400 hover:text-yellow-300 text-xs flex items-center gap-1"
          >
            {expanded ? (
              <>
                <ChevronUp className="w-4 h-4" /> Collapse
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" /> Expand
              </>
            )}
          </button>
        )}
      </div>

      {/* Latest pinned always visible */}
      <PinnedMessageItem message={latestPinned} />

      {/* Older pinned messages */}
      {expanded && pinnedMessages.length > 1 && (
        <div className="mt-2 max-h-64 overflow-y-auto flex flex-col gap-2">
          {pinnedMessages.slice(0, pinnedMessages.length - 1).map((msg) => (
            <PinnedMessageItem key={msg._id} message={msg} />
          ))}
        </div>
      )}
    </div>
  );
}
