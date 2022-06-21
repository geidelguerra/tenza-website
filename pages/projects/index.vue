<template>
  <div class="relative w-screen h-screen">
    <nuxt-link :to="`/projects/${activeProject.id}`" class="absolute top-0 left-0 block w-full h-full">
      <img :src="activeProject.thumbnail.url" class="absolute top-0 left-0 object-cover w-full h-full">
      <div class="absolute top-0 bottom-0 left-0 right-0 bg-gradient-radial from-white to-black mix-blend-multiply opacity-80" />
    </nuxt-link>

    <div class="absolute top-0 bottom-0 left-[124px] z-30 flex items-center">
      <button
        class="text-white transition-opacity duration-200"
        @click="prevProject"
      >
        <ArrowLeft class="w-[27px]" />
      </button>
    </div>

    <div class="absolute top-0 bottom-0 right-[124px] z-30 flex items-center">
      <button
        class="text-white transition-opacity duration-200"
        @click="nextProject"
      >
        <ArrowRight class="w-[27px]" />
      </button>
    </div>

    <div class="absolute bottom-[133px] left-[200px] z-30">
      <nuxt-link
        :to="`/projects/${activeProject.id}`"
        class="block text-[14px] font-semibold uppercase tracking-[7px] text-white hover:underline underline-offset-1"
        v-html="activeProject.name.replace(' ', '<br>')"
      />
    </div>
    <div class="absolute bottom-[133px] right-[200px] z-30">
      <div class="text-[14px] font-semibold uppercase tracking-[7px] text-white">
        {{ (activeProjectIndex + 1).toString().padStart(2, '0') }}/{{ projects.length.toString().padStart(2, '0') }}
      </div>
    </div>
    <!-- <div class="absolute top-[224px] bottom-[133px] w-full overflow-hidden flex flex-col justify-center">
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
    </div> -->
  </div>
</template>

<script>
import { getProjects } from '@/api'
import ArrowLeft from '~/assets/images/arrow_left.svg?inline'
import ArrowRight from '~/assets/images/arrow_right.svg?inline'
// import Slider from '~/components/Slider.vue'

export default {
  components: {
    ArrowLeft,
    ArrowRight
    // Slider
  },
  async asyncData ({ store }) {
    return {
      projects: await getProjects()
    }
  },
  data () {
    return {
      activeProjectIndex: 0,
      activeSlideIndex: 0,
      projects: []
    }
  },
  computed: {
    activeProject () {
      return this.projects[this.activeProjectIndex]
    }
  },
  mounted () {
    this.$store.commit('lightMode', false)
  },
  methods: {
    prevProject () {
      if (this.activeProjectIndex - 1 >= 0) {
        this.activeProjectIndex--
      } else {
        this.activeProjectIndex = this.projects.length - 1
      }
    },
    nextProject () {
      if (this.activeProjectIndex + 1 < this.projects.length) {
        this.activeProjectIndex++
      } else {
        this.activeProjectIndex = 0
      }
    }
  }
}
</script>
