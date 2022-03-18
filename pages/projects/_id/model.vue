<template>
  <div class="relative h-screen bg-[#EBEAE5] pt-[108px]">
    <div v-if="loadingModel" class="fixed top-0 bottom-0 left-0 right-0 z-40 flex items-center justify-center bg-[#EBEAE5]">
      <div>Loading... ({{ modelLoadProgress.toFixed(2) }}%)</div>
    </div>
    <template v-else>
      <div class="fixed bottom-[46px] left-[46px] pointer-events-none z-30">
        <div class="flex flex-col space-y-[48px] uppercase text-[11px]">
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
      <div class="fixed bottom-[46px] right-[46px] z-30">
        <NuxtLink
          :to="`/projects/${project.id}`"
          class="flex align-middle items-center space-x-[8px] text-[11px] px-[10px] py-[6px] text-black border-2 border-black uppercase"
        >
          <ArrowLeft class="h-[11px]" />
          <span>Back</span>
        </NuxtLink>
      </div>
    </template>
    <client-only>
      <ThreeDViewer
        :model-url="project.scene.path"
        class="absolute top-0 bottom-0 left-0 right-0"
        @model:loadingStarted="loadingModel = true"
        @model:loadingProgress="({ progress }) => modelLoadProgress = progress"
        @model:loadingFinished="loadingModel = false"
      />
    </client-only>
  </div>
</template>

<script>
import ThreeDViewer from '~/components/ThreeDViewer.vue'
import ArrowLeft from '~/assets/images/arrow_left.svg?inline'
import ZoomIcon from '~/assets/images/zoom_icon.svg?inline'
import PanIcon from '~/assets/images/pan_icon.svg?inline'
import RotateIcon from '~/assets/images/rotate_icon.svg?inline'
import { getProject } from '@/api'

export default {
  components: {
    ThreeDViewer,
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
      project: null,
      loadingModel: false,
      modelLoadProgress: 0
    }
  }
}
</script>
