<template>
  <div>
    <client-only>
      <agile
        :slides-to-show="3"
        :center-mode="false"
        :nav-buttons="false"
        :dots="false"
        :autoplay="false"
        :pause-on-hover="false"
        :infinite="false"
      >
        <template v-for="(project, index) in projects">
          <div
            :key="index"
            class="px-4"
          >
            <div class="flex items-center h-screen">
              <nuxt-link :to="`/projects/${project.id}`">
                <img
                  :src="project.thumbnail.url"
                  class="w-full select-none block mb-8"
                >
                <div class="flex justify-between">
                  <div class="text-black font-medium">
                    {{ project.name }}
                  </div>
                </div>
              </nuxt-link>
            </div>
          </div>
        </template>
      </agile>
    </client-only>
  </div>
</template>

<script>
import { getProjects } from '@/api'

export default {
  async asyncData () {
    return {
      projects: await getProjects()
    }
  },
  data () {
    return { projects: [] }
  },
  computed: {
    numberOfProjects () {
      return this.projects.length
    }
  }
}
</script>
