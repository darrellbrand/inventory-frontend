/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    images: {
        domains: ['ik.imagekit.io'],
    },
};

export default nextConfig;
