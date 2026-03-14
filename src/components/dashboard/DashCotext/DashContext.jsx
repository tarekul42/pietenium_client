"use client";

import { api } from "@/data/api";
import { createContext, useContext, useEffect, useState } from "react";

const DashContext = createContext();

const DashProvider = ({ children, authPermission }) => {
  const [accessToken, setAccessToken] = useState("");
  const [auth, setAuth] = useState(authPermission);

  //   Refresh for access token get -->
  const refresh = async () => {
    try {
      const response = await fetch(`${api}/admin/accessToken`, {
        method: "GET",
        credentials: "include",
      });
      const getData = await response.json();

      if (getData?.success) {
        setAccessToken(getData?.token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refresh();
  }, []);
  //   console.log({accessToken,auth});
  return (
    <DashContext.Provider value={{ accessToken, setAccessToken, auth }}>
      {children}
    </DashContext.Provider>
  );
};

export const useDashAuth = () => {
  const context = useContext(DashContext);
  if (!context) {
    throw new Error("useAuth must be used within a DashProvider");
  }
  return context;
};
export default DashProvider;
