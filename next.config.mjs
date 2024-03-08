/** @type {import('next').NextConfig} */
const nextConfig = {
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
