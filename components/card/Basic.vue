<template>
  <NuxtLink
    :to="`/item-${type}/${id}`"
    class="bg-cl-black-2 transition-colors hover:bg-cl-grey p-5 backdrop-blur relative rounded-lg cursor-pointer shadow-xl"
    @mouseenter="isCardHover = true"
    @mouseleave="isCardHover = false"
  >
    <div class="relative pb-[100%]">
      <ButtonPlayPause 
        class="absolute z-10 bottom-2 right-2" 
        :show="isCardHover"
      />
      <img
        v-if="clonifyStore.isConnected && images?.length"
        class="absolute shadow-card object-cover object-center w-full h-full"
        :class="type === 'artist' ? 'rounded-full' : 'rounded-lg'"
        :src="images[displayImages.length - 1]?.url"
      />
      <div
        v-else 
        :class="[type === 'artist' ? 'rounded-full' : 'rounded-lg', !clonifyStore.isConnected && 'animate-pulse']" 
        class="absolute flex justify-center items-center w-full h-full bg-cl-grey-2 shadow-card" 
      >
        <div v-if="clonifyStore.isConnected" class="i-ph-music-notes-simple-light text-cl-subdued w-62% h-62%" />
      </div>
    </div>
    <div class="flex flex-col mt-5">
      <SkeletonText :text="name" classes="text-md font-semibold line-clamp-1" width="w-24" height="h-3" />
      <SkeletonText
        :text="$itemDescription(name, { description, artists })[type]"
        classes="text-sm text-cl-subdued mt-2 line-clamp-2 h-10"
        classesSkeleton="mt-1"
        width="w-8"
      />
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>

import { PropType } from 'vue'
import Item from '~~/types/item'
import { useClonify } from '~~/stores/spotify';

const { $itemDescription } = useNuxtApp()
const clonifyStore = useClonify()

const isCardHover = ref(false)

const props = defineProps({
  item: {
    type: Object as PropType<Item>,
    required: true,
  },
})

const { item } = props

const { id, name, description, type, images, artists } = toRefs(reactive(item))

const displayImages = computed(() => images.value.filter(img => {
  if (!img.width) return img
  return img.width >= 100
}))

</script>