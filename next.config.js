/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: "loose",
    serverComponentsExternalPackages: ["mongoose"]
  },
  webpack: (config) => {
    config.resolve.fallback = {
      "mongodb-client-encryption": false,
      aws4: false,
    };
    return config;
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
