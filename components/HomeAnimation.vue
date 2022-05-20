<template>
  <lottie-vue-player
    ref="player"
    src="/home_animation.json"
    :player-controls="false"
    :autoplay="false"
    :loop="false"
    style="width: 100%; height: 100%; background: transparent"
  />
</template>

<script>
export default {
  props: {
    disabled: Boolean
  },
  data () {
    return {
      currentBreakpointIndex: 0,
      breakpoints: [
        0,
        // 21,
        // 68,
        185,
        // 226,
        341,
        418
      ]
    }
  },
  computed: {
    currentBreakpoint () {
      return this.currentBreakpointIndex > -1 ? this.breakpoints[this.currentBreakpointIndex] : null
    }
  },
  watch: {
    currentBreakpoint (val, oldVal) {
      const player = this.$refs.player.$refs.player.getLottie()

      player.setDirection(val > oldVal ? 1 : -1)
      player.play()
    }
  },
  mounted () {
    this.$refs.player.$refs.player.loop = false
    this.$refs.player.$refs.player.addEventListener('ready', this.onReady)
    this.$refs.player.$refs.player.addEventListener('frame', this.onFrame)

    document.addEventListener('mousewheel', this.onMouseWheel)
  },
  beforeDestroy () {
    document.removeEventListener('mousewheel', this.onMouseWheel)

    this.$refs.player.$refs.player.removeEventListener('frame', this.onFrame)
    this.$refs.player.$refs.player.removeEventListener('ready', this.onReady)
  },
  methods: {
    playPrevious () {
      if (this.currentBreakpointIndex - 1 >= 0) {
        this.currentBreakpointIndex -= 1
      }
    },
    playNext () {
      if (this.currentBreakpointIndex + 1 < this.breakpoints.length) {
        this.currentBreakpointIndex += 1
      }
    },
    onReady () {
      this.$emit('ready')
    },
    onFrame (event) {
      const frame = Math.round(event.detail.frame)

      this.$emit('frame', frame)

      if (frame === this.currentBreakpoint) {
        this.$refs.player.$refs.player.getLottie().pause()

        this.$emit('breakpoint', frame)
      }
    },
    onMouseWheel (event) {
      if (this.disabled || !this.$refs.player.$refs.player.getLottie().isPaused) {
        return
      }

      if (event.deltaY > 0) {
        this.playNext()
      } else if (event.deltaY < 0) {
        this.playPrevious()
      }
    }
  }
}
</script>
