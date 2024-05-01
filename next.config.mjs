/** @type {import('next').NextConfig} */
import withNextIntl from 'next-intl/plugin';

const withNextIntlConfig = withNextIntl('./src/libs/i18n.ts');

const nextConfig = withNextIntlConfig({
  eslint: {
    dirs: ['src'],
  },
  reactStrictMode: true,
  trailingSlash: true,

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            typescript: true,
            icon: true,
          },
        },
      ],
    });

    return config;
  },
});

export default nextConfig;
