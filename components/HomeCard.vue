<template>
  <div 
    class="flex items-center bg-[#282828]/90 backdrop-blur rounded cursor-pointer w-full shadow-lg" 
    :class="name && 'hover:bg-cl-card-hover'"
    @mouseenter="emit('emit-current-color', findDominantColor(), true)"
    @mouseleave="emit('emit-current-color', findDominantColor(), false)"
  >
    <img v-if="images.length" :src="images[1]?.url" crossorigin="anonymous" class="w-22 h-22 rounded-l" />
    <div v-else class="w-22 h-22 bg-cl-card-hover rounded-l" />
    <h3 class="font-semibold mx-4">{{ name }}</h3>
  </div>
</template>

<script lang="ts" setup>

import { PropType } from 'vue'
import { useClonify } from '~/stores/spotify'
import ColorThief from 'colorthief/dist/color-thief.mjs'

const colorThief = new ColorThief();
const clonifyStore = useClonify()

const emit = defineEmits<{
  (e: 'emit-current-color', color: number[], isHover: boolean): void
}>()

class HomeCard {
  id: string
  name: string
  images: object[]

  constructor (name: string, images: object[]) {
    this.name = name
    this.images = images
  }
}

const props = defineProps({
  album: {
    type: Object as PropType<HomeCard>,
    required: true,
  },
  cardElement: {
    type: Object as PropType<HTMLElement>,
    required: true,
  },
})

const { album, cardElement } = toRefs(props)

const { name, images } = toRefs(album.value)

const findDominantColor = () => {
  let img = cardElement.value.querySelector('img')
  if (img) return colorThief.getColor(img)
}

</script>