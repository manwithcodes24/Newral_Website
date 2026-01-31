import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
   
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.microlink.io',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: "https",
        hostname: "ui.aceternity.com"
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com"
      },
      {
        protocol: "https",
        hostname: "assets.aceternity.com"
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      }
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
