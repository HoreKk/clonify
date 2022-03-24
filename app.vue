<template>
  <Html lang="en-US">
    <Head>
      <Title>Clonify</Title>
    </Head>
  </Html>
  <ClientOnly>
    <Modal :is-open="isOpen">
      <div class="flex flex-col items-center justify-center text-white">
        <div class="text-15 i-emojione-monotone-cyclone text-white" />
        <h1 class="font-bold ml-1 text-10">Clonify</h1>
      </div>

      <DialogTitle
        as="h3"
        class="text-2xl font-semibold mx-16 text-white mt-4"
      >
        Connectez-vous pour continuer.
      </DialogTitle>

      <div class="flex justify-center mt-8">
        <a :href="url" class="flex items-center text-white bg-cl-primary text-xl font-medium rounded-full px-5 py-3 focus-visible:outline-0">
          <div class="i-mdi-spotify w-6 h-6 mr-2 text-white" /> Continuer avec Spotify
        </a>
      </div>
    </Modal>
  </ClientOnly>
  <div id="app" class="h-full">
    <div class="flex flex-col h-full">
      <div class="flex h-90%">
        <CoreSidebar class="min-w-75 w-20%" />
        <div class="w-full bg-cl-black relative overflow-auto pb-12">
          <CoreHeaderbar class="sticky top-0 py-4 w-full" />
          <NuxtPage class="w-full pt-12 -mt-4"/>
        </div>
      </div>
      <CorePlayerbar class="w-full h-10%" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import '@/assets/css/tailwind.css'
import { useClonify } from '~~/stores/spotify'

import { DialogTitle } from '@headlessui/vue'

const clonifyStore = useClonify()

const config = useRuntimeConfig()

const isOpen = clonifyStore.isLoading ? !clonifyStore.isLoading : !clonifyStore.isConnected

let state = (Math.random() + 1).toString(36).substring(2);
let scopes = "playlist-modify-private,playlist-read-collaborative,playlist-read-private,playlist-modify-public,user-library-read,user-library-modify,user-read-private,user-read-email,user-top-read,user-read-recently-played"

const url = `https://accounts.spotify.com/authorize?response_type=token&client_id=${encodeURIComponent(config?.SPOTIFY_CLIENT_ID)}&state=${state}&redirect_uri=${encodeURIComponent(config?.SPOTIFY_REDIRECT_URI)}&scope=${scopes}&show_dialog=true`

</script>