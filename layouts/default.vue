<template>
  <div class="text-black bg-[#F5F5F5] min-h-screen w-full">
    <Header :light-mode="lightMode" />

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
  </div>
</template>

<script>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
// import Splash from '~/components/Splash.vue'

export default {
  components: {
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
    },
    showFooter () {
      return this.$store.state.showFooter
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
