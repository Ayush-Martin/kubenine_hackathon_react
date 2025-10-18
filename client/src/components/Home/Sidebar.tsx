import { Hash, Lock, Plus, User, LogOut, Circle } from "lucide-react";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { IRoom } from "../../types/room";

interface SidebarProps {
  rooms: IRoom[];
  selectedRoom: IRoom | null;
  onSelectRoom: (room: IRoom) => void;
}

export default function Sidebar({
  rooms,
  selectedRoom,
  onSelectRoom,
}: SidebarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [status, setStatus] = useState<"online" | "busy" | "away" | "offline">(
    "online"
  );
  const { logout } = useAuth();

  const handleLogout = () => logout();

  const channels = rooms.filter((room) => room.t === "c" || room.t === "p");
  const dms = rooms.filter((room) => room.t === "d");

  const getRoomName = (room: IRoom) => {
    if (room.t === "d" && room.usernames)
      return (
        room.usernames.find((u) => u !== "rocket.cat") || room.usernames[0]
      );
    return room.name || "Unnamed";
  };

  return (
    <div className="w-64 bg-slate-800 flex flex-col h-full border-r border-slate-700 relative">
      {/* Top User Menu */}
      <div className="p-4 border-b border-slate-700 relative">
        <div className="flex justify-end">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative w-9 h-9 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center hover:opacity-90 transition-opacity"
          >
            <User className="w-5 h-5 text-white" />
            <div
              className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-slate-800 ${
                status === "online"
                  ? "bg-green-500"
                  : status === "busy"
                  ? "bg-red-500"
                  : status === "away"
                  ? "bg-yellow-500"
                  : "bg-slate-500"
              }`}
            />
          </button>
        </div>

        {menuOpen && (
          <div className="absolute top-16 right-4 bg-slate-700 border border-slate-600 rounded-lg shadow-lg w-56 text-sm text-white z-20">
            <div className="p-3 border-b border-slate-600">
              <div className="font-medium">John Doe</div>
              <div className="text-xs text-slate-400 capitalize">{status}</div>
            </div>
            <div className="p-2">
              <div className="text-xs text-slate-400 mb-1 px-2">Set status</div>
              {(["online", "busy", "away", "offline"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className="w-full flex items-center gap-2 px-2 py-1.5 hover:bg-slate-600 rounded"
                >
                  <Circle
                    className={`w-3 h-3 ${
                      s === "online"
                        ? "text-green-500"
                        : s === "busy"
                        ? "text-red-500"
                        : s === "away"
                        ? "text-yellow-500"
                        : "text-slate-500"
                    }`}
                  />
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
            <div className="border-t border-slate-600 p-2">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-2 py-1.5 hover:bg-red-600 rounded text-red-400 hover:text-white"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Channels and DMs */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-3">
          {/* Channels */}
          <div className="mb-4">
            <button className="flex items-center justify-between w-full text-slate-300 hover:text-white text-sm font-medium mb-2 px-2 py-1 hover:bg-slate-700 rounded transition-colors">
              <span>Channels</span>
              <Plus className="w-4 h-4" />
            </button>
            <div className="space-y-0.5">
              {channels.map((channel) => (
                <button
                  key={channel._id}
                  onClick={() => onSelectRoom(channel)}
                  className={`w-full flex items-center justify-between px-2 py-1.5 rounded text-sm transition-colors ${
                    selectedRoom?._id === channel._id
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    {channel.t === "p" ? (
                      <Lock className="w-4 h-4 flex-shrink-0" />
                    ) : (
                      <Hash className="w-4 h-4 flex-shrink-0" />
                    )}
                    <span className="truncate">{getRoomName(channel)}</span>
                  </div>
                  {channel.msgs > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
                      {channel.msgs}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Direct Messages */}
          <div>
            <button className="flex items-center justify-between w-full text-slate-300 hover:text-white text-sm font-medium mb-2 px-2 py-1 hover:bg-slate-700 rounded transition-colors">
              <span>Direct Messages</span>
              <Plus className="w-4 h-4" />
            </button>
            <div className="space-y-0.5">
              {dms.map((dm) => (
                <button
                  key={dm._id}
                  onClick={() => onSelectRoom(dm)}
                  className={`w-full flex items-center justify-between px-2 py-1.5 rounded text-sm transition-colors ${
                    selectedRoom?._id === dm._id
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <div className="relative flex-shrink-0">
                      <div className="w-6 h-6 bg-gradient-to-br from-slate-600 to-slate-700 rounded flex items-center justify-center text-xs font-medium">
                        {getRoomName(dm).charAt(0).toUpperCase()}
                      </div>
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-slate-800 bg-slate-500" />
                    </div>
                    <span className="truncate">{getRoomName(dm)}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom user block */}
      <div className="p-3 border-t border-slate-700">
        <button className="w-full flex items-center gap-3 px-2 py-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-300 hover:text-white">
          <div className="relative">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded flex items-center justify-center text-sm font-medium text-white">
              JD
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-800" />
          </div>
          <div className="flex-1 text-left">
            <div className="text-sm font-medium text-white">John Doe</div>
            <div className="text-xs text-slate-400 capitalize">{status}</div>
          </div>
        </button>
      </div>
    </div>
  );
}
