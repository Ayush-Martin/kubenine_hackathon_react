import { useState } from "react";
import { Hash, Star, Users, Settings, Search } from "lucide-react";
import { IRoom } from "../../types/room";

interface ChatHeaderProps {
  room: IRoom;
}

export default function ChatHeader({ room }: ChatHeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);

  // Determine the display name
  const roomName =
    room.t === "d"
      ? room.usernames?.filter((u) => u !== "currentUser")?.join(", ") ||
        "Direct Message"
      : room.name || "Channel";

  return (
    <div className="border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Room info */}
        <div className="flex items-center gap-3">
          <Hash className="w-5 h-5 text-slate-400" />
          <h2 className="text-lg font-semibold text-white">{roomName}</h2>
          <button className="text-slate-400 hover:text-white transition-colors">
            <Star className="w-4 h-4" />
          </button>
        </div>

        {/* Actions */}
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

      {/* Search bar */}
      {searchOpen && (
        <div className="px-6 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder={`Search in #${roomName}`}
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-600 text-white placeholder-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )}
    </div>
  );
}
