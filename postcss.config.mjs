// postcss.config.mjs
import tailwind from '@tailwindcss/postcss'
import autoprefixer from 'autoprefixer'

export default {
  plugins: {
    '@tailwindcss/postcss': {},   // <— use the new package
    autoprefixer: {}
  }
}
