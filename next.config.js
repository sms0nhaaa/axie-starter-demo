/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'prod-image-cdn.tensor.trade',
      },
      {
        protocol: 'https',
        hostname: 'welcome.axie.tech',
      },
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com',
      },
    ],
  },
}

module.exports = nextConfig
