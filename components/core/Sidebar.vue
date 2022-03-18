<template>
  <div class="flex flex-col bg-black pt-6 px-6">
    <img class="max-w-33" src="/spotify-full-white.png" />
    <div class="flex flex-col gap-y-5 mt-8 text-white/85">
      <CoreNavItem 
        v-for="item in items" 
        :key="item.text" 
        :item="item"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>

const items = [
  { text: 'Accueil', link: '/', icon: 'i-teenyicons-home-outline', iconActive: 'i-teenyicons-home-solid' },
  { text: 'Rechercher', link: '/search', icon: 'i-teenyicons-search-outline', iconActive: 'i-teenyicons-search-solid' },
  { text: 'Bibliothèque', link: '/collection', icon: 'i-teenyicons-layers-outline', iconActive: 'i-teenyicons-layers-solid' },
]

</script>