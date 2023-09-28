/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "s3.us-east-2.amazonaws.com",
      "encrypted-tbn0.gstatic.com",
      "lh3.googleusercontent.com",
    ],
  },
};

module.exports = nextConfig;
