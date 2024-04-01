/** @type {import('next').NextConfig} */
const nextConfig = {
  scrollRestoration: true,
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  images: {
    domains: ['images.tridge.com', 'intphcm.com', 'www.vietnamworks.com', '64.176.220.144','media-cdn-v2.laodong.vn','localhost'],
  },
};

export default nextConfig;
