<template>
  <div
    class="bg-cl-black-2 transition-colors hover:bg-cl-grey p-5 backdrop-blur relative rounded-lg cursor-pointer shadow-xl"
  >
    <div class="relative pb-[100%]">
      <img 
        class="absolute shadow-card object-cover object-center w-full h-full"
        :class="type === 'artist' ? 'rounded-full' : 'rounded-lg'"
        :src="images[2]?.url"
      />
    </div>
    <div class="flex flex-col">
      <span class="text-md font-semibold mt-5 line-clamp-1">
        {{ name }}
      </span>
      <span v-if="type" class="text-sm text-[#a7a7a7] mt-1">
        {{ itemTypes[type] }}
      </span>
    </div>
  </div>

</template>

<script lang="ts" setup>

import { PropType } from 'vue'
import Item from '~~/types/item'

const itemTypes = {
  album: 'Album',
  artist: 'Artiste',
  playlist: 'Playlist',
  track: 'Titre',
}

const props = defineProps({
  item: {
    type: Object as PropType<Item>,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  }
})

const { item } = props

const { name, type, images } = toRefs(reactive(item))


</script>