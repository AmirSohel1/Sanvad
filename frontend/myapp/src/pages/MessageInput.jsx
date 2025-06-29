import { useState } from "react";
import axios from "axios";

export default function MessageInput({ sendMessage, sendFile }) {
  const [newMessageText, setNewMessageText] = useState("");

  function handleSendMessage(ev) {
    ev.preventDefault();
    if (newMessageText.trim()) {
      sendMessage(newMessageText);
      setNewMessageText("");
    }
  }

  function handleFileUpload(ev) {
    if (ev.target.files.length > 0) {
      sendFile(ev.target.files[0]);
    }
  }

  return (
    <form className="d-flex gap-2 mt-2" onSubmit={handleSendMessage}>
      <input
        type="text"
        value={newMessageText}
        onChange={(ev) => setNewMessageText(ev.target.value)}
        placeholder="Type your message here"
        className="form-control"
      />
      <label className="btn btn-outline-secondary d-flex align-items-center">
        <input type="file" className="d-none" onChange={handleFileUpload} />
        📎
      </label>
      <button
        type="submit"
        className="btn btn-primary d-flex align-items-center"
      >
        ➤
      </button>
    </form>
  );
}
