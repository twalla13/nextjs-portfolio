// Using ES Module syntax since the file extension is .mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['tonidocs.com'] // Ensure this domain is where your images are hosted.
  }
};

export default nextConfig;
