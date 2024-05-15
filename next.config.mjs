/** @type {import('next').NextConfig} */
const nextConfig = {};
// next.config.js
module.exports = {
  output: 'standalone',
  images: {
    domains: ['tonidocs.com'], // Customize to your needs
  }
};

export default nextConfig;
