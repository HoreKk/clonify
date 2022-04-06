<template>
  <div class="flex flex-col text-white relative -mt-17">
    <Motion
      v-show="true"
      class="flex transition-colors current-color-item pt-20 pl-8 pb-8"
      :initial="{ opacity: 0, 'background-color': 'rgba(18,18,18,0.3)' }"
      :animate="{ opacity: 1, 'background-color': `rgba(${itemVibrant},0.3)` }"
    >
      <img class="shadow-card w-20%" :src="item?.images[0]?.url" />
      <div class="flex flex-col pl-4 justify-end">
        <span class="uppercase text-sm font-bold">{{ item?.type }}</span>
        <h2 class="font-bold text-20 leading-20">{{ item?.name }}</h2>
        
      </div>
    </Motion>
    <div class="flex flex-col current-color-item bg-gradient-to-b from-[rgba(var(--current-color),0.25)]">
     
    </div>
  </div>
</template>

<script setup>

import Vibrant from 'node-vibrant'
import { Motion } from 'motion/dist/vue.es'

const { params: { id }} = useRoute()

const itemVibrant = ref([18,18,18])
const { data: item } = await useApi(`/v1/artists/${id}`)

watch(item, async(newItem) => {
  const itemPalette = await Vibrant.from(newItem.images[0].url).getPalette()
  itemVibrant.value = itemPalette.Vibrant?.rgb
  item.value = newItem
}, { immediate: true })

</script>

<style>

.current-color-item {
  --current-color: v-bind(itemVibrant);
}

</style>