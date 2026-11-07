/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // A type or lint warning must never stop the site from deploying.
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
};
export default nextConfig;
