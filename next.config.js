/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    dangerouslyAllowSVG: true,
    contentDisallowStatusCodes: [404, 500],
  },
};

module.exports = nextConfig;
