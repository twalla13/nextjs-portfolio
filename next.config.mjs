// Using ES Module syntax since the file extension is .mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
  // trailingSlash: true,

  // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
  // skipTrailingSlashRedirect: true,

  // Optional: Change the output directory `out` -> `dist`
  // distDir: 'dist',

  // images: {
  //   domains: ['tonidocs.com'], // Customize to your needs
  // }
}

export default nextConfig
