<template>
  <div class="h-screen bg-black">
    <client-only>
      <agile
        ref="featuredSlides"
        :nav-buttons="false"
        :dots="false"
        :autoplay="true"
        :autoplay-speed="6000"
        :speed="600"
        :pause-on-hover="false"
        :fade="true"
        :change-delay="300"
        class="featured-slides relative"
        @after-change="event => currentSlideIndex = event.currentSlide"
      >
        <template #caption>
          <div class="flex flex-col justify-center pl-40 pr-8 h-full">
            <div class="mb-[98px] flex space-x-[40px]">
              <button @click="previousSlide">
                <ArrowLeft class="h-[20px]" />
              </button>
              <button @click="nextSlide">
                <ArrowRight class="h-[20px]" />
              </button>
            </div>
            <div class="flex items-center justify-between">
              <h2 class="text-white text-[93px] tracking-[0.15em] font-extrabold uppercase">
                Form<br> Intrudes<br> Function
              </h2>
              <div class="text-white text-right uppercase">
                <div class="text-[20px] tracking-[0.15em]">
                  {{ currentSlide.project.name }}
                </div>
                <div class="text-[13px] tracking-[0.5em]">
                  {{ currentSlide.project.location }}
                </div>
                <div class="text-[13px] tracking-[0.5em]">
                  {{ currentSlide.project.year }}
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-for="(slide, index) in slides">
          <div
            :key="index"
            :style="{backgroundImage: `url(${slide.image})`}"
            class="h-screen bg-cover bg-none bg-center relative"
          >
            <div class="absolute top-0 left-0 right-0 bottom-0 bg-gradient-radial from-white to-black  mix-blend-multiply opacity-80" />
          </div>
        </template>
      </agile>
    </client-only>
    <Mouse class="w-4 absolute bottom-8 left-8 text-white border-white" />
  </div>
</template>

<script>
import Mouse from '~/assets/images/mouse.svg?inline'
import ArrowLeft from '~/assets/images/arrow_left.svg?inline'
import ArrowRight from '~/assets/images/arrow_right.svg?inline'

export default {
  components: {
    Mouse,
    ArrowLeft,
    ArrowRight
  },
  data () {
    return {
      currentSlideIndex: 0,
      slides: [
        {
          image: '/projects/lake_house/lake_house.jpg',
          project: {
            name: 'Lake House',
            location: 'New York',
            year: 2021
          }
        },
        {
          image: '/projects/brazil_restaurant/brazil_restaurant.jpg',
          project: {
            name: 'Brazil Restaurant',
            location: 'New York',
            year: 2021
          }
        },
        {
          image: '/projects/cliff_house/cliff_house.jpg',
          project: {
            name: 'Cliff House',
            location: 'New York',
            year: 2021
          }
        }
      ]
    }
  },
  computed: {
    currentSlide () {
      return this.slides[this.currentSlideIndex]
    },
    numberOfSlides () {
      return this.slides.length
    }
  },
  methods: {
    previousSlide () {
      this.$refs.featuredSlides.goToPrev()
    },
    nextSlide () {
      this.$refs.featuredSlides.goToNext()
    }
  }
}
</script>

<style>
.featured-slides .agile__caption {
  @apply absolute top-0 bottom-0 left-0 right-0;
}
</style>
