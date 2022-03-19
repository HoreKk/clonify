<template>
  <div class="flex justify-between z-10 w-full mt-4 px-8">
    <div class="flex text-white">
      <button @click="router.back()" class="flex justify-center items-center mr-5 bg-black rounded-full p-2 disabled:opacity-75 disabled:cursor-wait">
        <div class="i-ion-chevron-left w-5 h-5 " />
      </button>
      <button @click="router.forward()" class="flex justify-center items-center mr-5 bg-black rounded-full p-2 disabled:opacity-75 disabled:cursor-wait">
        <div class="i-ion-chevron-right w-5 h-5 " />
      </button>
    </div>
    <div class="relative">
      <template v-if="clonifyStore.isConnected">
        <Menu>
          <MenuButton class="flex items-center bg-black hover:bg-cl-card text-white rounded-full">
            <img :src="clonifyStore.user?.images[0]?.url" class="w-7 h-7 rounded-full mr-2">
            <span class="font-semibold text-sm">{{ clonifyStore.user?.display_name }}</span>
            <div class="i-mdi-menu-down w-8 h-8" />
          </MenuButton>
          <MenuItems class="absolute flex flex-col text-white/95 mt-2 bg-cl-card rounded-md p-1 w-full ">
            <MenuItem v-slot="{ active }">
              <a @click="logout" class="px-3 cursor-pointer py-2 rounded-md text-sm hover:text-white hover:bg-cl-card-hover">
                Déconnexion
              </a>
            </MenuItem>
          </MenuItems>
        </Menu>
      </template>
      <template v-else>
        <a :href="url" class="flex text-white bg-cl-primary font-medium rounded-full px-4 py-2">
          Se connecter
        </a>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { useClonify } from '~/stores/spotify'

const clonifyStore = useClonify()
const config = useRuntimeConfig()
const nuxtApp = useNuxtApp()
const router = useRouter()
const route = useRoute()

let state = (Math.random() + 1).toString(36).substring(2);
let scopes = "playlist-modify-private,playlist-read-collaborative,playlist-read-private,playlist-modify-public,user-library-read,user-library-modify,user-read-private,user-read-email,user-top-read,user-read-recently-played"

const url = `https://accounts.spotify.com/authorize?response_type=token&client_id=${encodeURIComponent(config.SPOTIFY_CLIENT_ID)}&state=${state}&redirect_uri=${config.SPOTIFY_REDIRECT_URI}&scope=${scopes}&show_dialog=true`

const logout = () => {
  nuxtApp.$cookies.remove('clonify-credentials')
  nuxtApp.$cookies.remove('clonify-user')
  nuxtApp.$cookies.remove('clonify-auth-token')
  clonifyStore.$patch((state) => {
    state.user = null
    state.credentials = null
  })
  router.go(0)
  router.push('/')
}

</script>