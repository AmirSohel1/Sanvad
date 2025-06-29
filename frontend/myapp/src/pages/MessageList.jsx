import { useEffect, useRef } from "react";
import axios from "axios";

export default function MessageList({ messages, id }) {
  const divUnderMessages = useRef();

  useEffect(() => {
    if (divUnderMessages.current) {
      divUnderMessages.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages]);

  return (
    <div className="position-relative h-100">
      <div className="overflow-auto position-absolute top-0 start-0 end-0 bottom-2 p-2">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`d-flex ${
              message.sender === id
                ? "justify-content-end"
                : "justify-content-start"
            }`}
          >
            <div
              className={`d-inline-block p-2 my-2 rounded text-sm ${
                message.sender === id
                  ? "bg-primary text-white"
                  : "bg-light text-dark"
              }`}
              style={{ maxWidth: "75%" }}
            >
              {message.text}
              {message.file && (
                <div className="mt-1">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="d-flex align-items-center text-decoration-none border-bottom"
                    href={axios.defaults.baseURL + "/uploads/" + message.file}
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
    </div>
  );
}
