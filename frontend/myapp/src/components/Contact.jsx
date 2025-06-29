import Avatar from "./Avator.jsx";

export default function Contact({ id, username, onClick, selected, online }) {
  return (
    <div
      key={id}
      onClick={() => onClick(id)}
      className={`d-flex align-items-center p-2 border-bottom cursor-pointer ${
        selected ? "bg-primary text-white" : "bg-light"
      }`}
      style={{ cursor: "pointer" }}
    >
      {selected && (
        <div
          className="bg-white"
          style={{ width: "5px", height: "100%", borderRadius: "5px" }}
        ></div>
      )}
      <div className="d-flex align-items-center ms-3">
        <Avatar online={online} username={username} userId={id} />
        <span
          className={`ms-2 fw-bold ${selected ? "text-white" : "text-dark"}`}
        >
          {username}
        </span>
      </div>
    </div>
  );
}
