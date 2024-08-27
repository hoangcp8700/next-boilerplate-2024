/** @type {import('postcss-load-config').Config} */

const config = {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production'
      ? {
          cssnano: {
            preset: [
              'default',
              {
                discardComments: {
                  removeAll: true,
                },
                calc: false,
              },
            ],
          },
          'postcss-preset-env': {
            stage: 3,
            preserve: false,
            features: {},
          },
        }
      : {}),
  },
};

export default config;
