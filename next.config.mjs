/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for S3 + CloudFront deployment
  output: 'export',

  // Images are pre-optimized at build time via scripts/optimize-images.mjs,
  // so Next.js server-side image transforms are not needed.
  images: {
    unoptimized: true,
  },

  // trailingSlash: true enables /about/ -> out/about/index.html
  // Uncomment if your CloudFront distribution is configured to serve index.html
  // for subdirectory requests (recommended). See DEPLOY.md.
  // trailingSlash: true,
}

export default nextConfig

