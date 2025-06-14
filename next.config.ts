import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // images: { unoptimized: true },
  reactStrictMode: true,
  // Optional: Change the output directory `out`
  distDir: 'out',
  // output: 'export',
  // access environment variables in client side
  env: {
    DOMAIN: process.env.DOMAIN,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI,
  }
};
export default nextConfig;
