<template>
  <div v-show="!loading" id="home-page">
    <Scroller
      class="h-screen overflow-hidden bg-black"
      :sync-to-route="true"
      :disabled="$refs.scroller2 && $refs.scroller2.activeElementIndex > 0"
      @activeElementChanged="onActiveSectionChanged"
    >
      <!-- Featured Slider -->
      <section id="featured" class="relative w-full h-full overflow-hidden">
        <Slider
          :active-slide-index="activeFeaturedSlideIndex"
          transition-name="slider"
          transition-mode="out-in"
        >
          <template v-for="(slide, index) in featuredSlides">
            <div
              :key="index"
              class="absolute top-0 left-0 w-full h-full bg-center bg-cover bg-none"
            >
              <img :src="slide.image" class="absolute top-0 left-0 object-cover w-full h-full">
              <div class="absolute top-0 bottom-0 left-0 right-0 bg-gradient-radial from-white to-black mix-blend-multiply opacity-80" />
            </div>
          </template>
        </Slider>
        <div class="pt-[225px] pl-[88px] pr-[120px] pb-[105px] absolute w-full h-full flex flex-col">
          <div class="mb-[170px] flex space-x-[40px]">
            <button
              class="text-white transition-opacity duration-200"
              @click="previousFeaturedSlide"
            >
              <ArrowLeft class="h-[20px]" />
            </button>
            <button
              class="text-white transition-opacity duration-200"
              @click="nextFeaturedSlide"
            >
              <ArrowRight class="h-[20px]" />
            </button>
          </div>
          <div class="flex justify-between flex-1">
            <div>
              <TextAnimator
                tag="h2"
                :disabled="loading"
                :text="activeFeaturedSlide.text"
                class="text-white font-bold text-[70px] tracking-[0.7px] leading-[70px] overflow-hidden"
              />
            </div>
          </div>
        </div>
      </section>
      <Scroller
        ref="scroller2"
        class="h-screen"
        @activeIndexChanged="showFooter = false"
        @bottom="showFooter = true"
        @progress="updatePlayer"
      >
        <template #nav>
          <div class="absolute left-[209px] top-[112px] w-[805px] h-[805px]">
            <lottie-vue-player
              id="player"
              ref="player"
              src="https://assets5.lottiefiles.com/packages/lf20_FISfBK.json"
              :player-controls="false"
              :autoplay="false"
              style="width: 100%; height: 100%"
            />
          </div>
        </template>
        <!-- About 1 -->
        <section id="about-1" class="flex items-center justify-end w-full h-full bg-white pl-[87px] pr-[180px] overflow-hidden">
          <div class="w-full max-w-[615px]">
            <TextAnimator
              tag="h2"
              text="Inspiration comes from"
              class="text-[#111111] font-extrabold text-[82px] tracking-[0.82px] leading-[98px]"
              :animate-on-mounted="false"
              :animate-on-visibility="true"
              :animate-once="true"
            />
            <div class="border-t-[1px] border-[#707070] mt-[20px] mb-[36px]" />
            <TextAnimator
              text="all around, but specially from our clients. They are obsessed with beauty as we are. They come from diverse backgrounds: medicine, finance, entertainment but we are united by the desire to create beauty and the disagreement with “normal.”  The design becomes then a common language we speak. A set of abstract symbols used to communicate our feelings and how we want to live."
              class="text-[15px] text-[#111] leading-[30px] tracking-[0.15px]"
              :delay="200"
              :animate-on-mounted="false"
              :animate-on-visibility="true"
              :animate-once="true"
            />
          </div>
        </section>
        <!-- About 2 -->
        <section id="about-2" class="flex items-center justify-end w-full h-full bg-white pl-[87px] pr-[180px]">
          <div class="w-full max-w-[615px]">
            <TextAnimator
              tag="h2"
              text="Every project begins with"
              class="text-[#111111] font-extrabold text-[82px] tracking-[0.82px] leading-[98px]"
              :animate-on-mounted="false"
              :animate-on-visibility="true"
              :animate-once="true"
            />
            <div class="border-t-[1px] border-[#707070] mt-[20px] mb-[36px]" />
            <TextAnimator
              text="your story. As important as it is to know the extent of the scope - “how many rooms, the size of the kitchen, the position for the office...,” it is to know the why and the how we got to this first encounter. The concept is born from that interaction, and it is as personal and unique as the resulting space should be. The foundation of the project starts with our client’s foreseeable needs followed by the ones they did not even know they had."
              class="text-[15px] text-[#111] leading-[30px] tracking-[0.15px]"
              :delay="200"
              :animate-on-mounted="false"
              :animate-on-visibility="true"
              :animate-once="true"
            />
          </div>
        </section>
        <!-- About 3 -->
        <section id="about-3" class="flex items-center justify-end w-full h-full bg-white pl-[87px] pr-[180px]">
          <div class="w-full max-w-[615px]">
            <TextAnimator
              tag="h2"
              text="Timeless quality"
              class="text-[#111111] font-extrabold text-[82px] tracking-[0.82px] leading-[98px]"
              :animate-on-mounted="false"
              :animate-on-visibility="true"
              :animate-once="true"
            />
            <div class="border-t-[1px] border-[#707070] mt-[20px] mb-[36px]" />
            <TextAnimator
              text="is more than a clever solution. It is more than the sum of beautiful shapes, good proportions, and quality materials. It is also the intangible: the light hitting on the curved wall in the morning accompanied by the smell of coffee or bread... or both. It is the afternoon shadows framing your dreamlike scene. We understand that timeless quality comes with crafting a space in which you can gather unique memories of your own. Only when the abstract meets reality, timeless design is born."
              class="text-[15px] text-[#111] leading-[30px] tracking-[0.15px]"
              :delay="200"
              :animate-on-mounted="false"
              :animate-on-visibility="true"
              :animate-once="true"
            />
          </div>
        </section>
      </Scroller>
    </Scroller>
    <transition name="slide-up">
      <ScrollDownIndicator
        v-if="showScrollableIndicator"
        class="absolute bottom-[45px] left-[50%] translate-x-[-50%]"
        :light="lightMode"
      />
    </transition>
  </div>
</template>

<script>
import ScrollDownIndicator from '~/components/ScrollDownIndicator.vue'
import ArrowLeft from '~/assets/images/arrow_left.svg?inline'
import ArrowRight from '~/assets/images/arrow_right.svg?inline'
import Scroller from '~/components/Scroller.vue'
import Slider from '~/components/Slider.vue'
import TextAnimator from '~/components/TextAnimator.vue'

export default {
  components: {
    Scroller,
    Slider,
    ScrollDownIndicator,
    ArrowLeft,
    ArrowRight,
    TextAnimator
  },
  data () {
    return {
      activeSectionIndex: 0,
      numberOfSections: 0,
      activeFeaturedSlideIndex: 0,
      featuredSlides: [
        {
          image: '/featured/01.jpg',
          text: 'The art <br> of architectural <br> storytelling'
        },
        {
          image: '/featured/02.jpg',
          text: 'Timeless design <br> in a modern setting'
        },
        {
          image: '/featured/03.jpg',
          text: 'Crafting a unique space <br> Building a legacy'
        }
      ],
      showGetInTouch: true
    }
  },
  computed: {
    lightMode () {
      return this.activeSectionIndex > 0
    },
    loading: {
      get () {
        return this.$store.state.loading
      },
      set (val) {
        this.$store.commit('loading', val)
      }
    },
    showScrollableIndicator () {
      return this.activeSectionIndex < this.numberOfSections - 1
    },
    activeFeaturedSlide () {
      return this.featuredSlides[this.activeFeaturedSlideIndex]
    },
    showFooter: {
      get () {
        return this.$store.state.showFooter
      },
      set (val) {
        return this.$store.commit('showFooter', val)
      }
    }
  },
  created () {
    this.loading = true
  },
  mounted () {
    this.$images.listen('#home-page img', (count, total, event) => {
      if (count === total) {
        setTimeout(() => {
          this.loading = false
        }, 500)
      }
    })
  },
  methods: {
    updatePlayer (progress) {
      const player = this.$refs.player.$refs.player.getLottie()
      const totalFrames = player.totalFrames
      const frame = Math.round(progress * totalFrames)

      player.goToAndStop(frame, true)
    },
    previousFeaturedSlide () {
      let index = this.activeFeaturedSlideIndex - 1

      if (index < 0) {
        index = this.featuredSlides.length - 1
      }

      this.activeFeaturedSlideIndex = index
    },
    nextFeaturedSlide () {
      let index = this.activeFeaturedSlideIndex + 1

      if (index >= this.featuredSlides.length) {
        index = 0
      }

      this.activeFeaturedSlideIndex = index
    },
    onActiveSectionChanged (elm, index, numberOfSections) {
      this.activeSectionIndex = index
      this.numberOfSections = numberOfSections
      this.showFooter = false
    }
  }
}
</script>
