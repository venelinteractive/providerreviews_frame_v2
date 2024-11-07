/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  trailingSlash: false,
  // This is important for dynamic routes in static exports

};

module.exports = nextConfig;
