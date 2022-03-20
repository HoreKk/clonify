<template>
   <NuxtLink
     v-if="text"
     :to="link" 
     exact-active-class="text-white" 
     class="flex items-center text-sm hover:text-white not-first:mt-1" 
     v-slot="{ isExactActive }"
   >
      <div 
        :class="isExactActive ? iconActive : icon" 
        class="mr-4 w-5 h-5" 
      />
      <p v-if="clonifyStore.isConnected" class="test-sm">{{ text }}</p>
      <div v-else :style="{ width: widthOfText + 'px' }" class="h-2 rounded-lg bg-cl-card-hover"></div>
    </NuxtLink>
</template>

<script lang="ts" setup>

import { PropType } from 'vue'
import { useClonify } from '~/stores/spotify'

const clonifyStore = useClonify()

class NavItem {
  text: string
  link: string
  icon: string
  iconActive: string
  widthOfText: number

  constructor (text: string, link: string, icon: string, iconActive: string, widthOfText: number) {
    this.text = text
    this.link = link
    this.icon = icon
    this.iconActive = iconActive
    this.widthOfText = widthOfText
  }
}

const props = defineProps({
  item: {
    type: Object as PropType<NavItem>,
    required: true,
  },
})

const { item } = toRefs(props)

const { text, link, icon, iconActive, widthOfText } = item.value

</script>