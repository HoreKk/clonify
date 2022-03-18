<template>
   <NuxtLink 
     :to="link" 
     exact-active-class="text-white" 
     class="flex items-center text-sm hover:text-white" 
     v-slot="{ isExactActive }"
   >
      <div 
        :class="isExactActive ? iconActive : icon" 
        class="mr-4 w-5 h-5" 
      />
      <p class="test-sm">{{ text }}</p>
    </NuxtLink>
</template>

<script lang="ts" setup>

import { PropType } from 'vue'

class NavItem {
  text: string
  link: string
  icon: string
  iconActive: string

  constructor (text: string, link: string, icon: string, iconActive: string) {
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

const { text, link, icon, iconActive } = toRefs(props.item)

</script>