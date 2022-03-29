<template>
  <div class="relative flex flex-col h-screen overflow-hidden text-black">
    <div class="relative w-full max-w-[1920px] mx-auto">
      <div class="absolute top-[45px] left-[45px] z-40">
        <NuxtLink to="/" class="block bg-transparent">
          <Logo class="w-[42px] transition-colors duration-500" :class="lightMode ? 'text-black' : 'text-white'" />
        </NuxtLink>
      </div>
      <TheNavbar :light-mode="lightMode" />
    </div>
    <Nuxt class="shadow-2xl relative mx-auto w-full max-w-[1920px] h-screen overflow-hidden bg-white" />
    <transition name="page">
      <div
        v-if="loading"
        class="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-white"
      >
        <div class="text-[100px] font-black text-black">
          Loading...
        </div>
      </div>
    </transition>
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

      if ((path === '' || path === '/') && !hash) {
        return false
      }

      if (path === '' || path === '/' || path.startsWith('/projects')) {
        return !['#featured', '#intro'].includes(hash)
      }

      if (path === '/studio') {
        return true
      }

      return false
    },
    loading: {
      get () {
        return this.$store.state.loading
      },
      set (val) {
        this.$store.commit('loading', val)
      }
    }
  }
}
</script>
