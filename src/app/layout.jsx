import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navber from "@/components/navber/navber";
import Footer from "@/components/Footer/foooter";
import CookiePopup from "@/components/AcceptCookie/CookiePopup";
import ScrollToTop from "@/components/ScrollToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "PieTenium — Solve Your Digital Solution",
  description:
    "PieTenium is an smart digital agency , whose solve digital problem for everyone",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ScrollToTop />
        <nav>
          <Navber />
        </nav>
        <main>{children}</main>
        <CookiePopup />
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
