import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Silence Turbopack workspace root warning
  turbopack: {
    root: path.resolve(__dirname),
  },

  // Optimize images
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Compiler options
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
