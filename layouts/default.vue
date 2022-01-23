<template>
  <div class="flex flex-col h-screen text-black">
    <div class="fixed top-[45px] left-[45px] z-40">
      <NuxtLink to="/" class="bg-transparent block">
        <Logo class="w-[42px] transition-colors duration-500" :class="lightMode ? 'text-black' : 'text-white'" />
      </NuxtLink>
    </div>
    <TheNavbar />
    <Nuxt />
  </div>
</template>

<script>
import TheNavbar from '@/components/TheNavbar.vue'
import Logo from '~/assets/images/logo.svg?inline'

export default {
  components: {
    Logo,
    TheNavbar
  },
  computed: {
    lightMode () {
      return this.$route.path !== '/'
    }
  }
}
</script>
