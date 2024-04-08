/** @type {import('next').NextConfig} */
const nextConfig = {
  scrollRestoration: true,
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  images: {
    domains: ['bizweb.dktcdn.net','images.tridge.com','0c6c-27-72-146-36.ngrok-free.app', 'intphcm.com', 'www.vietnamworks.com', '64.176.220.144','media-cdn-v2.laodong.vn','localhost', 'cdn.tridge.com'],
  },
};

export default nextConfig;
