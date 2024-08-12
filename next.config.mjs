/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yuguo-nextjs-demo-users-image.s3.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};
export default nextConfig;
