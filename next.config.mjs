/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        remotePatterns: [
        {
            protocol: 'https',
            hostname: 'onedev.i234.me',
            port: '',
            pathname: '/data/**',
        },
        ],
    },
}

export default nextConfig;
