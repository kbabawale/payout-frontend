/** @type {import('next').NextConfig} */
const mode = process.env.NODE_ENV;
const nextConfig = {
    env: mode === 'development' ? {
        API_HOST: 'http://localhost:3000/api/v1'
    } : {
        API_HOST: 'http://localhost:3000/api/v1'
    },
    reactStrictMode: mode === 'development' ? true : false,
};

export default nextConfig;
