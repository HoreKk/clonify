<template>
  <div 
    class="flex items-center bg-[#282828]/90 backdrop-blur rounded cursor-pointer w-full shadow-lg" 
    :class="name && 'hover:bg-cl-card-hover'"
    @mouseenter="emitCurrentColor(true)"
    @mouseleave="emitCurrentColor(false)"
  >
    <img v-if="images.length" :src="images[0]?.url" crossorigin="anonymous" class="w-22 h-22 rounded-l" />
    <div v-else class="w-22 h-22 bg-cl-card-hover rounded-l" />
    <h3 class="font-semibold mx-4">{{ name }}</h3>
  </div>
</template>

<script lang="ts" setup>

import { PropType } from 'vue'
import Vibrant from 'node-vibrant'

const palette = ref(null)

const emit = defineEmits<{
  (e: 'emit-current-color', color: number[], isHover: boolean): void
}>()

const emitCurrentColor = async (state: boolean) => {
  emit('emit-current-color', palette.value?.Vibrant?.rgb, state)
}

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
})

const { album } = toRefs(props)

const { name, images } = toRefs(album.value)

if (!process.server) {
  var img = document.createElement('img');
  img.setAttribute('src', images.value[0]?.url);
  img.setAttribute('crossorigin', 'anonymous');
  img.addEventListener('load', async () => {
      var vibrant = new Vibrant(img);
      palette.value = await vibrant.getPalette();
  });
}

</script>