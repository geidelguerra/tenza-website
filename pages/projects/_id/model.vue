<template>
  <div class="relative h-screen bg-[#EBEAE5] pt-[108px]">
    <client-only>
      <ProjectViewer
        :project="project"
        class="absolute top-0 bottom-0 left-0 right-0"
      />
    </client-only>
    <div class="fixed bottom-[36px] left-[36px] right-[36px] z-40 flex justify-between items-end">
      <div class="font-medium uppercase flex flex-col space-y-3">
        <div>
          <div>ICON</div> <div>Left click to Pan</div>
        </div>
        <div>
          <div>ICON</div> <div>Middle click to Rotate</div>
        </div>
        <div>
          <div>ICON</div> <div>Scroll to Zoom</div>
        </div>
      </div>
      <NuxtLink
        :to="`/projects/${project.id}`"
        class="flex align-middle items-center space-x-[10px] text-[16px] px-[13px] py-[8px] text-black border-2 border-black uppercase"
      >
        <ArrowLeft class="h-[16px]" />
        <span>Back</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import ProjectViewer from '@/components/ProjectViewer.vue'
import ArrowLeft from '~/assets/images/arrow_left.svg?inline'
import { getProject } from '@/api'

export default {
  components: {
    ProjectViewer,
    ArrowLeft
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
