<template>
  <Presence>
    <Motion
      v-show="show"
      :animate="{ opacity: show ? 1 : 0, y: show ? 0 : baseY }"
      :exit="{ opacity: 0, y: baseY }"
      :transition="{ duration: .25, easing: 'ease-in-out' }"  
    >
      <div
        class="flex justify-center items-center rounded-full w-13 h-13 bg-cl-primary select-none shadow-card hover:(scale-103 brightness-105) active:(scale-100 brightness-75)"
        @click="changeState"
      >
        <svg v-if="state" role="img" height="24" width="24" viewBox="0 0 24 24" class="Svg-sc-1bi12j5-0 hDgDGI">
          <path d="M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7H5.7zm10 0a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7h-2.6z"></path>
        </svg>
        <div v-else class="w-6.5 h-6.5 text-black i-teenyicons-play-solid" />
      </div>
    </Motion>
  </Presence>
</template>

<script lang="ts" setup>

import { Motion, Presence } from 'motion/dist/vue.es'


const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  baseY: {
    type: Number,
    default: 5,
  }
})

const emit = defineEmits<{
  (e: 'emit-force-show', show: boolean): void
}>()

const { show } = toRefs(props)

const state = ref(false)

const changeState = () => {
  state.value = !state.value
  emit('emit-force-show', state.value)
}

</script>

<style>

.animate-translate {
  animation: yes .3s ease-in-out;
}


@keyframes yes {
  from {
    y: -50px;
  }
  to {
    y: 0;
  }
}


</style>