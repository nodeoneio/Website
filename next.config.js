/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ['mongoose'],
    },

    async rewrites() {
        return [
          {
            source: '/jungle/:path*',
            destination: `https://api-jungle4.nodeone.network:8344/:path*`,
          },
        ];
      },

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'img.clerk.com',
            },
            {
                protocol: 'https',
                hostname: 'images.clerk.dev',
            },
            {
                protocol: 'https',
                hostname: 'uploadthing.com',
            },
            {
                protocol: 'https',
                hostname: 'placehold.co',
            },
            {
                protocol: 'https',
                hostname: 'utfs.io',
            },
            {
                protocol: 'https',
                hostname: 'assets.wharfkit.com',
            },
        ],
    },
};

module.exports = nextConfig;
