<template>
  <Base class="text-black bg-[#F5F5F5] min-h-screen w-full">
    <Header :route="$route" :light-mode="lightMode" />

    <main>
      <Nuxt />
    </main>

    <Footer />

    <!-- <div
      v-show="showSplash"
      class="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-white"
    >
      <Splash class="w-[200px]" />
    </div> -->
  </Base>
</template>

<script>
import Base from './base.vue'
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
// import Splash from '~/components/Splash.vue'

export default {
  components: {
    Base,
    Header,
    Footer
    // Splash
  },
  data () {
    return {
      showSplash: false,
      intervalId: null
    }
  },
  computed: {
    lightMode () {
      return this.$store.state.lightMode
    },
    loading () {
      return this.$store.state.loading
    }
  },
  watch: {
    loading (val) {
      clearTimeout(this.intervalId)

      if (val) {
        this.intervalId = setTimeout(() => {
          this.showSplash = true
        }, 1)

        return
      }

      this.showSplash = false
    }
  }
}
</script>
