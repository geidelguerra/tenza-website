<template>
  <div class="text-black bg-[#F5F5F5] min-h-screen">
    <Header :light-mode="lightMode" />

    <main>
      <Nuxt />
    </main>

    <Footer />

    <transition name="page">
      <div
        v-if="showSplash"
        class="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center"
      >
        <Splash />
      </div>
    </transition>
  </div>
</template>

<script>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import Splash from '~/components/Splash.vue'

export default {
  components: {
    Header,
    Footer,
    Splash
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
