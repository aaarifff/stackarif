/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/dashboard',
        headers: [
          {
            key: 'Permissions-Policy',
            value: 'autoplay=*, encrypted-media=*, picture-in-picture=*',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
