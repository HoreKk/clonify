<template>
  <Presence>
    <Motion
      v-show="showCard"
      id="motion-root"
      class="absolute w-full -top-20 h-95"
      @animationend="showCard = false"
      :animate="{
        opacity: isCardHover ? .3 : 0,
        'background-image': 'linear-gradient(var(--current-color), transparent)'
      }"
      :exit="{
        opacity: 0,
        'background-image': 'linear-gradient(rgba(18, 18, 18), transparent)'
      }"
      :transition="{ duration: 1.25, easing: 'ease-in-out' }"
    />
  </Presence>
</template>

<script lang="ts" setup>

import { Motion, Presence } from 'motion/dist/vue.es'

const showCard = ref(true)

defineProps({
  isCardHover: {
    type: Boolean,
    required: true,
    default: false,
  },
  currentColor: {
    type: Array,
    required: true,
    default: [18,18,18]
  }
})

</script>

<style>

#motion-root {
  --current-color: rgba(v-bind(currentColor));
}

</style>