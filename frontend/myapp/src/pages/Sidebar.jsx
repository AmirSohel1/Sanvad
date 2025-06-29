import axios from "axios";
import Contact from "../components/Contact";
export default function Sidebar({
  onlinePeople,
  offlinePeople,
  selectedUserId,
  setSelectedUserId,
  logout,
  username,
}) {
  return (
    <div className="sidebar_">
      <div className="text-center py-2 border-bottom">
        <h2>Samvad</h2>
      </div>
      <div className="contact-list flex-grow-1 p-2">
        {Object.keys(onlinePeople).map((userId) => (
          <Contact
            key={userId}
            id={userId}
            online={true}
            username={onlinePeople[userId]}
            onClick={() => setSelectedUserId(userId)}
            selected={userId === selectedUserId}
          />
        ))}
        {Object.keys(offlinePeople).map((userId) => (
          <Contact
            key={userId}
            id={userId}
            online={false}
            username={offlinePeople[userId]}
            onClick={() => setSelectedUserId(userId)}
            selected={userId === selectedUserId}
          />
        ))}
      </div>
      <div className="p-2 text-center border-top d-flex align-items-center justify-content-between">
        <span className="small text-secondary">{username}</span>
        <button onClick={logout} className="btn btn-sm btn-outline-primary">
          Logout
        </button>
      </div>
    </div>
  );
}
