import {
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  Clock,
  sRGBEncoding,
  PMREMGenerator,
  AnimationMixer,
  UnsignedByteType,
  PCFSoftShadowMap,
  AxesHelper,
  MathUtils
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'

const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderConfig({ type: 'js' })
dracoLoader.setDecoderPath('/draco/gltf/')
dracoLoader.preload()

const noop = () => {}

const DEFAULT_MIN_DISTANCE = 40
const DEFAULT_MAX_DISTANCE = 77
const DEFAULT_MIN_POLAR_ANGLE = MathUtils.degToRad(0)
const DEFAULT_MAX_POLAR_ANGLE = MathUtils.degToRad(90)
const DEFAULT_DAMPING_FACTOR = 0.025

export class ProjectScene {
  constructor (canvas, options = {}) {
    this.canvas = canvas
    this.renderer = null
    this.pmremGenerator = null
    this.scene = null
    this.camera = null
    this.controls = null
    this.loader = null
    this.envHrdLoader = null
    this.mixers = []
    this.clock = new Clock()
    this.stats = null
    this.onCameraChange = options.onCameraChange || noop
    this.castShadow = options.castShadow || false
    this.showHelpers = options.showHelpers || false
    this.showStats = options.showStats || false
  }

  init (width, height) {
    this.renderer = new WebGLRenderer({ canvas: this.canvas, alpha: true, antialias: true })
    this.renderer.physicallyCorrectLights = true
    this.renderer.outputEncoding = sRGBEncoding
    // this.renderer.toneMapping = ReinhardToneMapping
    // this.renderer.toneMappingExposure = 1
    this.renderer.setSize(width, height)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    if (this.castShadow) {
      this.renderer.shadowMap.enabled = true
      this.renderer.shadowMap.type = PCFSoftShadowMap
    }

    this.pmremGenerator = new PMREMGenerator(this.renderer)
    this.pmremGenerator.compileEquirectangularShader()

    this.scene = new Scene()
    // this.scene.background = new Color(0xBFE3DD)
    // this.scene.environment = this.pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture

    this.camera = new PerspectiveCamera(30, width / height, 0.1, 100)
    this.scene.add(this.camera)

    this.loader = new GLTFLoader()
    this.loader.setDRACOLoader(dracoLoader)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.target.set(0, 0, 0)
    this.controls.enablePan = true
    this.controls.screenSpacePanning = true
    this.controls.enableDamping = true
    this.controls.dampingFactor = DEFAULT_DAMPING_FACTOR
    this.controls.minDistance = DEFAULT_MIN_DISTANCE
    this.controls.maxDistance = DEFAULT_MAX_DISTANCE
    this.controls.minPolarAngle = DEFAULT_MIN_POLAR_ANGLE
    this.controls.maxPolarAngle = DEFAULT_MAX_POLAR_ANGLE

    this.controls.saveState()
    this.controls.update()

    this.controls.addEventListener('change', () => {
      this.onCameraChange({
        distance: this.controls.getDistance(),
        polarAngle: MathUtils.radToDeg(this.controls.getPolarAngle()),
        azimuthalAngle: MathUtils.radToDeg(this.controls.getAzimuthalAngle())
      })
    })

    this.onCameraChange({
      distance: this.controls.getDistance(),
      polarAngle: MathUtils.radToDeg(this.controls.getPolarAngle()),
      azimuthalAngle: MathUtils.radToDeg(this.controls.getAzimuthalAngle())
    })

    if (this.showHelpers) {
      const axesHelper = new AxesHelper(50)
      this.scene.add(axesHelper)
    }

    const tick = () => {
      requestAnimationFrame(tick)

      const delta = this.clock.getDelta()

      this.mixers.forEach(mixer => mixer.update(delta))
      this.controls.update(delta)
      this.renderer.render(this.scene, this.camera)
    }

    tick()
  }

  resetCamera () {
    this.controls.reset()
  }

  setSize (width, height) {
    this.renderer.setSize(width, height)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
  }

  loadEnvHDR (url) {
    return new Promise((resolve, reject) => {
      this.envHrdLoader = new RGBELoader()
        .setDataType(UnsignedByteType)
        .load(url, (texture) => {
          this.scene.environment = this.pmremGenerator.fromEquirectangular(texture).texture
          texture.dispose()
          this.pmremGenerator.dispose()
          resolve()
        }, undefined, function (error) {
          reject(error)
        })
    })
  }

  loadModel (url) {
    this.mixers = []

    return new Promise((resolve, reject) => {
      this.loader.load(url, (gltf) => {
        // eslint-disable-next-line no-console
        console.log('Gltf:', gltf)

        const model = gltf.scene
        model.castShadow = this.castShadow
        model.traverse((obj) => {
          // If scene has a camera use its position
          if (obj.name === 'camera') {
            this.camera.position.set(
              obj.position.x,
              obj.position.y,
              obj.position.z
            )
            this.controls.saveState()
          }
        })

        this.scene.add(model)

        // Handle animations
        if (gltf.animations.length > 0) {
          const mixer = new AnimationMixer(model)

          mixer.clipAction(gltf.animations[0]).play()

          this.mixers.push(mixer)
        }

        resolve()
      }, undefined, function (error) {
        reject(error)
      })
    })
  }
}
