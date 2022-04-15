<template>
  <div class="relative">
    <div class="absolute top-[224px] bottom-[133px] w-full overflow-hidden flex flex-col justify-center">
      <div class="relative flex justify-center w-full h-full">
        <div class="flex items-center justify-end pr-[64px] w-[201px] shrink-0">
          <button
            class="text-[#111] transition-opacity duration-200"
            :class="{'pointer-events-none opacity-0': !hasPrevProjects}"
            @click="activeSlideIndex--"
          >
            <ArrowLeft class="w-[27px]" />
          </button>
        </div>
        <div class="relative flex-1 h-full">
          <Slider
            :active-slide-index="activeSlideIndex"
            transition-name="slider"
          >
            <template v-for="project in projects">
              <nuxt-link
                :key="project.id"
                :to="`/projects/${project.id}`"
                class="block w-full h-full bg-center bg-cover bg-none"
                :style="{backgroundImage: `url(${project.thumbnail.url})`}"
              />
            </template>
          </Slider>
        </div>
        <div class="flex items-center justify-start pl-[64px] w-[201px] shrink-0">
          <button
            class="text-[#111] transition-opacity duration-200"
            :class="{'pointer-events-none opacity-0': !hasNextProjects}"
            @click="activeSlideIndex++"
          >
            <ArrowRight class="w-[27px]" />
          </button>
        </div>
      </div>
      <div class="mt-[89px] px-[201px] w-full flex justify-between">
        <div class="text-[14px] font-semibold uppercase tracking-[7px]">
          {{ activeProject.name }}
        </div>
        <div class="text-[14px] font-semibold uppercase tracking-[7px]">
          {{ (activeSlideIndex + 1).toString().padStart(2, '0') }}/{{ numberOfProjects.toString().padStart(2, '0') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getProjects } from '@/api'
import ArrowLeft from '~/assets/images/arrow_left.svg?inline'
import ArrowRight from '~/assets/images/arrow_right.svg?inline'
import Slider from '~/components/Slider.vue'

export default {
  components: {
    ArrowLeft,
    ArrowRight,
    Slider
  },
  async asyncData ({ store }) {
    store.commit('lightMode', true)

    return {
      projects: await getProjects()
    }
  },
  data () {
    return {
      activeSlideIndex: 0,
      projects: []
    }
  },
  computed: {
    hasPrevProjects () {
      return this.activeSlideIndex - 1 > -1
    },
    hasNextProjects () {
      return this.activeSlideIndex + 1 - this.numberOfProjects
    },
    activeProject () {
      if (this.activeSlideIndex >= 0 && this.activeSlideIndex < this.numberOfProjects) {
        return this.projects[this.activeSlideIndex]
      }

      return null
    },
    numberOfProjects () {
      return this.projects.length
    }
  }
}
</script>
