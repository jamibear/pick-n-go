/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
	  domains: ['mtvjqfbmffncybjbxixp.supabase.co'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.mnetplus.world",
        port: "",
        pathname: "/static/images/**",
      },
    ],
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
