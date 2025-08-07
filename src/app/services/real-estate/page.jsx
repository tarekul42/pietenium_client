// File: pages/services/real-estate.tsx

import Head from "next/head";
import RealEstateLandingPage from "@/components/services/RealEstate/RealEstateLand";

const RealEstatePage = () => {
  const siteUrl = "https://pietenium.vercel.app/services/real-estate";
  const siteName = "Pietenium";
  const title = "Top Real Estate Problems & Solutions | How Pietenium Helps You Succeed";
  const description =
    "Boost your real estate business with high-converting lead generation strategies. Partner with Pietenium to drive qualified property leads and close more deals.";
  const favicon = "https://pietenium.vercel.app/favicon.ico";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Real Estate Lead Generation",
    "provider": {
      "@type": "Organization",
      "name": siteName,
      "url": "https://pietenium.vercel.app",
      "logo": favicon
    },
    "areaServed": {
      "@type": "Country",
      "name": "Bangladesh"
    },
    "description": description,
    "url": siteUrl
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="canonical" href={siteUrl} />
        <link rel="icon" href={favicon} />

        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="/real-estate-cover.jpg" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={siteUrl} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="/real-estate-cover.jpg" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <main>
        <RealEstateLandingPage />
      </main>
    </>
  );
};

export default RealEstatePage;
