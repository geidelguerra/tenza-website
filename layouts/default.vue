<template>
  <div class="relative flex flex-col h-screen overflow-hidden text-black">
    <div class="relative w-full mx-auto">
      <div class="absolute top-[45px] left-[45px] z-40">
        <NuxtLink to="/" class="block bg-transparent">
          <Logo
            class="w-[42px] transition-colors duration-500"
            :class="lightMode ? 'text-black' : 'text-white'"
          />
        </NuxtLink>
      </div>
      <TheNavbar :light-mode="lightMode" />
    </div>
    <Nuxt class="relative w-full h-screen mx-auto overflow-hidden bg-white shadow-2xl" />
    <transition name="page">
      <div
        v-if="showSplash"
        class="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-white"
      >
        <Splash />
      </div>
    </transition>
    <transition name="slide-up">
      <Footer v-if="showFooter" class="fixed bottom-0 z-40" />
    </transition>
  </div>
</template>

<script>
import TheNavbar from '@/components/TheNavbar.vue'
import Logo from '~/assets/images/logo.svg?inline'
import Splash from '~/components/Splash.vue'
import Footer from '~/components/Footer.vue'

export default {
  components: {
    Logo,
    TheNavbar,
    Splash,
    Footer
  },
  data () {
    return {
      showSplash: false
    }
  },
  computed: {
    lightMode () {
      return this.$store.state.lightMode
    },
    loading () {
      return this.$store.state.loading
    },
    showFooter () {
      return this.$store.state.showFooter
    }
  },
  watch: {
    loading (val) {
      if (val) {
        // this.showSplash = true

        return
      }

      setTimeout(() => {
        this.showSplash = false
      }, 1000)
    }
  }
}
</script>
