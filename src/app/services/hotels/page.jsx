import HotelLand from "@/components/services/Hotel/HotelLand";

export const metadata = {
  title:
    "Top Hotel & Restaurent Sales Problem and Solution | Hospitality SEO & Booking Optimization",
  description:
    "Boost hotel & restaurant bookings with expert hospitality SEO, lead generation & marketing strategies in form any where.",
  keywords: [
    "hotel marketing",
    "restaurant marketing",
    "hospitality SEO",
    "booking optimization",
    "lead generation for hotels",
    "USA hotel marketing",
    "Canada hotel SEO",
    "UK restaurant promotion",
    "France hospitality marketing",
  ],
  openGraph: {
    title:
      "Top Hotel & Restaurent Sales Problem and Solution| Hospitality SEO Experts",
    description:
      "Grow your hospitality business with proven SEO, booking optimization & lead generation services across form any where.",
    url: "https://pietenium.vercel.app/services/hotels",
    siteName: "Pietenium",
    images: [
      {
        url: "https://pietenium.vercel.app/hotel-marketing-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Luxury hotel lobby showcasing hospitality marketing success",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hotel & Restaurant Marketing | Hospitality SEO Experts",
    description:
      "Increase hotel & restaurant bookings with top-tier SEO & lead generation for form any where.",
    images: ["https://pietenium.vercel.app/hotel-marketing-banner.jpg"],
  },
  icons: {
    icon: "https://pietenium.vercel.app/favicon.ico",
  },
};

export default function HotelPage() {
  return (
    <>
      <HotelLand />

      {/* For Social Card */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Pietenium Hospitality Marketing",
            image: "https://pietenium.vercel.app/hotel-marketing-banner.jpg",
            "@id": "https://pietenium.vercel.app/services/hotels",
            url: "https://pietenium.vercel.app/services/hotels",
            telephone: "+1-800-123-4567",
            address: {
              "@type": "PostalAddress",
              streetAddress: "123 Marketing Ave",
              addressLocality: "New York",
              addressRegion: "NY",
              postalCode: "10001",
              addressCountry: "USA",
            },
            priceRange: "$$",
            description:
              "Specialized hotel & restaurant marketing agency providing SEO, booking optimization, and lead generation for hospitality businesses in USA, Canada, UK, and France.",
            sameAs: [
              "https://www.facebook.com/pietenium",
              "https://www.instagram.com/pietenium",
              "https://www.linkedin.com/company/pietenium",
            ],
            serviceType: "Hospitality Marketing & SEO Services",
          }),
        }}
      />
    </>
  );
}
