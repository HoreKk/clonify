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
      <SkeletonText tag="span" classes="text-sm line-clamp-1 flex-1" :text="text" />
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

  constructor (text: string, link: string, icon: string, iconActive: string, widthOfText: number) {
    this.text = text
    this.link = link
    this.icon = icon
    this.iconActive = iconActive
  }
}

const props = defineProps({
  item: {
    type: Object as PropType<NavItem>,
    required: true,
  },
})

const { item } = props

const { text, link, icon, iconActive } = toRefs(reactive(item))

</script>