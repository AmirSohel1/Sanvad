import { useEffect, useRef, useState, useContext } from "react";
import axios from "axios";
import { uniqBy } from "lodash";
import { UserContext } from "./../contex/UserContext";

export default function ChatWindow({
  selectedUserId,
  messages,
  setMessages,
  sendMessage,
}) {
  const { id } = useContext(UserContext);
  const [newMessageText, setNewMessageText] = useState("");
  const divUnderMessages = useRef();

  useEffect(() => {
    if (selectedUserId) {
      axios.get(`/message/${selectedUserId}`).then((res) => {
        setMessages(res.data);
      });
    }
  }, [selectedUserId]);

  useEffect(() => {
    if (divUnderMessages.current) {
      divUnderMessages.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const messagesWithoutDupes = uniqBy(messages, "_id");

  function handleSendMessage(ev) {
    ev.preventDefault();
    if (newMessageText.trim()) {
      sendMessage(newMessageText);
      setNewMessageText("");
    }
  }

  function sendFile(ev) {
    const reader = new FileReader();
    reader.readAsDataURL(ev.target.files[0]);
    reader.onload = () => {
      sendMessage(null, {
        name: ev.target.files[0].name,
        data: reader.result,
      });
    };
  }

  return (
    <div className="d-flex flex-column bg-light w-100 p-3 chat-container">
      <div className="chat-messages flex-grow-1 overflow-auto p-2">
        {!selectedUserId && (
          <div className="d-flex h-100 align-items-center justify-content-center text-secondary">
            &larr; Select a person from the sidebar
          </div>
        )}
        {!!selectedUserId && (
          <div className="message-list">
            {messagesWithoutDupes.map((message) => (
              <div
                key={message._id}
                className={`d-flex ${
                  message.sender === id
                    ? "justify-content-end"
                    : "justify-content-start"
                }`}
              >
                <div
                  className={`message-bubble p-2 rounded text-sm ${
                    message.sender === id
                      ? "bg-primary text-white"
                      : "bg-white text-secondary border"
                  }`}
                >
                  {message.text}
                  {message.file && (
                    <div className="mt-1">
                      <a
                        target="_blank"
                        className="text-decoration-underline"
                        href={
                          axios.defaults.baseURL + "/uploads/" + message.file
                        }
                      >
                        📎 {message.file}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={divUnderMessages}></div>
          </div>
        )}
      </div>
      {!!selectedUserId && (
        <form
          className="chat-input d-flex gap-2 mt-2 sticky-bottom p-2 bg-white"
          onSubmit={handleSendMessage}
        >
          <input
            type="text"
            value={newMessageText}
            onChange={(ev) => setNewMessageText(ev.target.value)}
            placeholder="Type your message here"
            className="form-control"
          />
          <label className="btn btn-outline-secondary">
            📎
            <input type="file" className="d-none" onChange={sendFile} />
          </label>
          <button type="submit" className="btn btn-primary">
            ➤
          </button>
        </form>
      )}
    </div>
  );
}
