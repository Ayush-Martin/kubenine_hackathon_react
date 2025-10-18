import { useState } from "react";
import ChatArea from "./ChatArea";
import Sidebar from "./Sidebar";

const Home = () => {
  const [selectedChannel, setSelectedChannel] = useState("1");

  return (
    <div className="h-screen flex bg-slate-900 overflow-hidden">
      <Sidebar
        selectedChannel={selectedChannel}
        onSelectChannel={setSelectedChannel}
      />
      <ChatArea />
    </div>
  );
};

export default Home;
