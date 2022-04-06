<template>
  <div class="relative pt-12 -mt-4">
    <GradientBg :isCardHover="isCardHover" :currentColor="currentColor" />
    <div class="flex flex-col mx-10 text-white relative">
      <h1 class="text-4xl font-bold">{{ welcomeMessage }}</h1>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5 w-full mt-8">
        <div v-for="album in displayTopAlbums" :key="album.id" class="flex">
          <CardHome :album="album" @emit-current-color="setCurrentColor" />
        </div>
      </div>
      <div class="flex flex-col mt-10">
        <div class="flex items-center justify-between">
          <h4 class="text-xl font-bold cursor-pointer underline-offset-1 hover:underline">
            Vos Artistes préférés
          </h4>
          <span class="text-cl-subdued font-semibold text-sm cursor-pointer uppercase underline-offset-1 hover:underline">
            Voir tout
          </span>
        </div>
        <div class="grid grid-cols-[repeat(auto-fill,_minmax(180px,_1fr))] grid-rows-1 auto-rows-0 gap-x-5 mt-4 overflow-hidden">
          <CardBasic v-for="artist in topArtists" :key="artist.id" :item="artist" />
        </div>
      </div>
      <div class="flex flex-col mt-10">
        <div class="flex items-center justify-between">
          <h4 class="text-xl font-bold cursor-pointer underline-offset-1 hover:underline">
            Vos Playlists
          </h4>
          <span class="text-cl-subdued font-semibold text-sm cursor-pointer uppercase underline-offset-1 hover:underline">
            Voir tout
          </span>
        </div>
        <div class="grid grid-cols-[repeat(auto-fill,_minmax(180px,_1fr))] grid-rows-1 auto-rows-0 gap-x-5 mt-4 overflow-hidden">
          <CardBasic v-for="playlist in playlists" :key="playlist.id" :item="playlist" />
        </div>
      </div>
      <div class="flex flex-col mt-10">
        <div class="flex items-center justify-between">
          <h4 class="text-xl font-bold cursor-pointer underline-offset-1 hover:underline">
            Vos Albums sauvegardés
          </h4>
          <span class="text-cl-subdued font-semibold text-sm cursor-pointer uppercase underline-offset-1 hover:underline">
            Voir tout
          </span>
        </div>
        <div class="grid grid-cols-[repeat(auto-fill,_minmax(180px,_1fr))] grid-rows-1 auto-rows-0 gap-x-5 mt-4 overflow-hidden">
          <CardBasic v-for="album in displaySavedAlbums" :key="album.id" :item="album" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

const limitRow = 10;

const [
    { data: topAlbums, pending: pendingTopAlbums, error: errorTopAlbums },
    { data: playlists },
    { data: topArtists },
    { data: savedAlbums, pending: pendingSavedAlbums, error: errorSavedAlbums },
  ] = await Promise.all([
  useApi('/v1/me/top/tracks', {
    params: { time_range: 'short_term', limit: 40 },
    pick: 'items',
    default: () => [...Array(6).keys()].map(item => ({ id: item.toString(), name: '', images: [] }))
  }),
  useApi('/v1/me/playlists', {
    params: { limit: 40 },
    pick: 'items',
    default: () => [...Array(limitRow).keys()].map(item => ({ id: item.toString(), type: 'playlist', name: '', images: [] }))
  }),
  useApi('/v1/me/top/artists', {
    params: { time_range: 'short_term', limit: limitRow },
    pick: 'items',
    default: () => [...Array(limitRow).keys()].map(item => ({ id: item.toString(), type: 'artist', name: '', images: [] }))
  }),
  useApi('/v1/me/albums', {
    params: { limit: limitRow },
    pick: 'items',
    default: () => [...Array(limitRow).keys()].map(item => ({ id: item.toString(), type: 'album', name: '', images: [] }))
  }),
])

const formatTopAlbums = (newTopAlbums = null) => {
  if (newTopAlbums) topAlbums.value = newTopAlbums
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
  displayTopAlbums.value = topAlbums.value
}

const defaultTopAlbums = [...Array(6).keys()].map(item => ({ id: item.toString(), name: '', images: [] }))
const displayTopAlbums = ref(defaultTopAlbums)
const displaySavedAlbums = ref([...Array(limitRow).keys()].map(item => ({ id: item.toString(), type: 'album', name: '', images: [] })))

watch(topAlbums, (newTopAlbums) => newTopAlbums.length !== 6 && formatTopAlbums(newTopAlbums), { immediate: true })
watch(savedAlbums, (newSavedAlbums) => {
  const isFormatted = !newSavedAlbums[0].hasOwnProperty('added_at')
  if (!isFormatted) displaySavedAlbums.value = newSavedAlbums.map(item => item.album) 
}, { immediate: true })

const welcomeMessage = new Date().getHours() > 6 && new Date().getHours() < 19 ? 'Bonjour' : 'Bonsoir'

const currentColor = ref<number[]>([18, 18, 18])
const isCardHover = ref(false)

const setCurrentColor = (color: number[], isHover: boolean) => {
  currentColor.value = color
  isCardHover.value = isHover
}

</script>
