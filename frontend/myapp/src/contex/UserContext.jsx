import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [username, setUsername] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const response = await axios.get("/users/profile", {
          withCredentials: true,
        });
        setId(response.data.userId);
        setUsername(response.data.userName);
      } catch (error) {
        console.error(
          "Error fetching user profile:",
          error.response?.data || error.message
        );
      }
    }

    fetchUserProfile();
  }, []);

  return (
    <UserContext.Provider value={{ username, id, setId, setUsername }}>
      {children}
    </UserContext.Provider>
  );
}
