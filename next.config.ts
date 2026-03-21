import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL('https://m.media-amazon.com/images/M/**'),
      new URL('https://image.tmdb.org/t/p/**')
    ],
  },
};

export default nextConfig;
