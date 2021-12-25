<template>
  <div>
    <canvas ref="canvas" />
    <div class="absolute top-20 right-8 z-40">
      <div class="text-right font-medium uppercase flex flex-col space-y-3">
        <div>Left click to Pan</div>
        <div>Middle click to Rotate</div>
        <div>Scroll to Zoom</div>
      </div>
      <div v-if="showDebugStats" class="font-mono mt-8">
        <div v-if="cameraStats" class="flex justify-end flex-col text-right">
          <pre>
          <span class="font-bold">       Distance:</span> {{ cameraStats.distance.toFixed(2) }}m
          <span class="font-bold">    Polar Angle:</span> {{ cameraStats.polarAngle.toFixed(2) }}&deg;
          <span class="font-bold">Azimuthal Angle:</span> {{ cameraStats.azimuthalAngle.toFixed(2) }}&deg;
          <span class="font-bold">              X:</span> {{ cameraStats.x.toFixed(2) }}
          <span class="font-bold">              Y:</span> {{ cameraStats.y.toFixed(2) }}
          <span class="font-bold">              Z:</span> {{ cameraStats.z.toFixed(2) }}
        </pre>
        </div>
      </div>
    </div>
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
      showDebugStats: process.env.debug,
      projectScene: null,
      cameraStats: null
    }
  },
  mounted () {
    const projectScene = this.projectScene = new ProjectScene(this.$refs.canvas, {
      onCameraChange: (stats) => { this.cameraStats = stats },
      castShadow: false,
      showHelpers: process.env.debug,
      showStats: process.env.debug
    })

    projectScene.init(this.$el.clientWidth, this.$el.clientHeight)
    projectScene.loadModel(this.project.scene.path)
    projectScene.loadEnvHDR('/hdr/urban_street_01_2k.hdr')

    window.addEventListener('keyup', (event) => {
      if (event.key === 'r') {
        this.projectScene.resetCamera()
      }
    })

    window.addEventListener('resize', () => {
      projectScene.setSize(this.$el.clientWidth, this.$el.clientHeight)
    })
  }
}
</script>
