/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.clerk.dev'], // Allows Clerk's avatar images
  },
}

module.exports = nextConfig