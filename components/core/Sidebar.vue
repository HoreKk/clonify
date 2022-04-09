<template>
  <div class="flex flex-col bg-black pt-6 md:px-6">
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
    <div class="flex flex-col text-white overflow-y-scroll my-3 h-min-content">
      <div 
        v-for="item in playlists" 
        :key="item.id"
        class="text-white/85 hover:text-white text-sm mt-3"
      >
        <SkeletonText 
          :text="item?.name"
          classes="line-clamp-1 cursor-default"
          width="w-38"
          height="h-3"
          classes-skeleton="mt-2"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

const { data: playlists } = await useApi('/v1/me/playlists', {
  params: { limit: 50 },
  pick: 'items',
  default: () => [...Array(15).keys()].map(item => ({ id: item.toString(), name: '' }))
})

const navigationsItems = [
  { text: 'Accueil', link: '/', icon: 'i-teenyicons-home-outline', iconActive: 'i-teenyicons-home-solid' },
  { text: 'Rechercher', link: '/search', icon: 'i-teenyicons-search-outline', iconActive: 'i-teenyicons-search-solid' },
  { text: 'Bibliothèque', link: '/collection', icon: 'i-teenyicons-layers-outline', iconActive: 'i-teenyicons-layers-solid' },
]

const otherItems = [
  { text: 'Créer une playlist', link: '/new-playlist', icon: 'i-teenyicons-add-outline', iconActive: 'i-teenyicons-home-solid' },
  { text: 'Titres likés', link: '/collection/tracks', icon: 'i-teenyicons-heart-outline', iconActive: 'i-teenyicons-heart-solid' },
  { text: 'Vos épisodes', link: '/collection/episodes', icon: 'i-teenyicons-target-outline', iconActive: 'i-teenyicons-target-solid' },
  { text: '', link: '/callback', icon: 'i-dsad', iconActive: 'i-mdi:broadcast' },
]

</script>