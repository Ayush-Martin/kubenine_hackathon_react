import { useState } from "react";
import { IMessage } from "../types/room";

import api from "../config/axios";
import { IPinnedMessage } from "../types/message";

const useMessage = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [pinnedMessages, setPinnedMessages] = useState<IPinnedMessage[]>([]);

  const getMessages = async (roomId: string, type: "c" | "d" | "p") => {
    let url: string;

    if (type === "c") {
      url = `/channels.history`;
    } else if (type === "d") {
      url = `/dm.history`;
    } else {
      url = `/groups.history`;
    }

    try {
      const response = await api.get(`${url}?roomId=${roomId}`);
      const messages = response.data.messages;
      messages.reverse();
      setMessages(messages);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  const sendMessage = async (roomId: string, message: string) => {
    try {
      const response = await api.post(`/chat.sendMessage`, {
        message: {
          t: "e2e",
          rid: roomId,
          msg: message,
        },
      });
      setMessages((prev) => [...prev, response.data.message]);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const deleteMessage = async (roomId: string, messageId: string) => {
    try {
      const res = await api.post(`/chat.delete`, {
        roomId,
        msgId: messageId,
        asUser: false,
      });
      setMessages((prev) => prev.filter((msg) => msg._id !== messageId));
    } catch (error) {
      console.error("Failed to delete message:", error);
    }
  };

  const pinMessage = async (messageId: string) => {
    try {
      const res = await api.post(`/chat.pinMessage`, {
        messageId,
      });
      setPinnedMessages((prev) => [...prev, res.data.message]);
    } catch (error) {
      console.error("Failed to pin message:", error);
      console.log(error);
    }
  };

  const unpinMessage = async (messageId: string) => {
    try {
      await api.post(`/chat.unPinMessage`, { messageId });
      setPinnedMessages((prev) => prev.filter((msg) => msg._id !== messageId));
    } catch (error) {
      console.error("Failed to unpin message:", error);
    }
  };

  const getPinnedMessages = async (roomId: string) => {
    try {
      const res = await api.get(`/chat.getPinnedMessages?roomId=${roomId}`);
      setPinnedMessages(res.data.messages);
    } catch (error) {
      console.error("Failed to get pinned messages:", error);
    }
  };

  return {
    messages,
    getMessages,
    sendMessage,
    deleteMessage,
    pinMessage,
    getPinnedMessages,
    pinnedMessages,
    unpinMessage,
  };
};

export default useMessage;
