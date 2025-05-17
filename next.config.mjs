/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
    ],
  },
  experimental: {
    middlewarePrefetch: "flexible", // Optional for prefetching optimization
  },
};

export default nextConfig;
