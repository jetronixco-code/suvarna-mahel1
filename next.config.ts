/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io', // This allows UploadThing images
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;