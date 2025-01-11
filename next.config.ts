import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
  eslint: {
    dirs: ['app', 'pages'],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  webpack: (config) => {
    return config
  },
}

export default nextConfig
