<template>
  <div class="relative h-screen bg-[#EBEAE5] pt-[108px]">
    <client-only>
      <ProjectViewer
        :project="project"
        class="absolute top-0 bottom-0 left-0 right-0"
      />
    </client-only>
    <div class="fixed bottom-[46px] left-[46px] pointer-events-none">
      <div class="flex flex-col space-y-[58px] font-medium uppercase">
        <div class="flex space-x-[36px]">
          <div><PanIcon /></div> <div>Left click to Pan</div>
        </div>
        <div class="flex space-x-[36px]">
          <div><RotateIcon /></div> <div>Middle click to Rotate</div>
        </div>
        <div class="flex space-x-[36px]">
          <div><ZoomIcon /></div> <div>Scroll to Zoom</div>
        </div>
      </div>
    </div>
    <div class="fixed bottom-[46px] right-[46px]">
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
import ZoomIcon from '~/assets/images/zoom_icon.svg?inline'
import PanIcon from '~/assets/images/pan_icon.svg?inline'
import RotateIcon from '~/assets/images/rotate_icon.svg?inline'
import { getProject } from '@/api'

export default {
  components: {
    ProjectViewer,
    ArrowLeft,
    ZoomIcon,
    PanIcon,
    RotateIcon
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
