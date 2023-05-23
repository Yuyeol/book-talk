/** @type {import('next').NextConfig} */
const nextConfig = {
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
