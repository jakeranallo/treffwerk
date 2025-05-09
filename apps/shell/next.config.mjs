import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  transpilePackages: ['@treffwerk/ui'],
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Add the tools directory to the module resolution
    config.resolve.alias = {
      ...config.resolve.alias,
      'tools': path.resolve(__dirname, '../../../tools')
    }
    return config
  }
}

export default nextConfig
