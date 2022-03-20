<template>
  <div class="flex flex-col bg-black pt-6 px-6">
    <CoreLogo />
    <div class="flex flex-col gap-y-5 mt-8 text-white/85">
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
    <div v-if="!pending || playlists?.items" class="flex flex-col text-white overflow-y-scroll my-3 h-min-content">
      <div 
        v-for="item in playlists?.items" 
        :key="item.id" 
        style="-webkit-line-clamp: 1;"
        class="text-white/85 hover:text-white text-sm mt-3"
      >
        <span class="line-clamp-1 cursor-default">{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { useClonify } from '~~/stores/spotify';

const clonifyStore = useClonify()

const { data: playlists, pending, error } = await useApi('/v1/me/playlists', {
  params: {
    limit: 50,
  },
})

function getTextWidth(text) {
  return text.length * 6
}

const navigationsItems = [
  { text: 'Accueil', link: '/', icon: 'i-teenyicons-home-outline', iconActive: 'i-teenyicons-home-solid', widthOfText: 0 },
  { text: 'Rechercher', link: '/search', icon: 'i-teenyicons-search-outline', iconActive: 'i-teenyicons-search-solid', widthOfText: 0 },
  { text: 'Bibliothèque', link: '/collection', icon: 'i-teenyicons-layers-outline', iconActive: 'i-teenyicons-layers-solid', widthOfText: 0 },
].map(item => {
  item.widthOfText = getTextWidth(item.text)
  return item
})

const otherItems = [
  { text: 'Créer une playlist', link: '/new-playlist', icon: 'i-teenyicons-add-outline', iconActive: 'i-teenyicons-home-solid', widthOfText: 0 },
  { text: 'Titres likés', link: '/collection/tracks', icon: 'i-teenyicons-heart-outline', iconActive: 'i-teenyicons-search-solid', widthOfText: 0 },
  { text: 'Vos épisodes', link: '/collection/episodes', icon: 'i-teenyicons-layers-outline', iconActive: 'i-teenyicons-layers-solid', widthOfText: 0 },
  { text: '', link: '/callback', icon: 'i-dsad', iconActive: 'i-teenyicons-daslayers-solid', widthOfText: 0 },
].map(item => {
  item.widthOfText = getTextWidth(item.text)
  return item
})


</script>