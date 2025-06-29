import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { UserContext } from "./../contex/UserContext";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import "./Chat.css";

export default function Chat() {
  const [ws, setWs] = useState(null);
  const [onlinePeople, setOnlinePeople] = useState({});
  const [offlinePeople, setOfflinePeople] = useState({});
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const { username, id, setId, setUsername } = useContext(UserContext);
  const divUnderMessages = useRef();

  useEffect(() => {
    connectToWs();
  }, []);

  function connectToWs() {
    if (ws) ws.close();
    const newWs = new WebSocket("ws://localhost:5000");
    setWs(newWs);

    newWs.onmessage = handleMessage;
    newWs.onclose = () => {
      setTimeout(() => {
        console.log("Reconnecting...");
        connectToWs();
      }, 2000);
    };
  }

  function handleMessage(ev) {
    const messageData = JSON.parse(ev.data);
    if (messageData.online) {
      updateOnlinePeople(messageData.online);
    } else if (messageData.text) {
      if (messageData.sender === selectedUserId) {
        setMessages((prev) => [...prev, messageData]);
      }
    }
  }

  function updateOnlinePeople(peopleArray) {
    const people = Object.fromEntries(
      peopleArray.map(({ userId, userName }) => [userId, userName])
    );
    setOnlinePeople(people);
  }

  function logout() {
    axios.post("/users/logout").then(() => {
      setWs(null);
      setId(null);
      setUsername(null);
    });
  }

  function sendMessage(text, file = null) {
    if (!ws || ws.readyState !== WebSocket.OPEN) return;
    ws.send(JSON.stringify({ recipient: selectedUserId, text, file }));
    setMessages((prev) => [
      ...prev,
      { text, sender: id, recipient: selectedUserId, _id: Date.now() },
    ]);
  }

  function sendFile(file) {
    const reader = new FileReader();
    reader.onload = () => {
      sendMessage(null, { name: file.name, data: reader.result });
    };
    reader.readAsDataURL(file);
  }

  useEffect(() => {
    if (!selectedUserId) return;
    axios
      .get(`/message/${selectedUserId}`)
      .then((res) => setMessages(res.data));
  }, [selectedUserId]);

  useEffect(() => {
    axios.get("/users/people").then((res) => {
      const offline = res.data
        .filter((p) => p._id !== id && !onlinePeople[p._id])
        .reduce((acc, p) => ({ ...acc, [p._id]: p.userName }), {});
      setOfflinePeople(offline);
    });
  }, [onlinePeople]);

  return (
    <div className="chat_main responsive">
      <Sidebar
        className="sidebar_ responsive-sidebar"
        onlinePeople={onlinePeople}
        offlinePeople={offlinePeople}
        selectedUserId={selectedUserId}
        setSelectedUserId={setSelectedUserId}
        logout={logout}
        username={username}
      />
      <ChatWindow
        className="chatwindow responsive-chatwindow"
        selectedUserId={selectedUserId}
        messages={messages}
        setMessages={setMessages}
        sendMessage={sendMessage}
        sendFile={sendFile}
        divUnderMessages={divUnderMessages}
      />
    </div>
  );
}
