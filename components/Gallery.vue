<template>
  <div v-bind="$attrs">
    <div
      class="w-full h-full"
      :class="{
        'relative': !fullscreen,
        'bg-white fixed top-0 left-0 right-0 bottom-0 z-50': fullscreen
      }"
      @click.stop="$emit('update:fullscreen', !fullscreen)"
    >
      <Slider
        :key="fullscreen"
        :active-index="activeImageIndex"
        class="w-full h-full cursor-pointer"
      >
        <template v-for="(image, i) in images">
          <img
            :key="i"
            :src="image"
            class="absolute top-0 left-0 object-cover w-full h-full"
          >
        </template>
      </Slider>
      <div class="absolute top-0 left-0 z-30 flex items-center justify-center h-full">
        <button
          class="text-white p-[10px] block transition-all duration-200 bg-black bg-opacity-0 hover:bg-opacity-50"
          @click.stop="prevSlide"
        >
          <ArrowLeft class="w-[27px]" />
        </button>
      </div>
      <div class="absolute top-0 right-0 z-30 flex items-center justify-center h-full">
        <button
          class="text-white p-[10px] block transition-all duration-200 bg-black bg-opacity-0 hover:bg-opacity-50"
          @click.stop="nextSlide"
        >
          <ArrowRight class="w-[27px]" />
        </button>
      </div>
      <div class="absolute bottom-[20px] lg:bottom-[45px] right-[20px] z-50 text-[14px] font-semibold uppercase tracking-[7px] text-white">
        {{ (activeImageIndex + 1).toString().padStart(2, '0') }}/{{ images.length.toString().padStart(2, '0') }}
      </div>
      <button
        v-if="fullscreen"
        class="absolute top-[45px] right-[20px] z-50 text-white"
        @click.stop="$emit('update:fullscreen', false)"
      >
        <MenuExpanded />
      </button>
    </div>
  </div>
</template>

<script>
import ArrowLeft from '~/assets/images/arrow_left.svg?inline'
import ArrowRight from '~/assets/images/arrow_right.svg?inline'
import MenuExpanded from '~/assets/images/menu_expanded.svg?inline'
import Slider from '~/components/Slider.vue'

export default {
  components: {
    ArrowLeft,
    ArrowRight,
    MenuExpanded,
    Slider
  },
  props: {
    images: { type: Array, default: () => [] },
    fullscreen: Boolean
  },
  data () {
    return {
      activeImageIndex: 0
    }
  },
  methods: {
    prevSlide () {
      let i = this.activeImageIndex - 1

      if (i < 0) {
        i = this.images.length - 1
      }

      this.activeImageIndex = i
    },
    nextSlide () {
      let i = this.activeImageIndex + 1

      if (i >= this.images.length) {
        i = 0
      }

      this.activeImageIndex = i
    }
  }
}
</script>
