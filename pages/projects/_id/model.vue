<template>
  <div class="relative h-screen bg-[#EBEAE5]">
    <div class="absolute z-10 top-20 left-8">
      <h1 class="text-5xl font-bold text-center">
        {{ project.name }}
      </h1>
      <div class="text-xl">
        {{ project.year }}
      </div>
    </div>
    <client-only>
      <ProjectViewer
        :project="project"
        class="absolute top-0 bottom-0 left-0 right-0"
      />
    </client-only>
  </div>
</template>

<script>
import ProjectViewer from '@/components/ProjectViewer.vue'
import { getProject } from '@/api'

export default {
  components: {
    ProjectViewer
  },
  layout: 'project',
  async asyncData ({ params, payload }) {
    return {
      project: payload || await getProject(params.id)
    }
  },
  data () {
    return {
      project: null
    }
  }
}
</script>
