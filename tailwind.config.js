/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Paths to all files that use Tailwind classes
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // You can add theme customizations here later if needed
    },
  },
  plugins: [],
}