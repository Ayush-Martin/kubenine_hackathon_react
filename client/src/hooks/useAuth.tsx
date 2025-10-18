import api from "../config/axios";

import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { setCredentials } from "../features/slice/authSlice";

const useAuth = () => {
  const dispatch: AppDispatch = useDispatch();

  const login = async (username: string, password: string) => {
    try {
      const response = await api.post("/login", { username, password });
      dispatch(
        setCredentials({
          userId: response.data.data.userId,
          authToken: response.data.data.authToken,
        })
      );
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = async () => {
    try {
      await api.post("/logout");
      dispatch(setCredentials({ userId: null, authToken: null }));
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return { login, logout };
};

export default useAuth;
