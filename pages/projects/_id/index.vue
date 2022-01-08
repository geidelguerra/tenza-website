<template>
  <div class="flex-1 bg-white pt-[108px] flex flex-col">
    <div class="ml-[192px] mr-[392px] mb-[42px] flex justify-between items-end">
      <h1
        class=" font-extrabold text-[26px] tracking-[6px] uppercase"
        v-html="project.name.replace(' ', '<br>')"
      />
      <div class="flex space-x-[30px] items-center">
        <span class="uppercase font-medium text-[14px] text-[#ccc]">Share</span>
        <ul class="flex space-x-[30px]">
          <li v-for="link in shareLinks" :key="link.url">
            <a
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ link.text }}
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="flex">
      <div class="flex-1">
        <img :src="project.thumbnail.url" alt="" class="w-full h-auto">
      </div>
      <div class="pl-[125px] w-[392px]">
        <div class="uppercase font-bold text-[20px]">
          {{ project.location }} ({{ project.year }})
        </div>
        <div class="border-t-2 border-black mt-[30px] pb-[30px] w-[20px]" />
        <div class="space-y-[40px] mb-[42px]">
          <div>
            <div class="font-bold text-[14px] uppercase">
              Area
            </div>
            <div class="text-[#ccc] font-bold">
              {{ project.area }} SQFT
            </div>
          </div>
        </div>

        <div class="flex space-x-[62px]">
          <NuxtLink
            v-for="link in pageLinks"
            :key="link.url"
            :to="`/projects/${project.id}/model`"
            class="flex flex-col items-center"
          >
            <Component :is="link.icon" class="h-[37px] mb-[12px]" />
            <div class="uppercase text-[14px] font-bold">
              {{ link.text }}
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getProject } from '@/api'
import ModelIcon from '~/assets/images/3d_model_icon.svg?inline'
import PlansIcon from '~/assets/images/plans_icon.svg?inline'

export default {
  components: {
    ModelIcon,
    PlansIcon
  },
  async asyncData ({ params, payload }) {
    return {
      project: payload || await getProject(params.id)
    }
  },
  data () {
    return {
      project: null
    }
  },
  computed: {
    shareLinks () {
      return [
        { text: 'Twitter', url: 'https://twitter.com' },
        { text: 'Facebook', url: 'https://facebook.com' }
      ]
    },
    pageLinks () {
      return [
        { text: '3D Model', icon: 'ModelIcon', url: `/projects/${this.project.id}/model` },
        { text: 'Plans', icon: 'PlansIcon', url: `/projects/${this.project.id}/plans` }
      ]
    }
  }
}
</script>
