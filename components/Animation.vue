<template>
  <div v-observe="{ callback: onInterception }" v-bind="$attrs">
    <lottie-vue-player
      ref="player"
      :src="src"
      :player-controls="false"
      :autoplay="false"
      :loop="loop"
      style="width: 100%; height: 100%; background: transparent; overflow: hidden"
    />
  </div>
</template>

<script>
export default {
  props: {
    src: { type: String, default: null },
    disabled: Boolean,
    autoplay: { type: [Boolean, String], default: false },
    loop: Boolean,
    progress: { type: Number, default: 0 }
  },
  data () {
    return {
      player: null,
      visible: false
    }
  },
  watch: {
    progress () {
      this.updatePlayer()
    },
    visible (val) {
      if (this.autoplay && val) {
        this.player.play()
      }
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
    onInterception (entries) {
      this.visible = entries[0].intersectionRatio > 0.5
    },
    updatePlayer () {
      const percent = this.progress

      // Skip last frame because is empty.
      const frame = percent >= 1 ? this.player.totalFrames - 1 : percent * this.player.totalFrames

      this.player.goToAndStop(frame, true)
    },
    onReady () {
      this.player = this.$refs.player.$refs.player.getLottie()

      if (this.autoplay && this.visible) {
        this.player.play()

        return
      }

      this.updatePlayer()
    },
    onLoad () {
      this.$emit('load')
    }
  }
}
</script>
