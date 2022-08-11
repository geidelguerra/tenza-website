<template>
  <div v-bind="$attrs">
    <div
      ref="container"
      class="w-full h-full bg-black"
      :class="{
        'relative': !fullscreen,
        'fixed top-0 left-0 right-0 bottom-0 z-50': fullscreen
      }"
    >
      <VZoomerGallery
        ref="gallery"
        v-model="index"
        background-color="transparent"
        class="w-full h-full"
        :list="images"
        :mouse-wheel-to-zoom="fullscreen"
      />
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
        {{ (index + 1).toString().padStart(2, '0') }}/{{ images.length.toString().padStart(2, '0') }}
      </div>
      <div v-if="fullscreen" class="absolute top-[20px] right-[30px] z-50 text-white">
        <MobileMenuButton
          :expanded="true"
          @click.stop="$emit('update:fullscreen', false)"
        />
      </div>
      <button v-else class="absolute top-[20px] right-[30px] text-[14px] text-right z-50 font-bold text-white" @click="$emit('update:fullscreen', true)">
        Expand
      </button>
    </div>
  </div>
</template>

<script>
import ArrowLeft from '~/assets/images/arrow_left.svg?inline'
import ArrowRight from '~/assets/images/arrow_right.svg?inline'
import MobileMenuButton from '~/components/MobileMenuButton.vue'

export default {
  components: {
    ArrowLeft,
    ArrowRight,
    MobileMenuButton
  },
  props: {
    images: { type: Array, default: () => [] },
    fullscreen: Boolean
  },
  data () {
    return {
      index: 0
    }
  },
  watch: {
    fullscreen () {
      this.$nextTick(() => {
        this.$refs.gallery.onWindowResize()
      })
    }
  },
  methods: {
    prevSlide () {
      this.$refs.gallery.paginate(-1)
    },
    nextSlide () {
      this.$refs.gallery.paginate(1)
    }
  }
}
</script>
