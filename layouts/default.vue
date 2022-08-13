<template>
  <div v-bind="$attrs" class="bg-white">
    <transition
      appear
      enter-active-class="transition-all duration-700"
      leave-active-class="transition-all duration-700"
      leave-to-class="scale-125 opacity-0"
    >
      <div
        v-if="showSplash"
        class="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-white"
      >
        <Splash class="w-[200px]" />
      </div>
    </transition>

    <Header v-if="showHeader" :route="$route" :light-mode="lightMode" />

    <slot>
      <Nuxt />
    </slot>

    <Footer v-if="showFooter" />
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
      showSplash: false,
      showSplashTimer: null,
      showSplashWaitTime: 2000
    }
  },
  computed: {
    lightMode () {
      return this.$store.state.lightMode
    },
    showHeader () {
      return this.$store.state.showHeader
    },
    showFooter () {
      return this.$store.state.showFooter
    },
    loading: {
      get () {
        return this.$store.state.loading
      },
      set (val) {
        this.$store.commit('loading', val)
      }
    }
  },
  watch: {
    loading (val) {
      if (val) {
        this.showSplash = true
      } else {
        this.showSplashTimer = setTimeout(() => {
          this.showSplash = false
        }, this.showSplashWaitTime)
      }
    }
  },
  mounted () {
    this.showSplash = this.loading

    this.updateVh()

    window.addEventListener('resize', this.updateVh)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.updateVh)
  },
  methods: {
    updateVh () {
      const vh = window.innerHeight * 0.01

      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }
  }
}
</script>
