<template>
  <div>
    <canvas ref="canvas" />
    <div
      v-if="showDebugPane && projectScene !== null"
      class="absolute top-[36px] right-[36px] z-40 flex justify-end flex-col space-y-4"
    >
      <div class="flex flex-col space-y-2">
        <button class="block p-2 text-sm uppercase border-2 border-black" @click="toggleShadows">
          {{ projectScene.castShadow ? 'Disable shadows' : 'Enable shadows' }}
        </button>
        <button class="block p-2 text-sm uppercase border-2 border-black" @click="toggleHelpers">
          {{ projectScene.showHelpers ? 'Hide helpers' : 'Show helpers' }}
        </button>
      </div>
      <div v-if="cameraStats" class="text-right">
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
</template>

<script>
import { ProjectScene } from '@/threejs/ProjectScene'

export default {
  props: {
    project: { type: Object, required: true }
  },
  data () {
    return {
      showDebugPane: process.env.debug,
      projectScene: null,
      cameraStats: null
    }
  },
  mounted () {
    const projectScene = this.projectScene = new ProjectScene(this.$refs.canvas, {
      onCameraChange: (stats) => { this.cameraStats = stats },
      castShadow: true,
      showHelpers: false,
      showStats: process.env.debug
    })

    projectScene.init(this.$el.clientWidth, this.$el.clientHeight)
    projectScene.loadModel(this.project.scene.path)
    // projectScene.loadEnvHDR('/hdr/urban_street_01_2k.hdr')

    window.addEventListener('keyup', (event) => {
      if (event.key === 'r') {
        this.projectScene.resetCamera()
      }
    })

    window.addEventListener('resize', () => {
      projectScene.setSize(this.$el.clientWidth, this.$el.clientHeight)
    })
  },
  methods: {
    toggleShadows () {
      this.projectScene.castShadow = !this.projectScene.castShadow
      this.projectScene.updateShadows()
    },
    toggleHelpers () {
      this.projectScene.showHelpers = !this.projectScene.showHelpers
      this.projectScene.updateHelpers()
    }
  }
}
</script>
