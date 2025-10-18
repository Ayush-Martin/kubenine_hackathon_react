import { useState } from "react";
import Login from "./components/Login";
import AuthContext from "./context/AuthContext";
import Home from "./components/Home";

const App = () => {
  const [userId, setUserId] = useState("");
  const [authToken, setAuthToken] = useState("");

  console.log("App render - userId:", userId, "authToken:", authToken);

  return (
    <div>
      <AuthContext.Provider
        value={{ userId, authToken, setUserId, setAuthToken }}
      >
        {userId && authToken ? <Home /> : <Login />}
      </AuthContext.Provider>
    </div>
  );
};

export default App;
