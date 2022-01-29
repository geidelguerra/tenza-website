<template>
  <div
    class="bg-[#ccc]"
    :class="{
      'w-[2px] h-full': !vertical,
      'w-full h-[2px]': vertical
    }"
  >
    <div class="bg-[#111]" :style="barStyle" />
  </div>
</template>

<script>
export default {
  props: {
    progress: {
      type: Number,
      default: 0
    },
    vertical: Boolean
  },
  computed: {
    barStyle () {
      return {
        //
      }
    }
  }
}
</script>
