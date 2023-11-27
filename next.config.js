/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  env: {
    NEXT_PUBLIC_API_ROOT:
      process.env.NEXT_PUBLIC_API_ROOT ?? "NEXT_PUBLIC_API_ROOT"
  },
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true
  }
};

module.exports = nextConfig;
