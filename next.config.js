const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'twirpz.files.wordpress.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'st4.depositphotos.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'endoh.s3.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = withPWA(nextConfig)
