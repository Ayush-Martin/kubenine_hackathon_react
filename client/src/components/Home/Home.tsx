import { useEffect } from "react";
import ChatArea from "../Chat/ChatArea";
import Sidebar from "./Sidebar";
import useRooms from "../../hooks/useRooms";
import useMessage from "../../hooks/useMessage";

const Home = () => {
  const { getRooms, rooms, selectRoom, setSelectRoom } = useRooms();
  const {
    getMessages,
    messages,
    sendMessage,
    deleteMessage,
    getPinnedMessages,
    pinMessage,
    pinnedMessages,
    unpinMessage,
  } = useMessage();

  useEffect(() => {
    getRooms();
  }, []);

  useEffect(() => {
    if (selectRoom) {
      getMessages(selectRoom._id, selectRoom.t);
      getPinnedMessages(selectRoom._id);
    }
  }, [selectRoom]);

  useEffect(() => {
    if (!selectRoom) return;

    const timeout = setTimeout(async () => {
      await getMessages(selectRoom._id, selectRoom.t);
      await getPinnedMessages(selectRoom._id);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [selectRoom]);

  return (
    <div className="h-screen flex bg-slate-900 overflow-hidden">
      <Sidebar
        rooms={rooms}
        selectedRoom={selectRoom}
        onSelectRoom={(room) => setSelectRoom(room)}
      />
      <ChatArea
        pinnedMessages={pinnedMessages}
        pinMessage={pinMessage}
        deleteMessage={deleteMessage}
        messages={messages}
        room={selectRoom}
        sendMessage={sendMessage}
        unPinMessage={unpinMessage}
      />
    </div>
  );
};

export default Home;
