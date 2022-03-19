<template>
  <div class="flex flex-col bg-black pt-6 px-6">
    <img class="max-w-33" src="/spotify-full-white.png" />
    <div class="flex flex-col gap-y-5 mt-10 text-white/85">
      <NavItem 
        v-for="item in navigationsItems" 
        :key="item.text" 
        :item="item"
      />
    </div>
    <div class="flex flex-col gap-y-5 mt-14 text-white/85">
      <NavItem 
        v-for="item in otherItems" 
        :key="item.text" 
        :item="item"
      />
    </div>
    <div class="w-full h-1px bg-[#282828] mt-4" />
    <div class="flex flex-col">

    </div>
  </div>
</template>

<script lang="ts" setup>

import { useClonify } from '~/stores/spotify'

const clonifyStore = useClonify()

const navigationsItems = [
  { text: 'Accueil', link: '/', icon: 'i-teenyicons-home-outline', iconActive: 'i-teenyicons-home-solid' },
  { text: 'Rechercher', link: '/search', icon: 'i-teenyicons-search-outline', iconActive: 'i-teenyicons-search-solid' },
  { text: 'Bibliothèque', link: '/collection', icon: 'i-teenyicons-layers-outline', iconActive: 'i-teenyicons-layers-solid' },
]

const otherItems = [
  { text: 'Créer une playlist', link: '/new-playlist', icon: 'i-teenyicons-add-outline', iconActive: 'i-teenyicons-home-solid' },
  { text: 'Titres likés', link: '/collection/tracks', icon: 'i-teenyicons-heart-outline', iconActive: 'i-teenyicons-search-solid' },
  { text: 'Vos épisodes', link: '/collection/episodes', icon: 'i-teenyicons-layers-outline', iconActive: 'i-teenyicons-layers-solid' },
]

</script>