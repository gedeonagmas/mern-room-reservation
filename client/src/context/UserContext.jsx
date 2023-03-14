import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!user) {
      axios.get("/user/profile").then(({ data }) => {
        setUser(data);
        setIsReady(true);
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isReady }}>
      {children}
    </UserContext.Provider>
  );
}
