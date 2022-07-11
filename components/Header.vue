<template>
  <header class="fixed z-40 flex w-full p-[45px] justify-between">
    <NuxtLink to="/" class="block bg-transparent">
      <Logo
        class="w-[42px] transition-colors duration-500"
        :class="lightMode ? 'text-black' : 'text-white'"
      />
    </NuxtLink>

    <div class="flex-1" />

    <TheNavbar :light-mode="lightMode" />
  </header>
</template>

<script>
import TheNavbar from '@/components/TheNavbar.vue'
import Logo from '~/assets/images/logo.svg?inline'

export default {
  components: {
    TheNavbar,
    Logo
  },
  props: {
    lightMode: Boolean
  }
}
</script>
