import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.xx.fbcdn.net',
      },
    ],
  },
}

export default nextConfig
