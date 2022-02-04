<template>
  <div class="relative flex flex-col h-screen text-black">
    <div class="relative w-full max-w-[1920px] mx-auto">
      <div class="absolute top-[45px] left-[45px] z-40">
        <NuxtLink to="/" class="block bg-transparent">
          <Logo class="w-[42px] transition-colors duration-500" :class="lightMode ? 'text-black' : 'text-white'" />
        </NuxtLink>
      </div>
      <TheNavbar :light-mode="lightMode" />
    </div>
    <Nuxt class="shadow-lg relative mx-auto w-full max-w-[1920px] h-screen overflow-hidden bg-white" />
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
      const { path, hash } = this.$route

      if (path === '' || path === '/' || path === '/studio' || path.startsWith('/projects')) {
        return !['#featured', '#intro'].includes(hash)
      }

      return false
    }
  }
}
</script>
