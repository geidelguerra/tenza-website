<template>
  <div class="relative w-screen h-screen">
    <Slider class="w-full h-full" :active-index="activeProjectIndex">
      <template v-for="(project, index) in projects">
        <nuxt-link :key="index" :to="`/projects/${project.id}`" class="absolute top-0 left-0 block w-full h-full">
          <img :src="project.thumbnail.url" class="absolute top-0 left-0 object-cover w-full h-full">
          <div class="absolute top-0 bottom-0 left-0 right-0 bg-gradient-radial from-white to-black mix-blend-multiply opacity-80" />
        </nuxt-link>
      </template>
    </Slider>

    <div class="absolute top-[151px] left-[20px] lg:top-[225px] lg:left-[200px] flex z-20">
      <button
        class="text-white p-[10px] block transition-all duration-200 bg-black bg-opacity-0 hover:bg-opacity-50"
        @click="prevProject"
      >
        <ArrowLeft class="h-[20px]" />
      </button>
      <button
        class="text-white ml-[40px] p-[10px] block transition-all duration-200 bg-black bg-opacity-0 hover:bg-opacity-50"
        @click="nextProject"
      >
        <ArrowRight class="h-[20px]" />
      </button>
    </div>

    <div class="absolute bottom-[45px] left-[20px] lg:bottom-[133px] lg:left-[200px] z-30">
      <nuxt-link
        :to="`/projects/${activeProject.id}`"
        class="block text-[14px] font-semibold uppercase tracking-[7px] text-white hover:underline underline-offset-1"
        v-html="activeProject.name.replace(' ', '<br>')"
      />
    </div>
    <div class="absolute bottom-[45px] right-[20px] lg:bottom-[133px] lg:right-[200px] z-30">
      <div class="text-[14px] font-semibold uppercase tracking-[7px] text-white">
        {{ (activeProjectIndex + 1).toString().padStart(2, '0') }}/{{ projects.length.toString().padStart(2, '0') }}
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
  layout: 'noFooter',
  async asyncData ({ store }) {
    return {
      projects: await getProjects()
    }
  },
  data () {
    return {
      activeProjectIndex: 0,
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
