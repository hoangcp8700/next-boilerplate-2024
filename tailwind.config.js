const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

const config = {
  content: [
    './src/views/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      xs: '475px',
      ...defaultTheme.screens,
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    plugin(
      ({
        // matchUtilities, addUtilities,
        addVariant,
      }) => {
        // registering custom variants
        addVariant('hocus', ['&:hover', '&:focus']);
        addVariant('before-after', ['&:before', '&:after']);
        addVariant('not-last', '&:not(:last-child)');
        addVariant('not-first', '&:not(:first-child)');
        addVariant('not-disabled', '&:not(:disabled)');
      },
    ),
  ],
};
export default config;
