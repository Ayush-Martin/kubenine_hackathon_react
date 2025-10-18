import { useEffect, useState } from "react";
import api from "../config/axios";
import { IRoom } from "../types/room";

const useRooms = () => {
  const [rooms, setRooms] = useState<Array<IRoom>>([]);
  const [selectRoom, setSelectRoom] = useState<IRoom | null>(null);

  useEffect(() => {
    if (rooms.length && !selectRoom) {
      setSelectRoom(rooms[0]);
    }
  }, [rooms]);

  const getRooms = async () => {
    try {
      const response = await api.get("/rooms.get");
      const data = response.data.update;
      console.log(data);
      setRooms(data);
    } catch (error) {
      console.error("Failed to fetch rooms:", error);
    }
  };

  return { rooms, getRooms, selectRoom, setSelectRoom };
};

export default useRooms;
