<template>
  <div class="absolute top-0 bottom-0 left-0 right-[1344px] flex items-center z-10">
    <div class="h-[452px] flex w-full">
      <ul class="w-full text-right pr-[52px] flex flex-col justify-between">
        <template v-for="(elm, idx) in elements">
          <li
            v-if="elm.dataset.title"
            :key="idx"
          >
            <a
              class="select-none font-bold text-[14px] transition-all duration-200 block hover:text-[#111]"
              :class="activeElementIndex >= idx ? 'text-[#111]' : 'text-[#ccc]'"
              :href="`#${elm.id}`"
              @click.prevent="$emit('element-click', elm)"
            >{{ elm.dataset.title }}</a>
          </li>
        </template>
      </ul>
      <ProgressBar :progress="progress" />
    </div>
  </div>
</template>

<script>
import ProgressBar from '~/components/ProgressBar.vue'

export default {
  components: { ProgressBar },
  props: {
    elements: { type: Array, default: () => [] },
    activeElementIndex: { type: Number, default: null },
    progress: { type: Number, default: null }
  }
}
</script>
