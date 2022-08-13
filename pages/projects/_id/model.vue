<template>
  <div class="relative h-screen bg-[#EBEAE5]">
    <client-only>
      <ThreeDViewer
        :model-url="project.scene.path"
        class="absolute top-0 bottom-0 left-0 right-0"
        @model:loadingStarted="loading = true"
        @model:loadingProgress="({ progress }) => progress = progress"
        @model:loadingFinished="loading = false"
      />
    </client-only>
    <template v-if="!loading">
      <div class="fixed bottom-[45px] left-[45px] pointer-events-none z-30">
        <div class="flex flex-col justify-center uppercase text-[11px]">
          <div class="flex items-center">
            <div class="w-[32px] flex justify-center">
              <RotateIcon />
            </div>
            <div class="ml-[23px]">
              Orbit
            </div>
          </div>
          <div class="flex items-center mt-[14px]">
            <div class="w-[32px] flex justify-center">
              <RotateIcon class="scale-x-[-100%]" />
            </div>
            <div class="ml-[23px]">
              Pan
            </div>
          </div>
          <div class="flex items-center mt-[14px]">
            <div class="w-[32px] flex justify-center">
              <ZoomIcon />
            </div>
            <div class="ml-[23px]">
              Zoom
            </div>
          </div>
        </div>
      </div>
      <div class="fixed bottom-[45px] right-[45px] z-30">
        <NuxtLink
          :to="`/projects/${project.id}`"
          class="flex align-middle items-center space-x-[0.5rem] text-[11px] px-[10px] py-[6px] text-black border-2 border-black uppercase"
        >
          <ArrowLeft class="h-[11px]" />
          <span>Back</span>
        </NuxtLink>
      </div>
    </template>
  </div>
</template>

<script>
import ThreeDViewer from '~/components/ThreeDViewer.vue'
import ArrowLeft from '~/assets/images/arrow_left.svg?inline'
import ZoomIcon from '~/assets/images/zoom_icon.svg?inline'
import RotateIcon from '~/assets/images/rotate_icon.svg?inline'
import { getProject } from '@/api'

export default {
  components: {
    ThreeDViewer,
    ArrowLeft,
    ZoomIcon,
    RotateIcon
  },
  async asyncData ({ params, payload }) {
    return {
      project: payload || await getProject(params.id)
    }
  },
  data () {
    return {
      project: null,
      progress: 0
    }
  },
  computed: {
    loading: {
      get () {
        return this.$store.state.loading
      },
      set (val) {
        this.$store.commit('loading', val)
      }
    }
  },
  mounted () {
    this.$store.commit('showHeader', false)
    this.$store.commit('showFooter', false)
  }
}
</script>
