<template>
  <div class="relative w-screen h-screen bg-black">
    <Slider
      :active-index="slideIndex"
      class="w-full h-full"
    >
      <template v-for="(slide, index) in slides">
        <div
          :key="index"
          class="absolute top-0 left-0 w-full h-full bg-center bg-cover bg-none"
        >
          <img :src="slide.image" class="absolute top-0 left-0 object-cover w-full h-full">
          <div class="absolute top-0 bottom-0 left-0 right-0 bg-gradient-radial from-white to-black mix-blend-multiply opacity-80" />
        </div>
      </template>
    </Slider>

    <div class="absolute top-0 bottom-0 left-0 right-0 z-20 flex flex-col">
      <div class="absolute left-[20px] top-[151px] lg:top-[225px] lg:left-[200px] flex">
        <button
          class="text-white p-[10px] block transition-all duration-200 bg-black bg-opacity-0 hover:bg-opacity-50"
          @click="prevSlide"
        >
          <ArrowLeft class="h-[20px]" />
        </button>
        <button
          class="text-white ml-[40px] p-[10px] block transition-all duration-200 bg-black bg-opacity-0 hover:bg-opacity-50"
          @click="nextSlide"
        >
          <ArrowRight class="h-[20px]" />
        </button>
      </div>
      <div class="flex-1 ml-[20px] lg:ml-[200px] flex items-center">
        <div>
          <TextAnimator
            tag="h2"
            :text="slides[slideIndex].text"
            :delay="500"
            class="text-white font-bold text-[25px] tracking-[0.25px] leading-[30px] lg:text-[70px] lg:tracking-[0.7px] lg:leading-[70px] overflow-hidden"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Hammer from 'hammerjs'
import Slider from '~/components/Slider.vue'
import TextAnimator from '~/components/TextAnimator.vue'
import ArrowLeft from '~/assets/images/arrow_left.svg?inline'
import ArrowRight from '~/assets/images/arrow_right.svg?inline'

export default {
  components: {
    Slider,
    TextAnimator,
    ArrowLeft,
    ArrowRight
  },
  data () {
    return {
      slideIndex: 0,
      slides: [
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
      ]
    }
  },
  mounted () {
    new Hammer(this.$el).on('swipeleft', this.nextSlide)
    new Hammer(this.$el).on('swiperight', this.prevSlide)
  },
  methods: {
    prevSlide () {
      if (this.slideIndex - 1 < 0) {
        this.slideIndex = this.slides.length - 1
      } else {
        this.slideIndex--
      }
    },
    nextSlide () {
      if (this.slideIndex + 1 >= this.slides.length) {
        this.slideIndex = 0
      } else {
        this.slideIndex++
      }
    }
  }
}
</script>
