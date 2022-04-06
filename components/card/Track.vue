<template>
  <div 
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
    class="grid grid-cols-24 items-center px-4 py-2 rounded-md hover:bg-[rgba(255,255,255,.2)]"
  >
    <div class="col-span-1 flex text-lg leading-1">
      <template v-if="!isHover">
        <span class="text-cl-subdued ml-1">{{ track?.track_number }}</span>
      </template>
      <template v-else>
         <div class="i-teenyicons-play-solid self-start"></div>
      </template>
    </div>
    <div class="col-span-19 flex flex-col">
      <span>{{ track?.name }}</span>
      <div class="flex items-center">
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
    </div>
    <span class="col-span-4 flex items-center justify-end">
      <div v-if="isHover" class="i-teenyicons-heart-outline text-cl-subdued text-lg mt-1 hover:text-white" />
      <span class="mx-6 text-cl-subdued">{{ getDuration(track?.duration_ms) }}</span>
      <div :class="isHover ? 'i-teenyicons-more-horizontal-solid' : 'w-[18px] h-[18px]'" class="text-cl-subdued text-lg hover:text-white" />
    </span>
  </div>
</template>

<script setup lang="ts">

const isHover = ref(false)

defineProps({
  track: {
    type: Object,
    required: true
  }
})

function getDuration (timeMs) {
  let date = new Date(timeMs)
  return `${date.getMinutes()}:${date.getSeconds() < 10 ? 0 : ''}${date.getSeconds()}`
}

</script>