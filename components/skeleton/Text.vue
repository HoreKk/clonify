<template>
  <component v-if="clonifyStore.isConnected && text" :is="tag" :class="classes">
    {{ text }}
  </component>
  <template v-else>
    <div
      :style="!width && { width: getTextWidth(text) + 'px' }"
      :class="[classesSkeleton, height, width]"
      class="h-2 flex-shrink rounded-lg bg-cl-grey-2 animate-pulse"
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
    required: true,
    default: '',
  },
  classes: {
    type: String || Array,
    required: true,
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