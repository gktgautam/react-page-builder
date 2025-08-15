/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "../packages/editor/**/*.{ts,tsx}",
    "./app/(dashboard)/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {}
  },
  plugins: []
};
