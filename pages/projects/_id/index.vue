<template>
  <div class="bg-white pt-[151px] pb-[45px] px-[45px] lg:pt-[108px] flex flex-col h-screen lg:px-[200px] lg:pb-0">
    <div class="lg:mb-[93px] flex justify-between items-end">
      <div class="flex items-end justify-between w-full lg:block">
        <h1
          class="font-extrabold text-[26px] tracking-[3.64px] uppercase lg:mb-[20px]"
          v-html="project.name.replace(' ', '<br>')"
        />
        <div class="flex">
          <nuxt-link
            v-if="prevProject"
            class="text-black p-[10px] block transition-all duration-200 bg-black bg-opacity-0 hover:bg-opacity-10"
            :to="`/projects/${prevProject.id}`"
          >
            <ArrowLeft class="h-[20px]" />
          </nuxt-link>
          <nuxt-link
            v-if="nextProject"
            class="text-black ml-[40px] p-[10px] block transition-all duration-200 bg-black bg-opacity-0 hover:bg-opacity-10"
            :to="`/projects/${nextProject.id}`"
          >
            <ArrowRight class="h-[20px]" />
          </nuxt-link>
        </div>
      </div>
    </div>
    <div class="flex lg:mb-[139px] w-full flex-1 overflow-hidden relative">
      <!-- Gallery -->
      <Gallery
        :fullscreen.sync="galleryFullscreen"
        :images="project.gallery"
        class="flex-1 hidden lg:flex"
      />
      <!-- Details -->
      <div class="w-full lg:max-w-[400px] lg:ml-[32px] flex flex-col min-h-0 overflow-hidden">
        <div class="uppercase font-bold text-[20px] mb-[30px]">
          {{ project.location }} ({{ project.year }})
        </div>
        <div class="hidden lg:block border-t-2 border-black pb-[30px] w-[20px]" />
        <div class="mb-[32px]">
          <div>
            <div class="font-bold text-[14px] uppercase">
              Area
            </div>
            <div class="text-[#ccc] font-bold">
              {{ project.area }} SQFT
            </div>
          </div>

          <div v-if="pageLinks.length > 0" class="flex">
            <NuxtLink
              v-for="link in pageLinks"
              :key="link.url"
              :to="`/projects/${project.id}/model`"
              class="flex flex-col items-center"
              :class="{'ml-[62px]': i > 0}"
            >
              <Component :is="link.icon" class="h-[37px] mb-[12px]" />
              <div class="uppercase text-[14px] font-bold">
                {{ link.text }}
              </div>
            </NuxtLink>
          </div>
        </div>

        <div class="flex-1 overflow-y-auto scrollbars pr-[20px] text-justify">
          <LongArrow class="inline-block align-baseline" /> {{ project.description }}
        </div>
      </div>
    </div>
    <div class="flex justify-center pt-[20px] lg:hidden">
      <button class="text-white px-[15px] py-[10px] rounded-full bg-black" @click="galleryFullscreen = true">
        Gallery
      </button>
      <Gallery v-if="galleryFullscreen" :images="project.gallery" :fullscreen.sync="galleryFullscreen" />
    </div>
  </div>
</template>

<script>
import { getProject, getProjects } from '@/api'
import ModelIcon from '~/assets/images/3d_model_icon.svg?inline'
import ArrowLeft from '~/assets/images/arrow_left.svg?inline'
import ArrowRight from '~/assets/images/arrow_right.svg?inline'
import TwitterIcon from '~/assets/images/twitter.svg?inline'
import LinkedInIcon from '~/assets/images/linkedin_alt.svg?inline'
import LongArrow from '~/assets/images/long_arrow.svg?inline'
import Slider from '~/components/Slider.vue'
import Gallery from '~/components/Gallery.vue'

export default {
  components: {
    ModelIcon,
    ArrowLeft,
    ArrowRight,
    TwitterIcon,
    LinkedInIcon,
    LongArrow,
    Slider,
    Gallery
  },
  layout: 'noFooter',
  async asyncData ({ params, payload }) {
    return {
      project: payload || await getProject(params.id),
      projects: await getProjects()
    }
  },
  data () {
    return {
      project: null,
      projects: [],
      activeSlideIndex: 0,
      galleryFullscreen: false,
      showGallery: false
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
    },
    currentProjectIndex () {
      return this.projects.findIndex(item => item.id === this.project.id)
    },
    prevProject () {
      let i = this.currentProjectIndex - 1

      if (i < 0) {
        i = this.projects.length - 1
      }

      return this.projects[i]
    },
    nextProject () {
      let i = this.currentProjectIndex + 1

      if (i >= this.projects.length) {
        i = 0
      }

      return this.projects[i]
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
    prevSlide () {
      let index = this.activeSlideIndex - 1

      if (index < 0) {
        index = this.numberOfSlides - 1
      }

      this.activeSlideIndex = index
    },
    nextSlide () {
      let index = this.activeSlideIndex + 1

      if (index >= this.numberOfSlides) {
        index = 0
      }

      this.activeSlideIndex = index
    },
    onKeyUp (event) {
      if (['Enter'].includes(event.key)) {
        this.galleryFullscreen = true

        return
      }

      if (['Escape'].includes(event.key)) {
        this.galleryFullscreen = false

        return
      }

      if (['ArrowLeft'].includes(event.key)) {
        this.prevSlide()

        return
      }

      if (['ArrowRight'].includes(event.key)) {
        this.nextSlide()
      }
    }
  }
}
</script>
