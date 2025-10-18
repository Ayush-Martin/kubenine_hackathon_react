import { useState } from "react";
import {
  Hash,
  Star,
  Users,
  Settings,
  Search,
  Send,
  Smile,
  Paperclip,
  AtSign,
} from "lucide-react";

interface Message {
  id: string;
  author: string;
  avatar: string;
  timestamp: string;
  content: string;
  reactions?: { emoji: string; count: number }[];
}

const messages: Message[] = [
  {
    id: "1",
    author: "Sarah Chen",
    avatar: "SC",
    timestamp: "9:42 AM",
    content:
      "Hey everyone! Just finished the new feature implementation. Ready for review.",
    reactions: [
      { emoji: "👍", count: 3 },
      { emoji: "🎉", count: 2 },
    ],
  },
  {
    id: "2",
    author: "Mike Johnson",
    avatar: "MJ",
    timestamp: "9:45 AM",
    content: "Awesome work! I'll take a look at it this afternoon.",
  },
  {
    id: "3",
    author: "Emily Davis",
    avatar: "ED",
    timestamp: "9:50 AM",
    content: "I noticed a small bug in the dashboard. Creating a ticket now.",
  },
  {
    id: "4",
    author: "Alex Turner",
    avatar: "AT",
    timestamp: "10:15 AM",
    content:
      "Quick question - are we using the new API endpoints for authentication?",
    reactions: [{ emoji: "🤔", count: 1 }],
  },
];

export default function ChatArea() {
  const [message, setMessage] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSend = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-900 h-full">
      <div className="border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <Hash className="w-5 h-5 text-slate-400" />
            <h2 className="text-lg font-semibold text-white">general</h2>
            <button className="text-slate-400 hover:text-white transition-colors">
              <Star className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
              <Users className="w-5 h-5" />
            </button>
            <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
        {searchOpen && (
          <div className="px-6 pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search in #general"
                className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-600 text-white placeholder-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="flex gap-3 group hover:bg-slate-800/30 -mx-3 px-3 py-2 rounded-lg transition-colors"
          >
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-sm font-medium text-white">
                {msg.avatar}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-semibold text-white">{msg.author}</span>
                <span className="text-xs text-slate-500">{msg.timestamp}</span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                {msg.content}
              </p>
              {msg.reactions && (
                <div className="flex gap-2 mt-2">
                  {msg.reactions.map((reaction, idx) => (
                    <button
                      key={idx}
                      className="flex items-center gap-1 px-2 py-1 bg-slate-800 border border-slate-700 hover:border-blue-500 rounded-full text-xs transition-colors"
                    >
                      <span>{reaction.emoji}</span>
                      <span className="text-slate-400">{reaction.count}</span>
                    </button>
                  ))}
                  <button className="flex items-center justify-center w-7 h-7 bg-slate-800 border border-slate-700 hover:border-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <Smile className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-700 p-4">
        <div className="bg-slate-800 border border-slate-700 rounded-lg focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Message #general"
            className="w-full px-4 py-3 bg-transparent text-white placeholder-slate-500 resize-none focus:outline-none"
            rows={1}
          />
          <div className="flex items-center justify-between px-3 pb-3">
            <div className="flex items-center gap-1">
              <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors">
                <Paperclip className="w-4 h-4" />
              </button>
              <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors">
                <Smile className="w-4 h-4" />
              </button>
              <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors">
                <AtSign className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={handleSend}
              disabled={!message.trim()}
              className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
