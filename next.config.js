/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  env: {
    apiUrl: isProd ? "https://example.com" : "http://localhost:3000",
  },
  reactStrictMode: false,
  images: {
    domains: [
      "toy-1.s3.ap-northeast-2.amazonaws.com",
      "lh3.googleusercontent.com",
      "k.kakaocdn.net",
    ],
  },
};

module.exports = nextConfig;
