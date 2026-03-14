/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/about-us",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/about-team",
        destination: "/about",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  experimental: {
    middlewarePrefetch: "flexible", // Optional for prefetching optimization
  },
};

export default nextConfig;
