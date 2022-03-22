<template>
  <div class="relative">
    <Presence>
      <Motion
        v-show="showCard"
        id="motion-root"
        class="absolute w-full -top-20 h-95"
        @animationend="showCard = false"
        :animate="{
          opacity: isCardHomeHover ? .3 : 0,
          'background-image': 'linear-gradient(var(--current-color), transparent)'
        }"
        :exit="{
          opacity: 0,
          'background-image': 'linear-gradient(rgba(18, 18, 18), transparent)'
        }"
        :transition="{ duration: 1.25, easing: 'ease-in-out' }"
      />
    </Presence>
    <div class="flex flex-col mx-10 text-white relative">
      <h1 class="text-4xl text-white font-bold">{{ welcomeMessage }}</h1>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5 w-full mt-8">
        <div v-for="album in topAlbums" :key="album.id" class="flex">
          <CardHome :album="album" @emit-current-color="setCurrentColor" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { Motion, Presence } from 'motion/dist/vue.es'

const welcomeMessage = new Date().getHours() > 6 && new Date().getHours() < 19 ? 'Bonjour' : 'Bonsoir'

const currentColor = ref<number[]>([18, 18, 18])
const isCardHomeHover = ref(false)
const showCard = ref(true)

const setCurrentColor = async (color: number[], isHover: boolean) => {
  currentColor.value = color
  isCardHomeHover.value = isHover
}

const topAlbums = ref([...Array(6).keys()].map(item => ({ id: item, name: '', images: [] })));

const { data: topItems } = await useApi('/v1/me/top/tracks', {
  params: { time_range: 'short_term', limit: 40 },
  pick: 'items',
})

if (topItems.value) {
  var arr = topItems.value
    .map(item => item.album)
    .map(item => ({ id: item["id"], value: item }))
  
  topAlbums.value = Array.from(
      arr.reduce((map, item) => 
          (map.get(item.id).count++, map) 
      , new Map(arr.map(o => 
          [o.id, Object.assign({}, o, { count: 0 })]
      ))), ([k, o]) => o
  ).sort((a, b) => b.count - a.count).slice(0, 6).map(item => item.value)
}

</script>

<style>

#motion-root {
  --current-color: rgba(v-bind(currentColor));
}

</style>

