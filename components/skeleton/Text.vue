<template>
  <component v-if="clonifyStore.isConnected && text" :is="tag" :class="classes">
    {{ text }}
  </component>
  <template v-else>
    <div
      :style="!width && { width: getTextWidth(text) + 'px' }"
      :class="[classesSkeleton, height, width]"
      class="flex-shrink rounded-full bg-cl-grey-2 animate-pulse"
    />
  </template>
</template>

<script lang="ts" setup>

import { useClonify } from '~~/stores/spotify';

const clonifyStore = useClonify()

function getTextWidth(text) {
  return text ? text.length * 6 : 0
}

defineProps({
  text: {
    type: String,
    default: '',
  },
  classes: {
    type: String || Array,
  },
  classesSkeleton: {
    type: String,
    default: '',
  },
  tag: {
    type: String,
    default: 'span',
  },
  height: {
    type: String,
    default: 'h-2'
  },
  width: {
    type: String,
  },
})

</script>