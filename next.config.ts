import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        pathname: "/images/M/**",
      },
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/t/p/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/u/**",
      },
    ]
  },

  // Production / build settings
  // distDir: "build",                // output folder for build
  output: "standalone",            // standalone output for custom server
  cleanDistDir: isProd,             // remove previous build files
  poweredByHeader: false,          // hide X-Powered-By header
  generateBuildId: async () => {   // stable build ID
    return `app_${process.env.npm_package_version}`;
  },

  // Optional: Next 16 experimental settings
  // experimental: {
  //   turbo: true,                    // Turbopack enabled
  // },

  reactStrictMode: true,
};

export default nextConfig;