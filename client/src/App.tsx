import { useSelector } from "react-redux";
import Login from "./components/Login";
import { RootState } from "./store";
import Home from "./components/Home";

const App = () => {
  const { userId, authToken } = useSelector((state: RootState) => state.auth);

  return <div>{userId && authToken ? <Home /> : <Login />}</div>;
};

export default App;
