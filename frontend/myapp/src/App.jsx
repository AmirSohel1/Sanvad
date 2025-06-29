import "./App.css";
import axios from "axios";
import RegisterAndLogin from "./components/RegisterAndLogin";
import { UserContextProvider } from "./contex/UserContext";
import RoutesChat from "./pages/RoutesChat";

function App() {
  axios.defaults.baseURL = "http://localhost:5000/api/";
  axios.defaults.withCredentials = true;

  return (
    <>
      <UserContextProvider>
        <RoutesChat />
      </UserContextProvider>
    </>
  );
}

export default App;
