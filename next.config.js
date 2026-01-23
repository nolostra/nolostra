/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // Enable static export for GitHub Pages
  images: {
    unoptimized: true, // Required for static export
  },
  // If deploying to a subdirectory, uncomment and set basePath
  // basePath: '/nolostra',
  // trailingSlash: true,
}

module.exports = nextConfig
