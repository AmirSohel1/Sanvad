import React from "react";

function Avatar({ userId, username, online }) {
  const colors = [
    "bg-primary",
    "bg-danger",
    "bg-success",
    "bg-warning",
    "bg-info",
    "bg-secondary",
    "bg-dark",
    "bg-light",
  ];

  let color = "bg-secondary"; // Default color
  if (userId) {
    const userIdBase10 = parseInt(userId.slice(-4), 16); // Get last 4 chars to avoid errors
    const colorIndex = userIdBase10 % colors.length;
    color = colors[colorIndex];
  }

  return (
    <div
      className={`d-flex align-items-center justify-content-center rounded-circle text-white ${color}`}
      style={{ width: "40px", height: "40px", position: "relative" }}
    >
      <span className="fw-bold">{username?.[0].toUpperCase()}</span>
      {online ? (
        <span
          className="position-absolute bottom-0 end-0 bg-success border border-white rounded-circle"
          style={{ width: "10px", height: "10px" }}
        ></span>
      ) : (
        <span
          className="position-absolute bottom-0 end-0 bg-secondary border border-white rounded-circle"
          style={{ width: "10px", height: "10px" }}
        ></span>
      )}
    </div>
  );
}

export default Avatar;
