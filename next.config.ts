import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "**.res.cloudinary.com" },
      {
        hostname: "res.cloudinary.com",
      },
      {
        hostname: "pixabay.com"
      },
      {
        hostname: "cdn.pixabay.com"
      }
    ],
  },
};

export default nextConfig;
