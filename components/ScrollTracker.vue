<template>
  <component v-bind="$attrs" :is="tag" v-scroll="{ onScroll }">
    <slot v-bind="{ scrollTop, scrollHeight, progress }" />
  </component>
</template>

<script>
export default {
  props: {
    tag: { type: String, default: 'div' }
  },
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
    }
  }
}
</script>
