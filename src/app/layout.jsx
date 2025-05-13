import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navber from "@/components/navber/navber";
import Footer from "@/components/Footer/foooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "PieTech — Solve Your Digital Solution",
  description:
    "PieTech is an smart digital agency , whose solve digital problem for everyone",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <nav>
          <Navber />
        </nav>
        <main>{children}</main>
        <footer><Footer/></footer>
      </body>
    </html>
  );
}
