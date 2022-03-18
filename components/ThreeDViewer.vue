<template>
  <div>
    <canvas ref="canvas" />
    <div
      v-if="showDebugPane"
      class="absolute top-[36px] right-[36px] z-20 flex justify-end flex-col space-y-4"
    >
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
import {
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  Clock,
  sRGBEncoding,
  PMREMGenerator,
  AnimationMixer,
  PCFSoftShadowMap,
  MathUtils,
  AmbientLight
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderConfig({ type: 'js' })
dracoLoader.setDecoderPath('/draco/gltf/')
dracoLoader.preload()

const DEFAULT_MIN_DISTANCE = 40
const DEFAULT_MAX_DISTANCE = 77
const DEFAULT_DAMPING_FACTOR = 0.015
const DEFAULT_AUTO_ROTATE_SPEED = 2.0
const DEFAULT_SHADOW_MAP_SIZE = 2048
const DEFAULT_SHADOW_CAMERA_SIZE = 100

export default {
  props: {
    modelUrl: { type: String, default: null },
    castShadow: { type: Boolean, default: true },
    showHelpers: { type: Boolean, default: false },
    showStats: { type: Boolean, default: false },
    autoRotate: { type: Boolean, default: false },
    showDebugPane: { type: Boolean, default: false }
  },
  data () {
    return {
      cameraStats: null,
      renderer: null,
      pmremGenerator: null,
      scene: null,
      camera: null,
      controls: null,
      loader: null,
      envHrdLoader: null,
      mixers: [],
      clock: new Clock(),
      stats: null,
      helpers: [],
      loadingModel: false
    }
  },
  mounted () {
    this.renderer = new WebGLRenderer({ canvas: this.$refs.canvas, alpha: true, antialias: true })
    this.renderer.physicallyCorrectLights = true
    this.renderer.outputEncoding = sRGBEncoding
    this.renderer.setSize(this.$el.clientWidth, this.$el.clientHeight)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    if (this.castShadow) {
      this.renderer.shadowMap.enabled = true
      this.renderer.shadowMap.type = PCFSoftShadowMap
    }

    this.pmremGenerator = new PMREMGenerator(this.renderer)
    this.pmremGenerator.compileEquirectangularShader()

    this.scene = new Scene()

    this.loader = new GLTFLoader()
    this.loader.setDRACOLoader(dracoLoader)

    const ambient = new AmbientLight(0xFFFFFF, 0.2)
    this.scene.add(ambient)

    this.camera = new PerspectiveCamera(30, this.$el.clientWidth / this.$el.clientHeight, 0.1, 1000)
    this.scene.add(this.camera)

    this.initControls()

    this.onTick()

    window.addEventListener('keyup', (event) => {
      if (event.key === 'r') {
        this.resetCamera()
      }
    })

    window.addEventListener('resize', () => {
      this.resize()
    })

    if (this.modelUrl) {
      this.loadModel(this.modelUrl)
    }
  },
  methods: {
    initControls () {
      if (!this.camera || !this.renderer) {
        return
      }

      if (this.controls) {
        this.controls.dispose()
      }

      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      this.controls.target.set(0, 0, 0)
      this.controls.enablePan = true
      this.controls.screenSpacePanning = true
      this.controls.enableDamping = false

      this.controls.minDistance = DEFAULT_MIN_DISTANCE
      this.controls.maxDistance = DEFAULT_MAX_DISTANCE

      if (this.camera.userData.minDistance) {
        this.controls.minDistance = this.camera.userData.minDistance * 2
      }

      if (this.camera.userData.maxDistance) {
        this.controls.maxDistance = this.camera.userData.maxDistance * 2
      }

      this.controls.dampingFactor = DEFAULT_DAMPING_FACTOR
      this.controls.autoRotate = this.autoRotate
      this.controls.autoRotateSpeed = DEFAULT_AUTO_ROTATE_SPEED

      this.controls.saveState()
      this.controls.update()

      this.controls.addEventListener('change', this.onCameraChange.bind(this))

      this.onCameraChange()
    },
    loadModel (url) {
      this.mixers = []

      this.loadingModel = true
      this.$emit('model:loadingStarted')

      this.loader.load(
        this.modelUrl,
        (gltf) => {
          this.onModelLoaded(gltf)
          this.$emit('model:loadingFinished')
        }, (event) => {
          this.$emit('model:loadingProgress', {
            loaded: event.loaded,
            total: event.total,
            progress: (event.loaded / event.total) * 100
          })
        }, (error) => {
          this.loadingModel = false
          this.$emit('model:loadingFailed', error)
          this.$emit('model:loadingFinished')
        })
    },
    updateShadows (obj) {
      this.scene.traverse((obj) => {
        if (obj.isLight) {
          if (obj.name === 'directional_shadow_Orientation') {
            obj.castShadow = this.castShadow
            obj.shadow.mapSize.width = DEFAULT_SHADOW_MAP_SIZE
            obj.shadow.mapSize.height = DEFAULT_SHADOW_MAP_SIZE
            obj.shadow.bias = 0.0001
            obj.shadow.normalBias = 2
            obj.shadow.camera.top = DEFAULT_SHADOW_CAMERA_SIZE
            obj.shadow.camera.right = -DEFAULT_SHADOW_CAMERA_SIZE
            obj.shadow.camera.bottom = -DEFAULT_SHADOW_CAMERA_SIZE
            obj.shadow.camera.left = DEFAULT_SHADOW_CAMERA_SIZE
            obj.shadow.camera.updateProjectionMatrix()
          }
        }

        if (obj.isMesh) {
          obj.castShadow = this.castShadow
          obj.receiveShadow = this.castShadow

          if (obj.material.map) {
            obj.material.map.anisotropy = 16
          }
        }
      })
    },
    resetCamera () {
      if (this.controls) {
        this.controls.reset()
      }
    },
    resize () {
      this.renderer.setSize(this.$el.clientWidth, this.$el.clientHeight)
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

      if (this.camera) {
        this.camera.aspect = this.$el.clientWidth / this.$el.clientHeight
        this.camera.updateProjectionMatrix()
      }
    },
    useCamera (camera, positionOnly = false) {
      this.camera.position.set(
        camera.parent.position.x,
        camera.parent.position.y,
        camera.parent.position.z
      )

      if (camera.userData.minDistance) {
        this.controls.minDistance = camera.userData.minDistance * 2
      }

      if (camera.userData.maxDistance) {
        this.controls.maxDistance = camera.userData.maxDistance * 2
      }

      this.controls.saveState()
      this.controls.update()

      camera.visible = false
    },
    onTick () {
      requestAnimationFrame(this.onTick)

      const delta = this.clock.getDelta()

      this.mixers.forEach(mixer => mixer.update(delta))

      if (this.controls) {
        this.controls.update(delta)
      }

      if (this.camera) {
        this.renderer.render(this.scene, this.camera)
      }
    },
    onCameraChange () {
      if (this.controls && this.camera) {
        this.cameraStats = {
          distance: this.controls.getDistance(),
          polarAngle: MathUtils.radToDeg(this.controls.getPolarAngle()),
          azimuthalAngle: MathUtils.radToDeg(this.controls.getAzimuthalAngle()),
          x: this.camera.position.x,
          y: this.camera.position.y,
          z: this.camera.position.z
        }
      }
    },
    onModelLoaded (gltf) {
      const model = gltf.scene

      model.traverse((obj) => {
        if (obj.isCamera) {
          this.useCamera(obj, true)
        }
      })

      // Handle animations
      if (gltf.animations.length > 0) {
        const mixer = new AnimationMixer(model)

        mixer.clipAction(gltf.animations[0]).play()

        this.mixers.push(mixer)
      }

      this.scene.add(model)

      this.updateShadows()
    }
  }
}
</script>
