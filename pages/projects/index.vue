<template>
  <div>
    <div>
      <template v-for="(project, index) in projects">
        <div
          :key="index"
          class="px-4"
        >
          <div class="flex items-center h-screen">
            <nuxt-link :to="`/projects/${project.id}`">
              <img
                :src="project.thumbnail.url"
                class="block w-full mb-8 select-none"
              >
              <div class="flex justify-between">
                <div class="font-medium text-black">
                  {{ project.name }}
                </div>
              </div>
            </nuxt-link>
          </div>
        </div>
      </template>
    </div>
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
