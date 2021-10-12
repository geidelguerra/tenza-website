<template>
  <div>
    <canvas ref="canvas" />
  </div>
</template>

<script>
import { ProjectScene } from '@/threejs/ProjectScene'

export default {
  props: {
    project: { type: Object, required: true }
  },
  data () {
    return {
      projectScene: null
    }
  },
  mounted () {
    const projectScene = this.projectScene = new ProjectScene(this.$refs.canvas)
    projectScene.init(this.$el.clientWidth, this.$el.clientHeight)
    projectScene.loadModel('/models/LittlestTokyo.glb')

    window.addEventListener('resize', () => {
      projectScene.setSize(this.$el.clientWidth, this.$el.clientHeight)
    })
  }
}
</script>
