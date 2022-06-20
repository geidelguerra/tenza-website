<template>
  <div>
    <!-- Featured Slider -->
    <section id="featured" class="relative w-screen h-screen overflow-hidden">
      <home-slider />
    </section>

    <scroll-tracker class="relative">
      <template #default="{ progress }">
        <div v-sticky class="absolute top-0 z-10 flex items-center h-screen">
          <div class="ml-[209px] w-[800px] h-[805px]">
            <animation src="/home_animation.json" :progress="progress" />
          </div>
        </div>
        <div class="absolute top-0 w-full overflow-x-hidden">
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

    <!-- <Footer class="relative" /> -->
    <transition name="slide-up">
      <ScrollDownIndicator
        class="absolute bottom-[45px] left-[50%] translate-x-[-50%]"
      />
    </transition>
  </div>
</template>

<script>
import HomeSlider from '~/components/HomeSlider.vue'
import Animation from '~/components/Animation.vue'
import AboutSection from '~/components/AboutSection.vue'
import ScrollDownIndicator from '~/components/ScrollDownIndicator.vue'
// import Footer from '~/components/Footer.vue'
import ScrollTracker from '~/components/ScrollTracker.vue'

export default {
  components: {
    HomeSlider,
    Animation,
    AboutSection,
    ScrollTracker,
    ScrollDownIndicator
    // Footer,
  },
  data () {
    return {
      scrollTop: 0,
      aboutScrollProgress: 0
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
    // scrollerDisabled () {
    //   if (this.$refs.scroller2 !== undefined && this.$refs.scroller2.activeElementIndex > 0) {
    //     return true
    //   }

    //   if (this.animationCurrentFrame > 0) {
    //     return true
    //   }

    //   return false
    // },
    // scroller2Disabled () {
    //   if (this.$refs.scroller !== undefined && this.$refs.scroller.activeElementIndex === 0) {
    //     return true
    //   }

    //   if (this.animationCurrentFrame < 160) {
    //     return true
    //   }

    //   if (this.animationCurrentFrame > 160 && this.animationCurrentFrame < 341) {
    //     return true
    //   }

    //   if (this.animationCurrentFrame > 341 && this.animationCurrentFrame < 417) {
    //     return true
    //   }

    //   return false
    // }
  },
  methods: {
    onScroll (scrollTop, scrollHeight, progress) {
      console.log(scrollTop, scrollHeight, progress)
    }
    // onScroll: debounce(function () {
    //   this.scrollTop = document.scrollingElement.scrollTop
    //   // this.aboutScrollProgress = this.scrollTop

    //   // console.log(this.scrollTop, document.scrollingElement.scrollHeight, this.$refs.aboutSection.offsetTop, this.$refs.aboutSection.offsetHeight)
    // }, 100)
  }
}
</script>
