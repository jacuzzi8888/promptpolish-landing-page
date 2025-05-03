/* postcss.config.mjs */
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: [
    'tailwindcss', // Use array syntax
    'autoprefixer',
  ],
};

export default config;