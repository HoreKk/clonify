<template>
  <div class="flex items-center justify-between z-10 px-8">
    <div class="flex text-white">
      <button @click="router.back()" class="flex justify-center items-center mr-5 bg-black rounded-full p-2 disabled:opacity-75 disabled:cursor-wait">
        <div class="i-ion-chevron-left w-5 h-5 " />
      </button>
      <button @click="router.forward()" class="flex justify-center items-center mr-5 bg-black rounded-full p-2 disabled:opacity-75 disabled:cursor-wait">
        <div class="i-ion-chevron-right w-5 h-5 " />
      </button>
    </div>
    <div class="relative">
      <Menu>
        <MenuButton class="flex items-center bg-black hover:bg-grey text-white rounded-full">
          <img v-if="clonifyStore.isConnected" :src="clonifyStore.user?.images[0]?.url" class="w-7 h-7 rounded-full mr-2">
          <div v-else class="w-7 h-7 bg-grey-hover rounded-full mr-2" />
          <Text :text="clonifyStore.user?.display_name" width="w-24" classes="font-semibold text-sm" />
          <div class="i-mdi-menu-down w-8 h-8" />
        </MenuButton>
        <MenuItems class="absolute flex flex-col text-white/95 mt-2 bg-grey rounded-md p-1 w-full ">
          <MenuItem v-slot="{ active }">
            <a @click="logout" class="px-3 cursor-pointer py-2 rounded-md text-sm hover:(text-white bg-grey-hover)">
              Déconnexion
            </a>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { useClonify } from '~/stores/spotify'

const clonifyStore = useClonify()
const nuxtApp = useNuxtApp()
const router = useRouter()
const route = useRoute()

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