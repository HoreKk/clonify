<template>
  <div class="flex flex-col text-white relative -mt-17">
    <div class="flex transition-colors current-color-item bg-[rgba(var(--current-color),0.3)] pt-20 pl-8 pb-8">
      <img class="shadow-card w-20%" :src="item?.images[0]?.url" />
      <div class="flex flex-col pl-4 justify-end">
        <span class="uppercase text-xs font-semibold">{{ item?.type }}</span>
        <h2 class="font-bold text-20 leading-20">{{ item?.name }}</h2>
        <div class="flex items-center mt-2">
          <template v-for="artist in item?.artists" :key="artist.id">
            <NuxtLink :to="`/artist/${artist?.id}`" class="text-sm font-bold hover:underline">
              {{ artist?.name}}
            </NuxtLink>
          </template>
          <div class="w-1 h-1 bg-white rounded-full mx-1.5 mt-0.5" />
          <span class="text-sm">{{ item?.release_date.split('-')[0] }}</span>
          <div class="w-1 h-1 bg-white rounded-full mx-1.5 mt-0.5" />
          <span class="text-sm">
            {{ `${item?.total_tracks} titres, ` }}
            <span class="text-cl-subdued">{{ getAlbumDuration(item) }}</span>
          </span>
        </div>
      </div>
    </div>
    <div class="flex flex-col px-10 py-6 relative">
      <div class="h-46 absolute top-0 right-0 left-0 current-color-item bg-gradient-to-b from-[rgba(var(--current-color),0.25)] " /> 
      <div class="flex items-center">
        <ButtonPlayPause class="shrink-0 mr-8" :show="true" :animate="false" />
        <div class="i-teenyicons-heart-outline w-8 h-8 text-cl-subdued hover:text-white" />
        <div class="i-teenyicons-arrow-down-circle-outline w-8 h-8 ml-6 text-cl-subdued hover:text-white" />
        <div class="i-teenyicons-more-horizontal-solid w-8 h-8 ml-6 text-cl-subdued hover:text-white" />
      </div>
      <div class="flex flex-col mt-8 relative">
        <div ref="tracksHeader" class="grid grid-cols-24 gap-x-4 items-center sticky top-[68px] mb-4 pt-1.5" :class="isHeaderSticky && 'bg-cl-black-2 -mx-10 px-10 z-10'">
          <div class="flex justify-end mr-1 col-span-1 font-medium text-cl-subdued">#</div>
          <div class="font-medium col-span-21 text-sm uppercase text-cl-subdued">Titre</div> 
          <div class="i-mdi-clock-time-three-outline col-span-2 flex justify-center text-cl-subdued" />
          <div class="h-1px bg-cl-grey-2 rounded-full col-span-full mt-1.5" :class="isHeaderSticky && '-mx-10 px-10'" />
        </div>
        <CardTrack v-for="track in item?.tracks?.items" :key="track?.track_number" :track="track" class="col-span-full" />
      </div>
    </div>
    <div class="flex flex-col mt-10 px-10">
      <div class="flex items-center justify-between">
        <h4 class="text-xl font-bold cursor-pointer underline-offset-1 hover:underline">
          Plus de contenus de {{ item?.artists[0]?.name }}
        </h4>
        <span class="text-cl-subdued font-semibold text-sm cursor-pointer uppercase underline-offset-1 hover:underline">
          Voir la discographie
        </span>
      </div>
      <div class="grid grid-cols-[repeat(auto-fill,_minmax(180px,_1fr))] grid-rows-1 auto-rows-0 gap-x-5 mt-4 overflow-hidden">
        <CardBasic v-for="album in artistAlbums" :key="album.id" :item="album" />
      </div>
    </div>
  </div>
</template>

<script setup>

import Vibrant from 'node-vibrant'
import { Motion } from 'motion/dist/vue.es'

const tracksHeader = ref(null)
const lol = ref(null)
const artistAlbums = ref([...Array(10).keys()].map(item => ({ id: item.toString(), type: 'album', name: '', images: [] })))
const isHeaderSticky = ref(false)
const { $itemTypes } = useNuxtApp()
const router = useRouter()
const { params: { type, id }} = useRoute()

if (!$itemTypes[type] || type === 'artist') router.back()

const itemVibrant = ref([18,18,18])
const { data: item } = await useApi(`/v1/${type}s/${id}`)
const { data: tmpArtistAlbums } = await useApi(`/v1/artists/${item.value?.artists[0]?.id}/albums`, {
  pick: 'items',
})

watch(tmpArtistAlbums, async(newTmp) => {
  if (newTmp) artistAlbums.value = newTmp
}, { immediate: true })

const itemPalette = await Vibrant.from(item.value.images[0].url).getPalette()
itemVibrant.value = itemPalette.Vibrant?.rgb

function getAlbumDuration (album) {
  if (album?.tracks) {
    let durationAlbum = album.tracks.items.reduce((sum, track) => sum + track.duration_ms, 0)
    let date = new Date(durationAlbum)
    return `${date.getMinutes()} min ${date.getSeconds()} s`
  } 
}

onMounted(() => window.addEventListener("scroll", onScroll, true))
onBeforeUnmount(() => window.removeEventListener("scroll", onScroll, true))
const onScroll = () => {
  if (tracksHeader.value) isHeaderSticky.value = tracksHeader.value.offsetTop > 0
}

</script>

<style>

.current-color-item {
  --current-color: v-bind(itemVibrant);
}

</style>