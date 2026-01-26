/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['github.com'],
  },
  experimental: {
    serverActions: false, 
  },
};

module.exports = nextConfig;