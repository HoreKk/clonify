<template>
  <div
    ref="cardHomeRef"
    class="flex items-center bg-[rgba(255,255,255,.1)] backdrop-blur relative rounded cursor-pointer w-full shadow-lg" 
    :class="name && 'hover:bg-[rgba(255,255,255,.2)]'"
    @mouseenter="emitCurrentColor(true)"
    @mouseleave="emitCurrentColor(false)"
  >
    <img v-if="clonifyStore.isConnected && images.length" :src="images[0]?.url" crossorigin="anonymous" class="w-22 h-22 shrink-0 shadow-card rounded-l select-none" />
    <div v-else class="w-22 h-22 bg-cl-grey-2 mr-5 shadow-card rounded-l flex-none animate-pulse" />
    <SkeletonText
      tag="p"
      height="h-4"
      width="w-45%"
      :text="name"
      classes="font-semibold mx-4 line-clamp-2"
    />
    <ButtonPlayPause
      class="ml-auto shrink-0 mr-6"
      :show="forceShowButtonPlayer ? forceShowButtonPlayer : isCardHomeHover"
      :baseY="0"
      @emit-force-show="(show) => forceShowButtonPlayer = show"
    />
  </div>
</template>

<script lang="ts" setup>

import { PropType } from 'vue'
import Vibrant from 'node-vibrant'
import Item from '~~/types/item'
import { useClonify } from '~~/stores/spotify'

const clonifyStore = useClonify()

const props = defineProps({
  album: {
    type: Object as PropType<Item>,
    required: true,
  },
})

const { album } = props

const { name, images } = toRefs(reactive(album))

const emit = defineEmits<{
  (e: 'emit-current-color', color: number[], isHover: boolean): void
}>()

const emitCurrentColor = (state: boolean) => {
  isCardHomeHover.value = state
  emit('emit-current-color', palette.value?.Vibrant?.rgb, state)
}

const cardHomeRef = ref(null)
const isCardHomeHover = ref(false)
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