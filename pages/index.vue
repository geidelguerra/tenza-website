<template>
  <div class="h-screen overflow-hidden bg-black">
    <transition
      :name="sectionTransitionName"
      @before-enter="transitioning = true"
      @after-enter="transitioning = false"
    >
      <!-- Featured Slider -->
      <section
        v-if="currentSectionIndex === 0"
        key="section1"
        class="absolute top-0 left-0 w-screen h-screen overflow-hidden"
      >
        <div class="absolute top-0 left-0 w-screen h-screen">
          <template v-for="(slide, index) in slides">
            <transition :key="index" name="slider" mode="out-in">
              <div

                v-if="index === currentSlideIndex"
                :key="index"
                :style="{backgroundImage: `url(${slide.image})`}"
                class="absolute top-0 left-0 w-full h-full bg-center bg-cover bg-none"
              >
                <div class="absolute top-0 bottom-0 left-0 right-0 bg-gradient-radial from-white to-black mix-blend-multiply opacity-80" />
              </div>
            </transition>
          </template>
        </div>
        <div class="pt-[225px] pl-[88px] pr-[120px] absolute w-full">
          <div class="mb-[170px] flex space-x-[40px]">
            <button class="text-white" @click="previousSlide">
              <ArrowLeft class="h-[20px]" />
            </button>
            <button class="text-white" @click="nextSlide">
              <ArrowRight class="h-[20px]" />
            </button>
          </div>
          <div class="flex items-center justify-between">
            <h2 class="text-white text-[119px] tracking-[1.19px] font-extrabold w-[910px] leading-[1em]" v-html="currentSlide.text" />
            <div class="text-right text-white uppercase">
              <div class="text-[16px] tracking-[12px] font-semibold mb-[21px]">
                {{ currentSlide.project.name }}
              </div>
              <div class="text-[14px] tracking-[7px] mb-[11px]">
                {{ currentSlide.project.location }}
              </div>
              <div class="text-[14px] tracking-[7px]">
                {{ currentSlide.project.year }}
              </div>
            </div>
          </div>
        </div>
        <GetInTouchButton class="absolute bottom-[45px] right-[45px]" />
      </section>
      <!-- About 1 -->
      <section
        v-if="currentSectionIndex === 1"
        key="section2"
        class="flex items-center justify-between absolute top-0 left-0 w-screen h-screen bg-white pl-[87px] overflow-hidden"
      >
        <h2 class="text-[#111111] font-extrabold text-[120px] w-[739px] tracking-[1.19px] leading-[1em]">
          It all starts with an idea
        </h2>
        <img src="~/assets/images/about/about_01.jpg" alt="" srcset="">
      </section>
      <!-- About 2 -->
      <section
        v-if="currentSectionIndex === 2"
        key="section3"
        class="flex items-center justify-between absolute top-0 left-0 w-screen h-screen bg-white pl-[87px] pr-[69px]"
      >
        <h2 class="text-[#111111] font-extrabold text-[120px] w-[739px] tracking-[1.19px] leading-[1em]">
          Idea becomes concept
        </h2>
        <img src="~/assets/images/about/about_02.jpg" alt="" srcset="">
      </section>
      <!-- About 3 -->
      <section
        v-if="currentSectionIndex === 3"
        key="section4"
        class="flex items-center justify-between absolute top-0 left-0 w-screen h-screen bg-white pl-[87px] pr-[35px]"
      >
        <h2 class="text-[#111111] font-extrabold text-[120px] w-[739px] tracking-[1.19px] leading-[1em]">
          It all starts with an idea
        </h2>
        <img src="~/assets/images/about/about_03.jpg" alt="" srcset="">
      </section>
    </transition>
    <Mouse class="w-4 fixed bottom-[45px] left-[45px] text-white border-white" />
  </div>
</template>

<script>
import Mouse from '~/assets/images/mouse.svg?inline'
import ArrowLeft from '~/assets/images/arrow_left.svg?inline'
import ArrowRight from '~/assets/images/arrow_right.svg?inline'
import GetInTouchButton from '~/components/GetInTouchButton.vue'

export default {
  components: {
    Mouse,
    ArrowLeft,
    ArrowRight,
    GetInTouchButton
  },
  data () {
    return {
      currentSectionIndex: -1,
      sectionTransitionName: '',
      transitioning: false,
      sections: [
        { id: 'featured' },
        { id: 'about' },
        { id: 'about-2' },
        { id: 'about-3' }
      ],
      currentSlideIndex: 0,
      slides: [
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
    numberOfSections () {
      return this.sections.length
    },
    currentSection () {
      return this.currentSectionIndex >= 0 ? this.sections[this.currentSectionIndex] : null
    },
    currentSlide () {
      return this.slides[this.currentSlideIndex]
    },
    numberOfSlides () {
      return this.slides.length
    }
  },
  watch: {
    currentSectionIndex (val, oldVal) {
      if (!oldVal) {
        this.sectionTransitionName = 'section'

        return
      }

      // eslint-disable-next-line no-console
      console.log('currentSectionIndex:', oldVal, '->', val)

      this.sectionTransitionName = oldVal > val ? 'section-reverse' : 'section'
    },
    '$route.query' (query) {
      this.onQueryChanged(query)
    }
  },
  created () {
    this.onQueryChanged(this.$route.query)
  },
  mounted () {
    document.addEventListener('wheel', this.onMouseWheel)
    document.addEventListener('keyup', this.onKeyUp)
  },
  beforeDestroy () {
    document.removeEventListener('wheel', this.onMouseWheel)
    document.removeEventListener('keyup', this.onKeyUp)
  },
  methods: {
    previousSection () {
      if (this.transitioning) {
        return
      }

      const nextIndex = this.currentSectionIndex - 1

      if (nextIndex >= 0) {
        this.$router.push({ path: '/', query: { l: this.sections[nextIndex].id } })
      }
    },
    nextSection () {
      if (this.transitioning) {
        return
      }

      const nextIndex = this.currentSectionIndex + 1

      if (nextIndex < this.numberOfSections) {
        this.$router.push({ path: '/', query: { l: this.sections[nextIndex].id } })
      }
    },
    previousSlide () {
      let nextIndex = this.currentSlideIndex - 1

      if (nextIndex <= 0) {
        nextIndex = this.numberOfSlides - 1
      }

      this.currentSlideIndex = nextIndex
    },
    nextSlide () {
      let nextIndex = this.currentSlideIndex + 1

      if (nextIndex >= this.numberOfSlides) {
        nextIndex = 0
      }

      this.currentSlideIndex = nextIndex
    },
    onMouseWheel (event) {
      if (event.deltaY > 0) {
        this.nextSection()
      }

      if (event.deltaY < 0) {
        this.previousSection()
      }
    },
    onKeyUp (event) {
      if (['ArrowDown', 'PageDown', ' '].includes(event.key)) {
        this.nextSection()
      }

      if (['ArrowUp', 'PageUp'].includes(event.key)) {
        this.previousSection()
      }
    },
    onQueryChanged (query) {
      if (!query || !query.l) {
        this.currentSectionIndex = 0

        return
      }

      this.currentSectionIndex = this.sections.findIndex(section => section.id === query.l)
    }
  }
}
</script>

<style>
.featured-slides .agile__caption {
  @apply absolute top-0 bottom-0 left-0 right-0;
}
</style>
