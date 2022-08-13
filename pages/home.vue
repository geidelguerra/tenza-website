<template>
  <div v-scroll="{ onScroll }">
    <!-- Featured Slider -->
    <section id="featured" class="relative w-screen h-screen overflow-hidden">
      <home-slider id="featured-slider" />
    </section>

    <scroll-tracker id="about" ref="about" class="relative flex lg:px-[200px]">
      <template #default="{ progress }">
        <div class="hidden sticky top-0 z-10 lg:flex items-center w-full h-screen lg:w-1/2 lg:pr-[100px]">
          <animation src="/home_animation.json" :progress="progress" @load="animationLoaded = true" />
        </div>
        <div class="w-full px-[20px] lg:pr-0 lg:pl-[100px] lg:w-1/2">
          <!-- About 1 -->
          <about-section
            id="about-1"
            header="Inspiration comes from"
            text="all around, but specially from our clients. They are obsessed with beauty as we are. They come from diverse backgrounds: medicine, finance, entertainment but we are united by the desire to create beauty and the disagreement with “normal.”  The design becomes then a common language we speak. A set of abstract symbols used to communicate our feelings and how we want to live."
          />
          <!-- About 2 -->
          <about-section
            id="about-2"
            header="Every project begins with"
            text="your story. As important as it is to know the extent of the scope - “how many rooms, the size of the kitchen, the position for the office...,” it is to know the why and the how we got to this first encounter. The concept is born from that interaction, and it is as personal and unique as the resulting space should be. The foundation of the project starts with our client’s foreseeable needs followed by the ones they did not even know they had."
          />
          <!-- About 3 -->
          <about-section
            id="about-3"
            header="Timeless quality"
            text="is more than a clever solution. It is more than the sum of beautiful shapes, good proportions, and quality materials. It is also the intangible: the light hitting on the curved wall in the morning accompanied by the smell of coffee or bread... or both. It is the afternoon shadows framing your dreamlike scene. We understand that timeless quality comes with crafting a space in which you can gather unique memories of your own. Only when the abstract meets reality, timeless design is born."
          />
        </div>
      </template>
    </scroll-tracker>

    <transition
      appear
      enter-active-class="transition-all duration-700"
      leave-active-class="transition-all duration-700"
      enter-class="translate-y-full opacity-0"
      leave-to-class="translate-y-full opacity-0"
    >
      <ScrollDownIndicator
        v-if="showScrollIndicator"
        class="fixed bottom-[45px] left-[50%] translate-x-[-50%] z-20"
        :light-mode="lightMode"
        @click="$scrollTo('#about')"
      />
    </transition>
  </div>
</template>

<script>
import HomeSlider from '~/components/HomeSlider.vue'
import Animation from '~/components/Animation.vue'
import AboutSection from '~/components/AboutSection.vue'
import ScrollDownIndicator from '~/components/ScrollDownIndicator.vue'
import ScrollTracker from '~/components/ScrollTracker.vue'

export default {
  components: {
    HomeSlider,
    Animation,
    AboutSection,
    ScrollTracker,
    ScrollDownIndicator
  },
  data () {
    return {
      showScrollIndicator: true,
      animationLoaded: false,
      imagesLoaded: false
    }
  },
  computed: {
    lightMode: {
      get () {
        return this.$store.state.lightMode
      },
      set (val) {
        this.$store.commit('lightMode', val)
      }
    }
  },
  mounted () {
    this.$store.commit('showHeader', true)
    this.$store.commit('showFooter', true)

    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })

    this.$images.loaded(() => {
      this.$nuxt.$loading.finish()
    })
  },
  methods: {
    onScroll (scrollTop, scrollHeight, progress) {
      this.showScrollIndicator = scrollTop === 0
      this.lightMode = scrollTop > this.$refs.about.$el.offsetTop && scrollTop < this.$refs.about.$el.scrollHeight + this.$refs.about.$el.offsetTop
    }
  }
}
</script>
