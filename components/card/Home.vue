<template>
  <div
    ref="cardHomeRef"
    class="flex items-center bg-[rgba(255,255,255,.1)] backdrop-blur relative rounded cursor-pointer w-full shadow-lg" 
    :class="name && 'hover:bg-[rgba(255,255,255,.2)]'"
    @mouseenter="emitCurrentColor(true)"
    @mouseleave="emitCurrentColor(false)"
  >
    <img v-if="images.length" :src="images[0]?.url" crossorigin="anonymous" class="w-22 h-22 shrink-0 rounded-l select-none" />
    <div v-else class="w-22 h-22 bg-cl-card-hover mr-4 rounded-l flex-none" />
    <Text tag="p" height="h-4" width="w-45%" :text="name" classes="font-semibold mx-4 line-clamp-2" />
    <CardButtonPlayPause 
      class="ml-auto shrink-0 mr-6" 
      :show="forceShowButtonPlayer ? forceShowButtonPlayer : isCardHomeHover"
      @emit-force-show="(show) => forceShowButtonPlayer = show" 
    />
  </div>
</template>

<script lang="ts" setup>

import { PropType } from 'vue'
import Vibrant from 'node-vibrant'

class CardHome {
  name: string
  images: { url: string }[]

  constructor (name: string, images: { url: string }[]) {
    this.name = name
    this.images = images
  }
}

const props = defineProps({
  album: {
    type: Object as PropType<CardHome>,
    required: true,
  },
})

const { album } = props

const { name, images } = toRefs(reactive(album))

const emit = defineEmits<{
  (e: 'emit-current-color', color: number[], isHover: boolean): void
}>()

const emitCurrentColor = async (state: boolean) => {
  isCardHomeHover.value = state
  emit('emit-current-color', palette.value?.Vibrant?.rgb, state)
}

const cardHomeRef = ref(null)
const isCardHomeHover = ref(!images.value.length)
const forceShowButtonPlayer = ref(false)
const palette = ref(null)

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