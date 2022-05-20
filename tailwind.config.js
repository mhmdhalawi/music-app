const formKitTailwind = require('@formkit/themes/tailwindcss');

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('@formkit/themes/tailwindcss')],
};
