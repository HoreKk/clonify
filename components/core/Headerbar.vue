<template>
  <div class="flex justify-between z-10 w-full mt-4 px-8">
    <div class="flex">

    </div>
    <div>
      <template v-if="clonifyStore.isConnected">
        <Menu>
          <MenuButton class="flex items-center bg-black hover:bg-cl-card text-white rounded-full">
            <img :src="clonifyStore.user?.images[0]?.url" class="w-7 h-7 rounded-full mr-2">
            <span class="font-semibold text-sm">{{ clonifyStore.user?.display_name }}</span>
            <div class="i-mdi-menu-down w-8 h-8" />
          </MenuButton>
          <MenuItems class="flex flex-col text-white mt-2 bg-cl-card rounded-md p-1">
            <MenuItem v-slot="{ active }" class="px-4 py-3 rounded-md hover:bg-cl-card-hover">
              <button @click="logout">
                Déconnexion
              </button>
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

let state = (Math.random() + 1).toString(36).substring(2);
let callbackUrl = "http://localhost:3000/callback"
let scopes = "playlist-modify-private,playlist-read-collaborative,playlist-read-private,playlist-modify-public"

const url = `https://accounts.spotify.com/authorize?response_type=token&client_id=${encodeURIComponent(config.SPOTIFY_CLIENT_ID)}&state=${state}&redirect_uri=${callbackUrl}&scope=${scopes}&show_dialog=true`

const logout = () => {
  nuxtApp.$cookies.remove('clonify-credentials')
  clonifyStore.$patch((state) => {
    state.user = null
    state.credentials = null
  })
}

</script>