import { useContext } from "react";
import api from "../config/axios";
import AuthContext from "../context/AuthContext";

const useAuth = () => {
  const authContext = useContext(AuthContext)!;

  const login = async (username: string, password: string) => {
    try {
      const response = await api.post("/login", { username, password });
      console.log("Login response:", response.data);
      authContext.setUserId(response.data.data.userId);
      authContext.setAuthToken(response.data.data.authToken);
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  return { login };
};

export default useAuth;
