import type { NextConfig } from "next";

const cloudName = process.env.CLOUDINARY_URL
  ? new URL(process.env.CLOUDINARY_URL).hostname
  : undefined;

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    remotePatterns: cloudName ? [{
      protocol: "https",
      hostname: "res.cloudinary.com",
      pathname: `/${cloudName}/image/upload/**`,
    }] : [],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
