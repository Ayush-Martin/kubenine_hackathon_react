import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageItem from "./MessageItem";
import MessageInput from "./MessageInput";
import PinnedMessagesPanel from "./PinnedMessagePannel";
import { IMessage, IPinnedMessage } from "../../types/message";
import { IRoom } from "../../types/room";

interface IChatAreaProps {
  messages: IMessage[];
  room: IRoom | null;
  sendMessage: (roomId: string, message: string) => Promise<void>;
  deleteMessage: (roomId: string, messageId: string) => Promise<void>;
  pinnedMessages: IPinnedMessage[];
  pinMessage: (messageId: string) => Promise<void>;
  unPinMessage: (messageId: string) => Promise<void>;
}

export default function ChatArea({
  messages,
  room,
  sendMessage,
  deleteMessage,
  pinnedMessages = [],
  pinMessage,
  unPinMessage,
}: IChatAreaProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, room]);

  return (
    <div className="flex-1 flex flex-col bg-slate-900 h-full relative">
      {room && <ChatHeader room={room} />}

      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 relative">
        {/* Sticky read-only pinned messages */}
        <PinnedMessagesPanel pinnedMessages={pinnedMessages} />

        {/* Normal Messages */}
        {messages.map((msg) => (
          <MessageItem
            key={msg._id}
            message={msg}
            onDelete={() => deleteMessage(room?._id || "", msg._id)}
            onPinToggle={() =>
              pinnedMessages.some((m) => m._id === msg._id)
                ? unPinMessage(msg._id)
                : pinMessage(msg._id)
            }
            isPinned={pinnedMessages.some((m) => m._id === msg._id)}
          />
        ))}

        <div ref={messagesEndRef} />
      </div>

      {room && <MessageInput onMessageSent={sendMessage} roomId={room._id} />}
    </div>
  );
}
