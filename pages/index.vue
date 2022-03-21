<template>
  <div class="relative">
    <div
      id="gradientHome"
      class="absolute -top-20 w-full h-85 opacity-20 bg-gradient-to-b from-[var(--current-album-color)]"
      :style="isHomeCardHover ? { animation: 'enterGradient 0.5s linear' } : { animation: 'leaveGradient 0.5s linear' }"
    />
    <div class="flex flex-col mx-10 text-white relative">
      <h1 class="text-4xl text-white font-bold">{{ welcomeMessage }}</h1>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5 w-full mt-8">
        <div v-for="album in topAlbums" :key="album.id" class="flex">
          <HomeCard :album="album" @emit-current-color="setCurrentColor" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

const welcomeMessage = new Date().getHours() > 6 && new Date().getHours() < 19 ? 'Bonjour' : 'Bonsoir'

const defaultColor = ref<number[]>([18, 18, 18])
const lastColor = ref<number[]>([18, 18, 18])
const currentColor = ref<number[]>([18, 18, 18])
const isHomeCardHover = ref(false)

const setCurrentColor = (color: number[], isHover: boolean) => {
  lastColor.value = isHover ? defaultColor.value : currentColor.value
  currentColor.value = isHover ? color : defaultColor.value
  isHomeCardHover.value = isHover
}

const topAlbums = ref([...Array(6).keys()].map(item => ({ id: item, name: '', images: [] })));

const { data: topItems } = await useApi('/v1/me/top/tracks', {
  params: { time_range: 'short_term', limit: 40 },
})

if (topItems.value) {
  var arr = topItems.value?.items
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

#gradientHome {
  --current-album-color: rgba(v-bind(currentColor));
}

@keyframes enterGradient {
  from {
    opacity: 0;
    --current-album-color: rgba(v-bind(lastColor));
  }
  to {
    opacity: .2;
    --current-album-color: rgba(v-bind(currentColor));
  }
}

@keyframes leaveGradient {
  0% {
    opacity: .2;
    --current-album-color: rgba(v-bind(lastColor));
  }
  100% {
    opacity: 0;
    --current-album-color: rgba(v-bind(currentColor));
  }
}

</style>

