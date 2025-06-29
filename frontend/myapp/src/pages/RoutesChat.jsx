import React, { useContext } from "react";
import { UserContext } from "../contex/UserContext";
import Chat from "./Chat";
import RegisterAndLogin from "../components/RegisterAndLogin";

function RoutesChat() {
  const { username, id } = useContext(UserContext);
  if (username) {
    return <Chat />;
  }
  return <RegisterAndLogin />;
}

export default RoutesChat;
