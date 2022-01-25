<template>
  <div class="flex flex-col h-screen text-black">
    <div class="fixed top-[45px] left-[45px] z-40">
      <NuxtLink to="/" class="block bg-transparent">
        <Logo class="w-[42px] transition-colors duration-500" :class="lightMode ? 'text-black' : 'text-white'" />
      </NuxtLink>
    </div>
    <TheNavbar :light-mode="lightMode" />
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
      const { path, query } = this.$route

      if (!path || path === '/') {
        return query.l && query.l !== 'featured'
      }

      return false
    }
  }
}
</script>
