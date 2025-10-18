import {
  Hash,
  Lock,
  ChevronDown,
  Plus,
  MessageSquare,
  Users,
  Search,
} from "lucide-react";

interface Channel {
  id: string;
  name: string;
  isPrivate?: boolean;
  unread?: number;
}

interface DirectMessage {
  id: string;
  name: string;
  status: "online" | "offline" | "away";
  unread?: number;
}

const channels: Channel[] = [
  { id: "1", name: "general", unread: 3 },
  { id: "2", name: "random" },
  { id: "3", name: "design-team", unread: 7 },
  { id: "4", name: "development" },
  { id: "5", name: "marketing", isPrivate: true },
];

const directMessages: DirectMessage[] = [
  { id: "1", name: "Sarah Chen", status: "online", unread: 2 },
  { id: "2", name: "Mike Johnson", status: "away" },
  { id: "3", name: "Emily Davis", status: "online" },
  { id: "4", name: "Alex Turner", status: "offline" },
];

interface SidebarProps {
  selectedChannel: string;
  onSelectChannel: (id: string) => void;
}

export default function Sidebar({
  selectedChannel,
  onSelectChannel,
}: SidebarProps) {
  return (
    <div className="w-64 bg-slate-800 flex flex-col h-full border-r border-slate-700">
      <div className="p-4 border-b border-slate-700">
        <button className="w-full flex items-center justify-between text-white hover:bg-slate-700 p-2 rounded-lg transition-colors">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center font-bold text-white">
              W
            </div>
            <span className="font-semibold">Workspace</span>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-3">
          <div className="mb-4">
            <button className="flex items-center justify-between w-full text-slate-300 hover:text-white text-sm font-medium mb-2 px-2 py-1 hover:bg-slate-700 rounded transition-colors">
              <span>Channels</span>
              <Plus className="w-4 h-4" />
            </button>
            <div className="space-y-0.5">
              {channels.map((channel) => (
                <button
                  key={channel.id}
                  onClick={() => onSelectChannel(channel.id)}
                  className={`w-full flex items-center justify-between px-2 py-1.5 rounded text-sm transition-colors ${
                    selectedChannel === channel.id
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    {channel.isPrivate ? (
                      <Lock className="w-4 h-4 flex-shrink-0" />
                    ) : (
                      <Hash className="w-4 h-4 flex-shrink-0" />
                    )}
                    <span className="truncate">{channel.name}</span>
                  </div>
                  {channel.unread && (
                    <span className="bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
                      {channel.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div>
            <button className="flex items-center justify-between w-full text-slate-300 hover:text-white text-sm font-medium mb-2 px-2 py-1 hover:bg-slate-700 rounded transition-colors">
              <span>Direct Messages</span>
              <Plus className="w-4 h-4" />
            </button>
            <div className="space-y-0.5">
              {directMessages.map((dm) => (
                <button
                  key={dm.id}
                  onClick={() => onSelectChannel(`dm-${dm.id}`)}
                  className={`w-full flex items-center justify-between px-2 py-1.5 rounded text-sm transition-colors ${
                    selectedChannel === `dm-${dm.id}`
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <div className="relative flex-shrink-0">
                      <div className="w-6 h-6 bg-gradient-to-br from-slate-600 to-slate-700 rounded flex items-center justify-center text-xs font-medium">
                        {dm.name.charAt(0)}
                      </div>
                      <div
                        className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-slate-800 ${
                          dm.status === "online"
                            ? "bg-green-500"
                            : dm.status === "away"
                            ? "bg-yellow-500"
                            : "bg-slate-500"
                        }`}
                      />
                    </div>
                    <span className="truncate">{dm.name}</span>
                  </div>
                  {dm.unread && (
                    <span className="bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
                      {dm.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

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
            <div className="text-xs text-slate-400">Active</div>
          </div>
        </button>
      </div>
    </div>
  );
}
