<template>
  <div v-bind="$attrs">
    <slot>
      <Nuxt />
    </slot>
  </div>
</template>

<script>
export default {
  mounted () {
    this.updateVh()

    window.addEventListener('resize', this.updateVh)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.updateVh)
  },
  methods: {
    updateVh () {
      const vh = window.innerHeight * 0.01

      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }
  }
}
</script>
