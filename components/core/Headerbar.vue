<template>
  <div id="headerbar-root" class="flex items-center justify-between z-10 px-8 bg-[var(--bg-cl-grey)]">
    <div class="flex items-center text-white">
      <button @click="router.back()" class="flex justify-center items-center mr-5 bg-black rounded-full p-2 disabled:opacity-75 disabled:cursor-wait">
        <div class="i-akar-icons-chevron-left w-5 h-5 mr-1px " />
      </button>
      <button @click="router.forward()" class="flex justify-center items-center mr-5 bg-black rounded-full p-2 disabled:opacity-75 disabled:cursor-wait">
        <div class="i-akar-icons-chevron-right w-5 h-5 ml-1px" />
      </button>
      <Presence>
        <Motion
          v-show="opacity > 1"
          :animate="{ opacity: opacity > 1 ? 1 : 0 }"
          :exit="{ opacity: 0 }"
        >
          <h1 class="ml-2 text-xl font-semibold">{{ clonifyStore.currentItem.display_name }}</h1>
        </Motion>
      </Presence>
    </div>
    <div class="relative">
      <Menu>
        <MenuButton class="flex items-center bg-black hover:bg-cl-grey text-white rounded-full">
          <img v-if="clonifyStore.isConnected" :src="clonifyStore.user?.images[0]?.url" class="w-7 h-7 rounded-full mr-2">
          <div v-else class="w-7 h-7 bg-cl-grey-2 rounded-full mr-2 animate-pulse" />
          <SkeletonText :text="clonifyStore.user?.display_name" width="w-24" classes="font-semibold text-sm" />
          <div class="i-mdi-menu-down w-8 h-8" />
        </MenuButton>
        <MenuItems class="absolute flex flex-col text-white/95 mt-2 bg-cl-grey rounded-md p-1 w-full ">
          <MenuItem>
            <a @click="logout" class="px-3 cursor-pointer py-2 rounded-md text-sm hover:(text-white bg-cl-grey-2)">
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
import { Motion, Presence } from 'motion/dist/vue.es'
import { useClonify } from '~/stores/spotify'

const clonifyStore = useClonify()
const nuxtApp = useNuxtApp()
const router = useRouter()
const bgNavbar = ref(`rgba(${clonifyStore.currentItem.color}, 0)`)
const opacity = ref(0)

onMounted(() => window.addEventListener("scroll", onScroll, true))
onBeforeUnmount(() => window.removeEventListener("scroll", onScroll, true))
const onScroll = (e) => {
  opacity.value = e.target.scrollTop / 400
  bgNavbar.value = `rgba(${clonifyStore.currentItem.color},${opacity.value})`
}

const logout = () => {
  nuxtApp.$cookies.remove('clonify-credentials')
  nuxtApp.$cookies.remove('clonify-user')
  nuxtApp.$cookies.remove('clonify-auth-token')
  clonifyStore.$patch((state) => {
    state.user = null
    state.credentials = null
    state.currentItem = { color: '', display_name: '' }
  })
  router.go(0)
}

</script>

<style>

#headerbar-root {
  --bg-cl-grey: v-bind(bgNavbar);
}

</style>