import DashboardAuth from "@/components/dashboard/AuthDash/DashboardAuth";
import DashProvider from "@/components/dashboard/DashCotext/DashContext";
import DashboardNav from "@/components/dashboard/navDash";
import { api } from "@/data/api";
import { cookies } from "next/headers";

export const metadata = {
  title: "PieTech — Dashboard",
  description:
    "PieTech is an smart digital agency , whose solve digital problem for everyone",
};

export default async function DashBoardLayout({ children }) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    
    const response = await fetch(`${api}/admin/authPermission`, {
      method: "GET",
      credentials:'include',
      cache: "no-store", // avoid caching for SSR
    });
    const getData = await response.json();
    console.log(token);
    return (
      <DashProvider authPermission={getData?.auth}>
        {getData?.auth === true ? (
          <>
            <DashboardNav />

            <main style={{ marginTop: "7rem" }}>{children}</main>
          </>
        ) : (
          <DashboardAuth  />
        )}
      </DashProvider>
    );
  } catch (error) {
    throw new Error(error.message);
  }
}
