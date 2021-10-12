<template>
  <div>
    <h1 class="mb-6 text-5xl font-bold text-center">
      Projects
    </h1>
    <div class="grid gap-6 p-6 sm:grid-cols-2">
      <template v-for="project in projects">
        <ProjectCard :key="project.name" :project="project" />
      </template>
    </div>
  </div>
</template>

<script>
import ProjectCard from '@/components/ProjectCard.vue'
import { getProjects } from '@/api'

export default {
  components: {
    ProjectCard
  },
  async asyncData () {
    return {
      projects: await getProjects()
    }
  },
  data () {
    return { projects: [] }
  }
}
</script>
