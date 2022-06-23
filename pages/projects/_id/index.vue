<template>
  <div class="bg-white pt-[108px] flex flex-col h-screen">
    <div class="ml-[270px] mr-[392px] mb-[93px] flex justify-between items-end">
      <h1
        class=" font-extrabold text-[26px] tracking-[3.64px] uppercase"
        v-html="project.name.replace(' ', '<br>')"
      />
    </div>
    <div class="flex pl-[94px] pr-[111px] pb-[139px] w-full flex-1 overflow-hidden">
      <!-- Gallery -->
      <div
        class="flex flex-1"
        :class="{'bg-white fixed top-0 left-0 right-0 bottom-0 z-50': galleryFullScreen}"
      >
        <div class="flex items-center justify-center w-[176px] shrink-0">
          <button
            class="text-[#111] transition-opacity duration-200"
            :class="{'pointer-events-none opacity-0': !hasPreviousSlides}"
            @click="activeSlideIndex--"
          >
            <ArrowLeft class="w-[27px]" />
          </button>
        </div>
        <div class="relative flex-1 h-full cursor-pointer" @click="galleryFullScreen = !galleryFullScreen">
          <Slider
            :key="galleryFullScreen"
            :active-slide-index="activeSlideIndex"
          >
            <template v-for="(image, i) in project.gallery">
              <img
                :key="i"
                :src="image"
                class="absolute top-0 left-0 object-contain w-full h-full"
              >
            </template>
          </Slider>
        </div>
        <div class="flex items-center justify-center w-[176px] shrink-0">
          <button
            class="text-[#111] transition-opacity duration-200"
            :class="{'pointer-events-none opacity-0': !hasNextSlides}"
            @click="activeSlideIndex++"
          >
            <ArrowRight class="w-[27px]" />
          </button>
        </div>
      </div>
      <!-- Details -->
      <div class="w-[264px] flex flex-col min-h-0 overflow-hidden">
        <div class="uppercase font-bold text-[20px]">
          {{ project.location }} ({{ project.year }})
        </div>
        <div class="border-t-2 border-black mt-[30px] pb-[30px] w-[20px]" />
        <div class="space-y-[2.5rem] mb-[42px]">
          <div>
            <div class="font-bold text-[14px] uppercase">
              Area
            </div>
            <div class="text-[#ccc] font-bold">
              {{ project.area }} SQFT
            </div>
          </div>
        </div>
        <div class="flex space-x-[3.875rem] mb-[32px]">
          <NuxtLink
            v-for="link in pageLinks"
            :key="link.url"
            :to="`/projects/${project.id}/model`"
            class="flex flex-col items-center"
          >
            <Component :is="link.icon" class="h-[37px] mb-[12px]" />
            <div class="uppercase text-[14px] font-bold">
              {{ link.text }}
            </div>
          </NuxtLink>
        </div>

        <div class="flex space-x-[1.875rem] items-center mb-[32px]">
          <span class="uppercase font-medium text-[14px] text-[#ccc]">Share</span>
          <ul class="flex items-center space-x-[1.875rem]">
            <li v-for="link in shareLinks" :key="link.url">
              <a
                :href="link.url"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Component :is="link.icon" class="w-18" />
              </a>
            </li>
          </ul>
        </div>
        <div class="flex-1 overflow-y-auto scrollbars pr-[20px]">
          <LongArrow class="inline-block align-baseline" /> {{ project.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getProject } from '@/api'
import ModelIcon from '~/assets/images/3d_model_icon.svg?inline'
import ArrowLeft from '~/assets/images/arrow_left.svg?inline'
import ArrowRight from '~/assets/images/arrow_right.svg?inline'
import TwitterIcon from '~/assets/images/twitter.svg?inline'
import LinkedInIcon from '~/assets/images/linkedin_alt.svg?inline'
import LongArrow from '~/assets/images/long_arrow.svg?inline'
import Slider from '~/components/Slider.vue'

export default {
  components: {
    ModelIcon,
    ArrowLeft,
    ArrowRight,
    TwitterIcon,
    LinkedInIcon,
    LongArrow,
    Slider
  },
  layout: 'noFooter',
  async asyncData ({ params, payload }) {
    return {
      project: payload || await getProject(params.id)
    }
  },
  data () {
    return {
      project: null,
      activeSlideIndex: 0,
      galleryFullScreen: false
    }
  },
  computed: {
    shareLinks () {
      return [
        { icon: 'TwitterIcon', url: `https://twitter.com/intent/tweet?text=${encodeURI(this.project.name)}&url=${encodeURI(window.location.href)}` },
        { icon: 'LinkedInIcon', url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURI(window.location.href)}` }
      ]
    },
    pageLinks () {
      const links = []

      if (this.project.scene.path) {
        links.push({ text: '3D Model', icon: 'ModelIcon', url: `/projects/${this.project.id}/model` })
      }

      return links
    },
    hasPreviousSlides () {
      return this.activeSlideIndex > 0
    },
    hasNextSlides () {
      return this.activeSlideIndex < this.numberOfSlides - 1
    },
    numberOfSlides () {
      return this.project ? this.project.gallery.length : 0
    }
  },
  beforeMount () {
    document.addEventListener('keyup', this.onKeyUp)
  },
  beforeDestroy () {
    document.removeEventListener('keyup', this.onKeyUp)
  },
  mounted () {
    this.$store.commit('lightMode', true)
  },
  methods: {
    onKeyUp (event) {
      if (event.key === 'Escape') {
        this.galleryFullScreen = false
      }
    }
  }
}
</script>
