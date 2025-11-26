import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "scontent.fsgn5-6.fna.fbcdn.net",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "kkqrhvrvuskyiaialbil.supabase.co",
        pathname: "**",
      },
    ],
  },
  // cacheComponents: true,
};

export default nextConfig;
