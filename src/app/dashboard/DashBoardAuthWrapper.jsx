"use client";

import DashboardAuth from "@/components/dashboard/AuthDash/DashboardAuth";
import DashProvider from "@/components/dashboard/DashCotext/DashContext";
import DashboardNav from "@/components/dashboard/navDash";
import SmallLoad from "@/components/smallLaoding/smallLoad";
import { api } from "@/data/api";
import { useEffect, useState } from "react";

export default function DashboardAuthWrapper({ children }) {
  const [auth, setAuth] = useState(null); // null = loading

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${api}/admin/authPermission`, {
          method: "GET",
          credentials: "include", // ✅ Cookie will be sent
          cache: "no-store",
        });
        const data = await res.json();
        setAuth(data?.auth === true);
      } catch (err) {
        setAuth(false);
      }
    };
    checkAuth();
  }, []);
  console.log(auth);
  if (auth === null) return <SmallLoad />;

  return (
    <DashProvider authPermission={auth}>
      {auth ? (
        <>
          <DashboardNav />
          <main style={{ marginTop: "7rem" }}>{children}</main>
        </>
      ) : (
        <DashboardAuth />
      )}
    </DashProvider>
  );
}
