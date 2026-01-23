/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // Enable static export for GitHub Pages
  images: {
    unoptimized: true, // Required for static export
  },
  basePath: '/nolostra', // Required for GitHub Pages subdirectory
  trailingSlash: true,
}

module.exports = nextConfig
