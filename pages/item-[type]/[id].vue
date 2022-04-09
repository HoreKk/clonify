<template>
  <div class="flex flex-col text-white relative -mt-17">
    <div class="flex transition-colors current-color-item bg-[rgba(var(--current-color),0.3)] pt-20 px-8 pb-8">
      <img 
        v-if="clonifyStore.isConnected && item?.images?.length" 
        class="shadow-card w-20% aspect-square object-cover"
        :src="item?.images[0]?.url"
      />
      <div
        v-else
        :class="[!clonifyStore.isConnected && 'animate-pulse']" 
        class="shadow-card w-20% aspect-square bg-cl-grey-2" 
      />
      <div class="flex flex-col px-6 justify-end">
        <SkeletonText :text="item?.type" height="h-4" width="w-16" classes="uppercase text-xs font-semibold" />
        <SkeletonText :text="item?.name" tag="h2" width="w-82" height="h-12" classes="font-bold text-20 leading-20 mt-4" classesSkeleton="mt-4" />
        <SkeletonText 
          v-if="!clonifyStore.isConnected || item?.description"
          :text="item?.description"
          tag="p"
          width="w-150"
          height="h-3"
          classesSkeleton="mt-4"
          classes="mt-4 text-cl-subdued"
        />
        <div class="flex items-center mt-3">
          <template v-if="clonifyStore.isConnected">
            <template v-if="type === 'album'">
              <NuxtLink 
                v-for="(artist, index) in item?.artists"
                :key="artist.id"
                :to="`/artist/${artist?.id}`"
                class="text-sm font-bold hover:underline"
              >
                {{ index !== 0 ? `, ` : '' }}
                {{ artist?.name }}
              </NuxtLink>
            </template>
            <template v-if="type === 'playlist'">
              <NuxtLink :to="`/artist/${item?.owner?.id}`" class="text-sm font-bold hover:underline">
                {{ item?.owner?.display_name }}
              </NuxtLink>
            </template>
          </template>
          <template v-else>
            <SkeletonText width="w-16" />
          </template>
          <div class="w-1 h-1 bg-white rounded-full mx-1.5 mt-0.5" />
          <span class="text-sm">
            <SkeletonText 
              :text="type == 'playlist' ? `${item?.followers?.total} likes` : item?.release_date?.split('-')[0]"
              width="w-16"
            />
          </span>
          <div class="w-1 h-1 bg-white rounded-full mx-1.5 mt-0.5" />
          <span class="text-sm">
            <SkeletonText 
              :text="(type == 'playlist' ? item?.tracks?.total : item?.total_tracks) + ' titres, '"
              width="w-16"
            />
            <SkeletonText
              classes="text-cl-subdued"
              :text="getAlbumDuration(item)"
              height="h-0"
            />
          </span>
        </div>
      </div>
    </div>
    <div class="flex flex-col px-10 py-6 relative">
      <div class="h-62 absolute top-0 right-0 left-0 current-color-item bg-gradient-to-b from-[rgba(var(--current-color),0.25)] " /> 
      <div class="flex items-center">
        <ButtonPlayPause class="shrink-0 mr-8" :show="true" :animate="false" />
        <div class="i-teenyicons-heart-outline w-8 h-8 text-cl-subdued hover:text-white" />
        <div class="i-teenyicons-arrow-down-circle-outline w-8 h-8 ml-6 text-cl-subdued hover:text-white" />
        <div class="i-teenyicons-more-horizontal-solid w-8 h-8 ml-6 text-cl-subdued hover:text-white" />
      </div>
      <div class="flex flex-col mt-8 relative">
        <div ref="tracksHeader" class="grid grid-cols-24 items-center sticky top-[68px] mb-4 pt-1.5" :class="isHeaderSticky ? 'bg-cl-black-2 -mx-10 px-14 z-10' : 'px-4'">
          <div class="flex ml-1 col-span-1 font-medium text-cl-subdued">#</div>
          <div :class="type === 'playlist' ? 'col-span-9' : 'col-span-19'" class="font-medium text-sm uppercase text-cl-subdued">Titre</div>
          <div v-if="type === 'playlist'" class="col-span-5 font-medium text-sm uppercase text-cl-subdued">Album</div>
          <div v-if="type === 'playlist'" class="col-span-5 font-medium text-sm uppercase text-cl-subdued">Ajouté le</div>
          <div class="col-span-4 flex justify-end mr-12 text-cl-subdued">
            <div class="i-mdi-clock-time-three-outline" />
          </div>
          <div class="h-1px bg-cl-grey-2 rounded-full col-span-full mt-1.5" :class="isHeaderSticky ? '-mx-14 px-10' : '-mx-3'" />
        </div>
        <CardTrack 
          v-for="(track, indexTrack) in item?.tracks?.items"
          :key="track?.track_number"
          :indexTrack="indexTrack"
          :itemType="type"
          :track="track"
          class="col-span-full"
        />
      </div>
    </div>
    <div v-if="type === 'album'" class="flex flex-col mt-10 px-10">
      <div class="flex items-center justify-between">
        <SkeletonText
          tag="h4"
          :text="`Plus de contenus de ${item?.artists[0]?.name }`"
          classes="text-xl font-bold cursor-pointer underline-offset-1 hover:underline"
          height="h-3"
        />
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
import { intervalToDuration } from 'date-fns'
import { useClonify } from '~/stores/spotify'

const clonifyStore = useClonify()
const tracksHeader = ref(null)
const artistAlbums = ref([...Array(10).keys()].map(item => ({ id: item.toString(), type: 'album', name: '', images: [] })))
const isHeaderSticky = ref(false)
const { $itemTypes, $cookies } = useNuxtApp()
const router = useRouter()
const { params: { type, id }} = useRoute()

if (!$itemTypes[type] || type === 'artist') router.back()

const itemVibrant = ref([18,18,18])

const { data: item } = await useApi(`/v1/${type}s/${id}`, {
  default: () => ({ tracks: { items: [...Array(10).keys()].map(key => ({ id: key.toString() })) }, images: [], artists: [] }),
})

watch(item, async(newItem) => {
  if (newItem?.images?.length) {

    item.value.tracks.items = item.value.tracks.items.map(track => ({ ...track, ...track.track }))

    if (type === 'album') {
      let { items } = await $fetch(
        `/v1/artists/${newItem?.artists[0]?.id}/albums`, {
          headers: { 
            Authorization: $cookies.get('clonify-auth-token')
          }
        }
      )
      items = items.filter(item => item.id !== newItem.id)
      artistAlbums.value = items
    }
    
    if (!process.server) {
      var img = document.createElement('img')
      img.setAttribute('src', item.value?.images[0]?.url)
      img.setAttribute('crossorigin', 'anonymous')
      img.addEventListener('load', async () => {
        var vibrant = new Vibrant(img)
        let palette = await vibrant.getPalette()
        itemVibrant.value = palette.Vibrant?.rgb
        setTimeout(() => {
          clonifyStore.currentItem.display_name = newItem?.name
          // clonifyStore.currentItem.color = itemVibrant.value
        }, 200)
      })
    }
    
  }
}, { immediate: true })

function getAlbumDuration (album) {
  if (album?.tracks?.items?.length && Object.keys(album.tracks.items[0])?.length > 1) {
    let durationAlbum = album.tracks.items.reduce((sum, track) => sum + track.duration_ms, 0)
    const formatted = intervalToDuration({ start: 0, end: durationAlbum })
    return `${formatted.hours ? `${formatted.hours} h ` : ''} ${formatted.minutes} m`
  }
}

onMounted(() => window.addEventListener("scroll", onScroll, true))
onBeforeUnmount(() => window.removeEventListener("scroll", onScroll, true))
const onScroll = () => isHeaderSticky.value = tracksHeader.value.offsetTop > 0

</script>

<style>

.current-color-item {
  --current-color: v-bind(itemVibrant);
}

</style>