<template>
  <div class="w-[4px] bg-[#ccc] h-full rounded-t-[4px] rounded-b-[4px]">
    <div class="bg-[#111] transition-all duration-200 rounded-t-[4px] rounded-b-[4px]" :style="barStyle" />
  </div>
</template>

<script>
export default {
  props: {
    progress: { type: Number, default: 0 }
  },
  computed: {
    barStyle () {
      const progress = (this.progress > 1 ? 1 : this.progress) * 100

      return { height: `${progress}%` }
    }
  }
}
</script>
