<template>
  <div class="flex flex-col text-white relative">
    <div class="flex">
      <img class="shadow-card" :src="item?.images[0]?.url" />
      {{ itemVibrant }}
    </div>
  </div>
</template>

<script setup>

import Vibrant from 'node-vibrant'

const { $itemTypes } = useNuxtApp()
const router = useRouter()
const { params: { type, id }} = useRoute()

if (!$itemTypes[type]) router.go(-1)

const itemVibrant = ref(null)
const { data: item, pending, error } = await useApi(`/v1/${type}s/${id}`)

watch(item, async(newItem) => {
  const itemPalette = await Vibrant.from(newItem.images[0].url).getPalette()
  itemVibrant.value = itemPalette.Vibrant?.rgb
  item.value = newItem
}, { immediate: true })

</script>