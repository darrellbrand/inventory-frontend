/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    images: { remotePatterns: [
        {
          protocol: 'https',
          hostname: 'ik.imagekit.io',
          pathname: '/**',
        },
      ],
    },
};

export default nextConfig;
