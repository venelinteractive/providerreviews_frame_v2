/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: 'custom',
    loaderFile: './imageLoader.js',
  },
  trailingSlash: false,
  // This is important for dynamic routes in static exports

};

module.exports = nextConfig;
