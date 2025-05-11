/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
  },
    api: {
    bodyParser: {
      sizeLimit: '8mb', // ou plus si besoin
    },
  },
};

export default nextConfig;


