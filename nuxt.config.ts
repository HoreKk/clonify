import { defineNuxtConfig } from 'nuxt3'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  ssr: false,
  buildModules: [
    '@unocss/nuxt',
  ],
  unocss: {
    // presets
    icons: true, // enabled `@unocss/preset-icons`
    preflight: true,
    webFonts: {
      fonts: {
        sans: 'Raleway:100;200;300;400;500;600;700;800;900',
      }
    },

    theme: {
      colors: {
        'cl-primary': '#1BB954',
        'cl-black': '#191414'
      }
    },

    // core options
    shortcuts: [],
    rules: [
      [/^text-(.*)$/, ([, c], { theme }) => {
        if (theme.colors[c])
          return { color: theme.colors[c] }
      }],
      [/^bg-(.*)$/, ([, c], { theme }) => {
        if (theme.colors[c])
          return { 'background-color': theme.colors[c] }
      }],
    ]
  },
})
