/** @type {import('postcss-load-config').Config} */

const config = {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production'
      ? {
          cssnano: {},
          'postcss-flexbugs-fixes': {},
          'postcss-preset-env': {
            autoprefixer: {
              flexbox: 'no-2009',
            },
            stage: 3,
            features: {
              'custom-properties': false,
            },
          },
          //  reduce the file size is to remove any unrequired styles from the final CSS file.
          '@fullhuman/postcss-purgecss': {
            content: ['./src/**/*.{js,jsx,ts,tsx}'],
            defaultExtractor: (content) =>
              content.match(/[\w-/:]+(?<!:)/g) || [],
            safelist: ['html', 'body'],
          },
        }
      : {}),
  },
};

export default config;
