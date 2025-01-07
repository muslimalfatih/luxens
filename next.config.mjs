/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    unoptimized: true,
  },
}

export default nextConfig;
