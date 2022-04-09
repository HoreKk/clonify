<template>
  <div 
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
    class="grid grid-cols-24 items-center px-4 py-2 rounded-md hover:bg-[rgba(255,255,255,.2)]"
  >
    <div class="col-span-1 flex text-lg leading-1">
      <template v-if="!isHover">
        <span class="text-cl-subdued ml-1">{{ indexTrack + 1 }}</span>
      </template>
      <template v-else>
         <div class="i-teenyicons-play-solid self-start"></div>
      </template>
    </div>
    <div :class="itemType == 'playlist' ? 'col-span-9' : 'col-span-19'" class="flex flex-col">
      <SkeletonText :text="track?.name" width="w-36" height="h-3" />
      <div v-if="clonifyStore.isConnected" class="flex items-center">
        <NuxtLink
          v-for="(artist, index) in track?.artists"
          :key="artist.id"
          :to="'/artist/' + artist.id" 
          class="text-sm" :class="!isHover && 'text-cl-subdued'"
        >
          {{ index !== 0 ? `, ` : '' }}
          <span class="hover:underline">{{ artist?.name }}</span>
        </NuxtLink>
      </div>
      <SkeletonText v-else width="w-16" classes-skeleton="mt-3" />
    </div>
    <div v-if="itemType == 'playlist'" class="col-span-5">
      <NuxtLink :to="'/item-album/' + track?.album?.id" class="text-sm" :class="!isHover && 'text-cl-subdued'">
        <SkeletonText
          :text="track?.album?.name"
          classes="hover:underline"
          width="w-18"
        />
      </NuxtLink>
    </div>
    <div v-if="itemType == 'playlist'" class="col-span-5">
      <SkeletonText
        :text="getFormattedDate(track?.added_at, 'dd MMM yyyy')"
        classes="text-sm text-cl-subdued"
        width="w-22"
      />
    </div>
    <span class="col-span-4 flex items-center justify-end">
      <div v-if="isHover" class="i-teenyicons-heart-outline text-cl-subdued text-lg mt-1 hover:text-white" />
      <SkeletonText :text="getDuration(track?.duration_ms)" width="w-20" height="h-3" classes="mx-6 text-cl-subdued" />
      <div :class="isHover ? 'i-teenyicons-more-horizontal-solid' : 'w-[18px] h-[18px]'" class="text-cl-subdued text-lg hover:text-white" />
    </span>
  </div>
</template>

<script setup lang="ts">

import { format as fnsFormat } from 'date-fns'
import { fr } from 'date-fns/locale/index.js'
import { useClonify } from '~~/stores/spotify';

const clonifyStore = useClonify()
const isHover = ref(false)

defineProps({
  track: {
    type: Object,
    required: true
  },
  indexTrack: {
    type: Number,
    required: true
  },
  itemType: {
    type: String,
    required: true
  }
})

function getDuration (timeMs) {
  let date = new Date(timeMs)
  return `${date.getMinutes()}:${date.getSeconds() < 10 ? 0 : ''}${date.getSeconds()}`
}

function getFormattedDate (date, format) {
  if (!date) return
  return fnsFormat(new Date(date), format, { locale: fr })
}

</script>