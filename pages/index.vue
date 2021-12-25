<template>
  <div class="h-screen bg-black">
    <client-only>
      <agile
        :nav-buttons="false"
        :dots="false"
        :autoplay="true"
        :pause-on-hover="false"
        class="featured-slides relative"
        @after-change="event => currentSlideIndex = event.currentSlide"
      >
        <template #caption>
          <div class="flex flex-col justify-center pl-40 pr-8 h-full">
            <div class="mb-24">
              <div class="text-white text-xs font-bold">
                {{ (currentSlideIndex + 1).toString().padStart(2, '0') }} / {{ numberOfSlides.toString().padStart(2, '0') }}
              </div>
            </div>
            <div class="flex items-center justify-between">
              <h2 class="text-white text-9xl font-black">
                Form<br> Intrudes<br> Function
              </h2>
              <div class="text-white text-right">
                <div class="italic text-3xl">
                  {{ currentSlide.project.name }}
                </div>
                <div class="text-xl">
                  {{ currentSlide.project.location }}
                </div>
                <div class="text-xl">
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
            <!--  -->
          </div>
        </template>
      </agile>
    </client-only>
    <Mouse class="w-4 absolute bottom-8 left-8 text-white border-white" />
  </div>
</template>

<script>
import Mouse from '~/assets/images/mouse.svg?inline'

export default {
  components: {
    Mouse
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
  }
}
</script>

<style>
.featured-slides .agile__caption {
  @apply absolute top-0 bottom-0 left-0 right-0 pointer-events-none;
}
</style>
