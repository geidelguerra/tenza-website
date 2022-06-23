<template>
  <div v-scroll="{ onScroll }" v-bind="$attrs">
    <slot v-bind="{ scrollTop, scrollHeight, progress }" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      scrollTop: 0,
      scrollHeight: 0,
      progress: 0
    }
  },
  methods: {
    onScroll (scrollTop, scrollHeight, progress) {
      this.scrollTop = scrollTop
      this.scrollHeight = scrollHeight
      this.progress = progress

      this.$emit('scroll-progress', { scrollTop, scrollHeight, progress })
    }
  }
}
</script>
