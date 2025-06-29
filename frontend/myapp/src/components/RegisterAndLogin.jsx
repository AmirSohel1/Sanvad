import React, { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../contex/UserContext";
import { FaUser, FaLock } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RegisterAndLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginOrRegister, setIsLoginOrRegister] = useState("login");
  const [isLoading, setIsLoading] = useState(false);
  const { setUsername: setLoggedInUsername, setId } = useContext(UserContext);

  async function handleSubmit(ev) {
    ev.preventDefault();

    if (!username || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    const url = `/users/${
      isLoginOrRegister === "register" ? "signup" : "login"
    }`;
    try {
      const { data } = await axios.post(
        url,
        {
          userName: username,
          password,
        },
        { withCredentials: true }
      );
      setLoggedInUsername(username);
      if (data?.id) setId(data.id);
      toast.success(
        `${
          isLoginOrRegister === "register" ? "Registered" : "Logged in"
        } successfully!`
      );
    } catch (error) {
      console.error(
        "Login/Register Error:",
        error.response?.data || error.message
      );
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-primary">
      <ToastContainer position="top-center" autoClose={3000} />
      <form
        className="p-4 bg-white shadow rounded-3 w-100 animate__animated animate__fadeIn"
        style={{ maxWidth: "400px" }}
        onSubmit={handleSubmit}
      >
        <h3 className="text-center mb-3">
          {isLoginOrRegister === "register" ? "Register" : "Login"}
        </h3>
        <div className="mb-3">
          <div className="input-group">
            <span className="input-group-text">
              <FaUser />
            </span>
            <input
              value={username}
              onChange={(ev) => setUsername(ev.target.value)}
              type="text"
              placeholder="Username"
              className="form-control"
              required
            />
          </div>
        </div>
        <div className="mb-3">
          <div className="input-group">
            <span className="input-group-text">
              <FaLock />
            </span>
            <input
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              type="password"
              placeholder="Password"
              className="form-control"
              required
            />
          </div>
        </div>
        <button
          className="btn btn-primary w-100 d-flex align-items-center justify-content-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="spinner-border spinner-border-sm" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : isLoginOrRegister === "register" ? (
            "Register"
          ) : (
            "Login"
          )}
        </button>
        <div className="text-center mt-3">
          {isLoginOrRegister === "register" ? (
            <p>
              Already a member?{" "}
              <button
                type="button"
                className="btn btn-link p-0"
                onClick={() => setIsLoginOrRegister("login")}
              >
                Login here
              </button>
            </p>
          ) : (
            <p>
              Don't have an account?{" "}
              <button
                type="button"
                className="btn btn-link p-0"
                onClick={() => setIsLoginOrRegister("register")}
              >
                Register
              </button>
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

export default RegisterAndLogin;
