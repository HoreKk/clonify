import { defineNuxtConfig } from 'nuxt3'
import transformerVariantGroup from '@unocss/transformer-variant-group'

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
    transformers: [
      transformerVariantGroup(), 
    ],

    webFonts: {
      fonts: {
        sans: 'Raleway:100;200;300;400;500;600;700;800;900',
      }
    },

    theme: {
      colors: {
        'cl-primary': '#1ed760',
        'cl-black': '#121212',
        'cl-black-2': '#181818',
        'cl-grey': '#282828',
        'cl-grey-2': '#3E3E3E',
        'cl-subdued': '#a7a7a7',
      },
      boxShadow: {
        card: '0 8px 24px rgb(0 0 0 / 50%)'
      },
      gridtemplatecolumns: {
        'card': 'repeat(auto-fill,minmax(180px,1fr))'
      },
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
