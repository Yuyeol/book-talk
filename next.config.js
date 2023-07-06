/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  env: {
    apiUrl: isProd ? "https://book-talk.vercel.app" : "http://localhost:3000",
  },
  images: {
    domains: [
      "toy-1.s3.ap-northeast-2.amazonaws.com",
      "lh3.googleusercontent.com",
      "k.kakaocdn.net",
    ],
  },
};

module.exports = nextConfig;
