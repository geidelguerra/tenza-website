<template>
  <div v-observe="{ threshold: threshold, callback: onInterception }" v-bind="$attrs">
    <slot v-bind="{ visible }" />
  </div>
</template>

<script>
export default {
  props: {
    threshold: { type: [Number, Array], default: () => [0, 0.5, 1] }
  },
  data () {
    return { visible: false }
  },
  methods: {
    onInterception (entries) {
      this.visible = entries[0].intersectionRatio > 0.5
    }
  }
}
</script>
