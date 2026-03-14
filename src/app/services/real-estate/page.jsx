import RealEstateLandingPage from "@/components/services/RealEstate/RealEstateLand";

export const metadata = {
  title:
    "Top Real Estate Problems & Solutions | How Pietenium Helps You Succeed",
  description:
    "Boost your real estate business with high-converting lead generation strategies. Partner with Pietenium to drive qualified property leads and close more deals.",
  icons: {
    icon: "https://pietenium.vercel.app/favicon.ico",
  },
  openGraph: {
    title:
      "Top Real Estate Problems & Solutions | How Pietenium Helps You Succeed",
    description:
      "Boost your real estate business with high-converting lead generation strategies. Partner with Pietenium to drive qualified property leads and close more deals.",
    url: "https://pietenium.vercel.app/services/real-estate",
    siteName: "Pietenium",
    images: [
      {
        url: "https://pietenium.vercel.app/real-estate-cover.jpeg",
        width: 1200,
        height: 630,
        alt: "Real Estate Lead Generation by Pietenium",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Top Real Estate Problems & Solutions | How Pietenium Helps You Succeed",
    description:
      "Boost your real estate business with high-converting lead generation strategies. Partner with Pietenium to drive qualified property leads and close more deals.",
    images: ["https://pietenium.vercel.app/real-estate-cover.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
  },
  alternates: {
    canonical: "https://pietenium.vercel.app/services/real-estate",
  },
};

export function generateViewport() {
  return "width=device-width, initial-scale=1";
}

export default function RealEstatePage() {
  return <RealEstateLandingPage />;
}
