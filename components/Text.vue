<template>
  <component v-if="clonifyStore.isConnected" :is="tag" :class="classes">
    {{ text }}
  </component>
  <template v-else>
    <div :style="!width && { width: getTextWidth(text) + 'px' }" :class="[height, width]" class="h-2 rounded-lg bg-cl-card-hover" />
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
    type: String,
    required: true,
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