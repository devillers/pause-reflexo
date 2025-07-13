/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",      // Next.js App directory
    "./pages/**/*.{js,ts,jsx,tsx}",    // Next.js Pages directory
    "./components/**/*.{js,ts,jsx,tsx}", // Shared/components
  ],
  theme: {
    extend: {
      // Tu peux ajouter ici tes couleurs, polices, breakpoints custom, etc.
      // colors: { ... },
      // fontFamily: { ... },
    },
    // Les breakpoints par défaut sont déjà :
    // sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px
    // Si tu veux les modifier, décommente et adapte l'objet ci-dessous :
    /*
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    */
  },
  plugins: [],
};
