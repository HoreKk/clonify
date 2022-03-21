import { defineNuxtConfig } from 'nuxt3'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  publicRuntimeConfig: {
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
    SPOTIFY_REDIRECT_URI: process.env.SPOTIFY_REDIRECT_URI
  },
  build: {
    transpile: ['@headlessui/vue']
  },
  buildModules: [
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/proxy',
    'cookie-universal-nuxt',
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
        'cl-black': '#191414',
        'cl-black-2': '#121212',
        'cl-card': '#282828',
        'cl-card-hover': '#3E3E3E',
      },
      keyframes: {
        pop: {
          '0%': { opacity: 0 },
          '100%': { opacity: 0.2 },
        }
      },
      animation: {
        pop: 'pop 5s ease-in-out',
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
