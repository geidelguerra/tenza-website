<template>
  <Scroller class="h-screen overflow-hidden bg-black">
    <!-- Featured Slider -->
    <section class="relative w-screen h-screen overflow-hidden">
      <div class="absolute top-0 left-0 w-screen h-screen">
        <Slider
          ref="featuredSlider"
          :active-slide-index="activeFeaturedSlideIndex"
          transition-name="slider"
          transition-mode="out-in"
        >
          <template v-for="(slide, index) in featuredSlides">
            <div
              :key="index"
              :style="{backgroundImage: `url(${slide.image})`}"
              class="absolute top-0 left-0 w-full h-full bg-center bg-cover bg-none"
            >
              <div class="absolute top-0 bottom-0 left-0 right-0 bg-gradient-radial from-white to-black mix-blend-multiply opacity-80" />
            </div>
          </template>
        </Slider>
      </div>
      <div :key="activeFeaturedSlideIndex" class="pt-[225px] pl-[88px] pr-[120px] absolute w-full">
        <div class="mb-[170px] flex space-x-[40px]">
          <button
            :class="{'pointer-events-none opacity-60 transition-opacity duration-200': activeFeaturedSlideIndex <= 0}"
            class="text-white"
            @click="activeFeaturedSlideIndex--"
          >
            <ArrowLeft class="h-[20px]" />
          </button>
          <button
            :class="{'pointer-events-none opacity-60 transition-opacity duration-200': activeFeaturedSlideIndex >= featuredSlides.length - 1}"
            class="text-white"
            @click="activeFeaturedSlideIndex++"
          >
            <ArrowRight class="h-[20px]" />
          </button>
        </div>
        <div key="12323" class="flex items-center justify-between">
          <h2 class="text-white text-[119px] tracking-[1.19px] font-extrabold w-[910px] leading-[1em]" v-html="activeFeaturedSlide.text" />
          <div class="text-right text-white uppercase">
            <div class="text-[16px] tracking-[12px] font-semibold mb-[21px]">
              {{ activeFeaturedSlide.project.name }}
            </div>
            <div class="text-[14px] tracking-[7px] mb-[11px]">
              {{ activeFeaturedSlide.project.location }}
            </div>
            <div class="text-[14px] tracking-[7px]">
              {{ activeFeaturedSlide.project.year }}
            </div>
          </div>
        </div>
      </div>
      <GetInTouchButton class="absolute bottom-[45px] right-[45px]" />
    </section>
    <!-- About 1 -->
    <section class="flex items-center justify-between w-screen h-screen bg-white pl-[87px] overflow-hidden">
      <h2 class="text-[#111111] font-extrabold text-[120px] w-[739px] tracking-[1.19px] leading-[1em]">
        It all starts with an idea
      </h2>
      <img src="~/assets/images/about/about_01.jpg" alt="" srcset="">
    </section>
    <!-- About 2 -->
    <section class="flex items-center justify-between w-screen h-screen bg-white pl-[87px] pr-[69px]">
      <h2 class="text-[#111111] font-extrabold text-[120px] w-[739px] tracking-[1.19px] leading-[1em]">
        Idea becomes concept
      </h2>
      <img src="~/assets/images/about/about_02.jpg" alt="" srcset="">
    </section>
    <!-- About 3 -->
    <section class="flex items-center justify-between w-screen h-screen bg-white pl-[87px] pr-[35px]">
      <h2 class="text-[#111111] font-extrabold text-[120px] w-[739px] tracking-[1.19px] leading-[1em]">
        It all starts with an idea
      </h2>
      <img src="~/assets/images/about/about_03.jpg" alt="" srcset="">
    </section>
    <Mouse class="w-4 fixed bottom-[45px] left-[45px] text-white border-white" />
  </Scroller>
</template>

<script>
import Mouse from '~/assets/images/mouse.svg?inline'
import ArrowLeft from '~/assets/images/arrow_left.svg?inline'
import ArrowRight from '~/assets/images/arrow_right.svg?inline'
import GetInTouchButton from '~/components/GetInTouchButton.vue'
import Scroller from '~/components/Scroller.vue'
import Slider from '~/components/Slider.vue'

export default {
  components: {
    Scroller,
    Slider,
    Mouse,
    ArrowLeft,
    ArrowRight,
    GetInTouchButton
  },
  data () {
    return {
      activeSectionObserver: null,
      activeSectionIndex: 0,
      activeFeaturedSlideIndex: 0,
      featuredSlides: [
        {
          image: '/projects/lake_house/lake_house.jpg',
          text: 'Designs <br> with a timeless quality',
          project: {
            name: 'Lake House',
            location: 'New York',
            year: 2021
          }
        },
        {
          image: '/projects/brazil_restaurant/brazil_restaurant.jpg',
          text: 'Crafting experiences',
          project: {
            name: 'Brazil Restaurant',
            location: 'New York',
            year: 2021
          }
        },
        {
          image: '/projects/cliff_house/cliff_house.jpg',
          text: 'Building <br> your legacy',
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
    activeFeaturedSlide () {
      return this.featuredSlides[this.activeFeaturedSlideIndex]
    }
  }
}
</script>
