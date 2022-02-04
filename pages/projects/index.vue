<template>
  <div class="relative">
    <div class="absolute top-[224px] bottom-[157px] w-full overflow-hidden flex flex-col justify-center">
      <div class="flex justify-center w-full h-full">
        <div class="w-[187px] flex items-center justify-center">
          <button
            class="text-[#111] transition-opacity duration-200"
            :class="{'pointer-events-none opacity-60': !hasPrevProjects}"
            @click="activeProjectIndex--"
          >
            <ArrowLeft class="w-[27px]" />
          </button>
        </div>
        <transition name="slider" mode="out-in" :duration="500">
          <div
            :key="activeProjectIndex"
            class="w-full max-w-[1190px] h-full bg-center bg-cover bg-none"
            :style="{backgroundImage: `url(${activeProject.thumbnail.url})`}"
          />
        </transition>
        <div class="w-[187px] flex items-center justify-center">
          <button
            class="text-[#111] transition-opacity duration-200"
            :class="{'pointer-events-none opacity-60': !hasNextProjects}"
            @click="activeProjectIndex++"
          >
            <ArrowRight class="w-[27px]" />
          </button>
        </div>
      </div>
      <div class="mt-[89px] w-full max-w-[1190px] mx-auto flex justify-between">
        <div class="text-[14px] font-semibold uppercase tracking-[7px]">
          {{ activeProject.name }}
        </div>
        <div class="text-[14px] font-semibold uppercase tracking-[7px]">
          {{ (activeProjectIndex + 1).toString().padStart(2, '0') }}/{{ numberOfProjects.toString().padStart(2, '0') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getProjects } from '@/api'
import ArrowLeft from '~/assets/images/arrow_left.svg?inline'
import ArrowRight from '~/assets/images/arrow_right.svg?inline'

export default {
  components: {
    ArrowLeft,
    ArrowRight
  },
  async asyncData () {
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
    hasPrevProjects () {
      return this.activeProjectIndex - 1 > -1
    },
    hasNextProjects () {
      return this.activeProjectIndex + 1 - this.numberOfProjects
    },
    activeProject () {
      if (this.activeProjectIndex >= 0 && this.activeProjectIndex < this.numberOfProjects) {
        return this.projects[this.activeProjectIndex]
      }

      return null
    },
    numberOfProjects () {
      return this.projects.length
    }
  }
}
</script>
