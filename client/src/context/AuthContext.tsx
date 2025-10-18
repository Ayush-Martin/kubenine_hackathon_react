import { createContext } from "react";

interface IAuthContext {
  userId: string;
  authToken: string;
  setUserId: (userId: string) => void;
  setAuthToken: (authToken: string) => void;
}

const AuthContext = createContext<IAuthContext | null>(null);

export default AuthContext;
