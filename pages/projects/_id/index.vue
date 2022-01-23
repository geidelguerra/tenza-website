<template>
  <div class="flex-1 bg-white pt-[108px] flex flex-col">
    <div class="ml-[270px] mr-[392px] mb-[42px] flex justify-between items-end">
      <h1
        class=" font-extrabold text-[26px] tracking-[6px] uppercase mb-[93px]"
        v-html="project.name.replace(' ', '<br>')"
      />
    </div>
    <div class="flex pl-[174px] flex-1 pb-[41px]">
      <div class="flex items-center justify-center flex-1">
        <button class="block text-black" @click="previousSlide">
          <ArrowLeft class="w-[13px] h-[27px]" />
        </button>
        <div class="flex-1 h-full px-[84px] overflow-hidden relative">
          <template v-for="(image, index) in project.gallery">
            <transition :key="index" name="slider">
              <div
                v-if="currentSlideIndex === index"
                :key="index"
                :style="{backgroundImage: `url(${image})`}"
                class="absolute top-0 left-0 w-full h-full bg-center bg-no-repeat bg-contain"
              />
            </transition>
          </template>
        </div>
        <div>
          <button @click="nextSlide">
            <ArrowRight class="w-[13px] h-[27px]" />
          </button>
        </div>
      </div>
      <div class="pl-[125px] w-[392px] mr-[111px]">
        <div class="uppercase font-bold text-[20px]">
          {{ project.location }} ({{ project.year }})
        </div>
        <div class="border-t-2 border-black mt-[30px] pb-[30px] w-[20px]" />
        <div class="space-y-[40px] mb-[42px]">
          <div>
            <div class="font-bold text-[14px] uppercase">
              Area
            </div>
            <div class="text-[#ccc] font-bold">
              {{ project.area }} SQFT
            </div>
          </div>
        </div>
        <div class="flex space-x-[62px] mb-[32px]">
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

        <div class="flex space-x-[30px] items-center mb-[32px]">
          <span class="uppercase font-medium text-[14px] text-[#ccc]">Share</span>
          <ul class="flex items-center space-x-[30px]">
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

        <div v-html="project.description" />
      </div>
    </div>
  </div>
</template>

<script>
import { getProject } from '@/api'
import ModelIcon from '~/assets/images/3d_model_icon.svg?inline'
import PlansIcon from '~/assets/images/plans_icon.svg?inline'
import ArrowLeft from '~/assets/images/arrow_left.svg?inline'
import ArrowRight from '~/assets/images/arrow_right.svg?inline'
import Instagram from '~/assets/images/instagram.svg?inline'
import Twitter from '~/assets/images/twitter.svg?inline'

export default {
  components: {
    ModelIcon,
    PlansIcon,
    ArrowLeft,
    ArrowRight,
    Instagram,
    Twitter
  },
  async asyncData ({ params, payload }) {
    return {
      project: payload || await getProject(params.id)
    }
  },
  data () {
    return {
      project: null,
      currentSlideIndex: 0
    }
  },
  computed: {
    shareLinks () {
      return [
        { icon: 'Twitter', url: 'https://twitter.com' },
        { icon: 'Instagram', url: 'https://instagram.com' }
      ]
    },
    pageLinks () {
      return [
        { text: '3D Model', icon: 'ModelIcon', url: `/projects/${this.project.id}/model` },
        { text: 'Plans', icon: 'PlansIcon', url: `/projects/${this.project.id}/plans` }
      ]
    },
    currentSlide () {
      return this.project?.gallery[this.currentSlideIndex]
    },
    numberOfSlides () {
      return this.project ? this.project.gallery.length : 0
    }
  },
  methods: {
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
    }
  }
}
</script>
