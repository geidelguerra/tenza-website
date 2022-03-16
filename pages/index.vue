<template>
  <div>
    <Scroller
      class="h-screen overflow-hidden bg-black"
      :sync-to-route="true"
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
              :style="{backgroundImage: `url(${slide.image})`}"
              class="absolute top-0 left-0 w-full h-full bg-center bg-cover bg-none"
            >
              <div class="absolute top-0 bottom-0 left-0 right-0 bg-gradient-radial from-white to-black mix-blend-multiply opacity-80" />
            </div>
          </template>
        </Slider>
        <div class="pt-[225px] pl-[88px] pr-[120px] pb-[105px] absolute w-full h-full flex flex-col">
          <div class="mb-[170px] flex space-x-[40px]">
            <button
              :class="{'pointer-events-none opacity-0': activeFeaturedSlideIndex <= 0}"
              class="text-white transition-opacity duration-200"
              @click="activeFeaturedSlideIndex--"
            >
              <ArrowLeft class="h-[20px]" />
            </button>
            <button
              :class="{'pointer-events-none opacity-0': activeFeaturedSlideIndex >= featuredSlides.length - 1}"
              class="text-white transition-opacity duration-200"
              @click="activeFeaturedSlideIndex++"
            >
              <ArrowRight class="h-[20px]" />
            </button>
          </div>
          <div class="flex justify-between flex-1">
            <div>
              <TextAnimator
                tag="h2"
                :text="activeFeaturedSlide.text"
                class="text-white font-bold text-[82px] w-[616px] tracking-[0.82px] leading-[98px] overflow-hidden"
              />
            </div>
            <div class="flex flex-col pt-[50px] text-right text-white uppercase">
              <TextAnimator
                :text="activeFeaturedSlide.project.name"
                :delay="200"
                class="text-[16px] tracking-[12px] font-semibold mb-[21px]"
              />
              <TextAnimator
                :text="activeFeaturedSlide.project.location"
                :delay="200"
                class="text-[14px] tracking-[7px] mb-[11px]"
              />
              <TextAnimator
                :text="activeFeaturedSlide.project.year"
                :delay="200"
                class="text-[14px] tracking-[7px]"
              />
            </div>
          </div>
        </div>
        <GetInTouchButton class="absolute bottom-[45px] right-[45px]" />
      </section>
      <!-- About 1 -->
      <section id="about-1" class="flex items-center justify-between w-full h-full bg-white pl-[87px] overflow-hidden">
        <div class="w-full max-w-[615px]">
          <TextAnimator
            tag="h2"
            text="It all starts <br> with an idea"
            class="text-[#111111] font-extrabold text-[82px] tracking-[0.82px] leading-[98px]"
            :animate-on-mounted="false"
            :animate-on-visibility="true"
            :animate-once="true"
          />
          <div class="border-t-[1px] border-[#707070] mt-[20px] mb-[36px]" />
          <TextAnimator
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, dolorem dolore. Quam repellendus aspernatur eos debitis iure laborum, veritatis corporis officiis autem consequuntur provident! Accusamus sapiente incidunt et dolor non!"
            class="text-[15px] text-[#111] leading-[30px] tracking-[0.15px]"
            :delay="200"
            :animate-on-mounted="false"
            :animate-on-visibility="true"
            :animate-once="true"
          />
        </div>
        <img src="~/assets/images/about/about_01.jpg" alt="" srcset="">
      </section>
      <!-- About 2 -->
      <section id="about-2" class="flex items-center justify-between w-full h-full bg-white pl-[87px] pr-[69px]">
        <div class="w-full max-w-[615px]">
          <TextAnimator
            tag="h2"
            text="Ideas become <br> concept"
            class="text-[#111111] font-extrabold text-[82px] tracking-[0.82px] leading-[98px]"
            :animate-on-mounted="false"
            :animate-on-visibility="true"
            :animate-once="true"
          />
          <div class="border-t-[1px] border-[#707070] mt-[20px] mb-[36px]" />
          <TextAnimator
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, dolorem dolore. Quam repellendus aspernatur eos debitis iure laborum, veritatis corporis officiis autem consequuntur provident! Accusamus sapiente incidunt et dolor non!"
            class="text-[15px] text-[#111] leading-[30px] tracking-[0.15px]"
            :delay="200"
            :animate-on-mounted="false"
            :animate-on-visibility="true"
            :animate-once="true"
          />
        </div>
        <img src="~/assets/images/about/about_02.jpg" alt="" srcset="">
      </section>
      <!-- About 3 -->
      <section id="about-3" class="flex items-center justify-between w-full h-full bg-white pl-[87px] pr-[35px]">
        <div class="w-full max-w-[615px]">
          <TextAnimator
            tag="h2"
            text="Concept are <br> developed"
            class="text-[#111111] font-extrabold text-[82px] tracking-[0.82px] leading-[98px]"
            :animate-on-mounted="false"
            :animate-on-visibility="true"
            :animate-once="true"
          />
          <div class="border-t-[1px] border-[#707070] mt-[20px] mb-[36px]" />
          <TextAnimator
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, dolorem dolore. Quam repellendus aspernatur eos debitis iure laborum, veritatis corporis officiis autem consequuntur provident! Accusamus sapiente incidunt et dolor non!"
            class="text-[15px] text-[#111] leading-[30px] tracking-[0.15px]"
            :delay="200"
            :animate-on-mounted="false"
            :animate-on-visibility="true"
            :animate-once="true"
          />
        </div>
        <img src="~/assets/images/about/about_03.jpg" alt="" srcset="">
      </section>
    </Scroller>
    <transition name="slide-up">
      <ScrollDownIndicator
        v-if="showScrollableIndicator"
        class="absolute bottom-[45px] left-[45px]"
        :light="lightMode"
      />
    </transition>
  </div>
</template>

<script>
import ScrollDownIndicator from '~/components/ScrollDownIndicator.vue'
import ArrowLeft from '~/assets/images/arrow_left.svg?inline'
import ArrowRight from '~/assets/images/arrow_right.svg?inline'
import GetInTouchButton from '~/components/GetInTouchButton.vue'
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
    GetInTouchButton,
    TextAnimator
  },
  data () {
    return {
      activeSectionIndex: 0,
      numberOfSections: 0,
      activeFeaturedSlideIndex: 0,
      featuredSlides: [
        {
          image: '/projects/lake_house/lake_house.jpg',
          text: 'Designs <br> with a timeless <br> quality',
          project: {
            name: 'Lake House',
            location: 'New York',
            year: 2021
          }
        },
        {
          image: '/projects/brazil_restaurant/brazil_restaurant.jpg',
          text: 'Crafting <br>experiences',
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
    lightMode () {
      return this.activeSectionIndex > 0
    },
    showScrollableIndicator () {
      return this.activeSectionIndex < this.numberOfSections - 1
    },
    activeFeaturedSlide () {
      return this.featuredSlides[this.activeFeaturedSlideIndex]
    }
  },
  methods: {
    onActiveSectionChanged (elm, index, numberOfSections) {
      this.activeSectionIndex = index
      this.numberOfSections = numberOfSections
    }
  }
}
</script>
