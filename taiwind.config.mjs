/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",        // App Router
    "./pages/**/*.{js,ts,jsx,tsx}",      // Pages Router (si vous avez encore des pages)
    "./components/**/*.{js,ts,jsx,tsx}", // Composants partagés
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
