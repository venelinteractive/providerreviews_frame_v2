/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [], // Add your image domains if any
    unoptimized: false,
  },
  experimental: {
    // Enable if you want to use React Server Components
    serverActions: true,
  },
};

module.exports = nextConfig;
