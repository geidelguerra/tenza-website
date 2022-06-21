<template>
  <header class="fixed top-0 z-40 flex justify-between w-full">
    <NuxtLink to="/" class="block bg-transparent absolute top-[45px] left-[45px]">
      <Logo
        class="w-[42px] transition-colors duration-500"
        :class="lightMode ? 'text-black' : 'text-white'"
      />
    </NuxtLink>
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
