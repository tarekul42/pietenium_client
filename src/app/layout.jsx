import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navber from "@/components/navber/navber";
import Footer from "@/components/Footer/foooter";
import CookiePopup from "@/components/AcceptCookie/CookiePopup";
import ScrollToTop from "@/components/ScrollToTop";
import ThemeProvider from "@/components/theme/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://pietenium.vercel.app"),
  title: {
    default: "Pietenium — Solve Your Digital Solution",
    template: "%s | Pietenium",
  },
  description:
    "Pietenium is a smart digital agency that solves digital problems for everyone. We build modern web apps, SEO optimized websites, high-speed APIs, and scalable business tools.",
  keywords: [
    "digital agency",
    "web development",
    "SEO",
    "web design",
    "API development",
    "React",
    "Next.js",
    "business solutions",
  ],
  authors: [{ name: "Pietenium" }],
  creator: "Pietenium",
  publisher: "Pietenium",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pietenium.vercel.app",
    siteName: "Pietenium",
    title: "Pietenium — Solve Your Digital Solution",
    description:
      "Pietenium is a smart digital agency that solves digital problems for everyone. We build modern web apps, SEO optimized websites, high-speed APIs, and scalable business tools.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Pietenium - Digital Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pietenium — Solve Your Digital Solution",
    description:
      "Pietenium is a smart digital agency that solves digital problems for everyone.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Pietenium",
    url: "https://pietenium.vercel.app",
    logo: "https://pietenium.vercel.app/logo.png",
    description:
      "Pietenium is a smart digital agency that solves digital problems for everyone. We build modern web apps, SEO optimized websites, high-speed APIs, and scalable business tools.",
    sameAs: [
      "https://facebook.com/pietenium",
      "https://twitter.com/pietenium",
      "https://linkedin.com/company/pietenium",
      "https://instagram.com/pietenium",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-xxx-xxx-xxxx",
      contactType: "customer service",
      availableLanguage: "English",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "US",
    },
    serviceType: [
      "Web Development",
      "SEO",
      "API Development",
      "Web Design",
      "Digital Marketing",
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider>
          <ScrollToTop />
          <nav>
            <Navber />
          </nav>
          <main>{children}</main>
          <CookiePopup />
          <footer>
            <Footer />
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
