<template>
  <lottie-vue-player
    ref="player"
    :src="src"
    :player-controls="false"
    :autoplay="autoplay"
    :loop="loop"
    style="width: 100%; height: 100%; background: transparent; overflow: hidden"
  />
</template>

<script>
export default {
  props: {
    src: { type: String, default: null },
    disabled: Boolean,
    autoplay: Boolean,
    loop: Boolean,
    progress: { type: Number, default: 0 }
  },
  data () {
    return {
      player: null
    }
  },
  watch: {
    progress () {
      this.updatePlayer()
    }
  },
  mounted () {
    this.player = this.$refs.player.$refs.player
    this.$refs.player.$refs.player.addEventListener('ready', this.onReady)
    this.$refs.player.$refs.player.addEventListener('load', this.onLoad)
  },
  beforeDestroy () {
    this.$refs.player.$refs.player.removeEventListener('ready', this.onReady)
    this.$refs.player.$refs.player.removeEventListener('ready', this.onLoad)
  },
  methods: {
    updatePlayer () {
      const percent = this.progress

      // Skip last frame because is empty.
      const frame = percent >= 1 ? this.player.totalFrames - 1 : percent * this.player.totalFrames

      this.player.goToAndStop(frame, true)
    },
    onReady () {
      this.player = this.$refs.player.$refs.player.getLottie()

      this.updatePlayer()
    },
    onLoad () {
      this.$emit('load')
    }
  }
}
</script>
