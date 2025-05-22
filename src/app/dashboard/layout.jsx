export const metadata = {
  title: "PieTech — Dashboard",
  description:
    "PieTech is an smart digital agency , whose solve digital problem for everyone",
};

export default async function DashBoardLayout({ children }) {
  try {
    return <DashboardAuthWrapper>{children}</DashboardAuthWrapper>;
  } catch (error) {
    throw new Error(error.message);
  }
}
