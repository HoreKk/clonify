<template>
  <div class="relative">
    <GradientBg :isCardHover="isCardHover" :currentColor="currentColor" />
    <div class="flex flex-col mx-10 text-white relative">
      <h1 class="text-4xl font-bold">{{ welcomeMessage }}</h1>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5 w-full mt-8">
        <div v-for="album in topAlbums" :key="album.id" class="flex">
          <CardHome :album="album" @emit-current-color="setCurrentColor" />
        </div>
      </div>
      <div class="flex items-center justify-between mt-10">
        <h4 class="text-xl font-bold cursor-pointer underline-offset-1 hover:underline">
          Vos Artistes préférés
        </h4>
        <span class="text-cl-subdued font-semibold text-sm cursor-pointer uppercase underline-offset-1 hover:underline">
          Voir tout
        </span>
      </div>
      <div class="grid grid-cols-[repeat(auto-fill,_minmax(180px,_1fr))] grid-rows-1 auto-rows-0 gap-x-4 mt-4 overflow-hidden">
        <CardBasic v-for="(artist, i) in topArtists" :key="artist.id" :item="artist" :index="i" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

const [
    { data: topAlbums, pending: pendingTopAlbums },
    { data: topArtists, pending: pendingTopArtists }
  ] = await Promise.all([
  useApi('/v1/me/top/tracks', {
    params: { time_range: 'short_term', limit: 40 },
    pick: 'items',
  }),
  useApi('/v1/me/top/artists', {
    params: { time_range: 'short_term', limit: 6 },
    pick: 'items',
  }),
])  

const welcomeMessage = new Date().getHours() > 6 && new Date().getHours() < 19 ? 'Bonjour' : 'Bonsoir'

const currentColor = ref<number[]>([18, 18, 18])
const isCardHover = ref(false)

const setCurrentColor = (color: number[], isHover: boolean) => {
  currentColor.value = color
  isCardHover.value = isHover
}

if (topAlbums.value && !pendingTopAlbums.value) {
  var arr = topAlbums.value
    .map(item => item.album)
    .map(item => ({ id: item["id"], value: item }))
  
  topAlbums.value = Array.from(
      arr.reduce((map, item) => 
          (map.get(item.id).count++, map) 
      , new Map(arr.map(o => 
          [o.id, Object.assign({}, o, { count: 0 })]
      ))), ([_, o]) => o
  ).sort((a, b) => b.count - a.count).slice(0, 6).map(item => item.value)
} else {
  topAlbums.value = [...Array(6).keys()].map(item => ({ id: item, name: '', images: [] }))
}

</script>
