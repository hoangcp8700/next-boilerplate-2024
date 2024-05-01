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
          //  reduce the file size is to remove any unrequired styles from the final CSS file.
          '@fullhuman/postcss-purgecss': {
            content: ['./dist/*.html', './src/*.?s', './src/*.?sx'], // List every file that references the classes here. See the docs for PurgeCSS about details
          },
        }
      : {}),
  },
};

export default config;
