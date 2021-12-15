import {
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  Clock,
  sRGBEncoding,
  PMREMGenerator,
  AnimationMixer,
  UnsignedByteType
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
    this.onCameraChange = options.onCameraChange || noop
  }

  init (width, height) {
    this.renderer = new WebGLRenderer({ canvas: this.canvas, alpha: true })
    this.renderer.setSize(width, height)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.outputEncoding = sRGBEncoding

    this.pmremGenerator = new PMREMGenerator(this.renderer)
    this.pmremGenerator.compileEquirectangularShader()

    this.scene = new Scene()
    // this.scene.background = new Color(0xBFE3DD)
    // this.scene.environment = this.pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture

    this.camera = new PerspectiveCamera(75, width / height, 0.1, 1000)
    this.camera.position.set(5, 2, 8)
    this.scene.add(this.camera)

    this.loader = new GLTFLoader()
    this.loader.setDRACOLoader(dracoLoader)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.target.set(0, 0.5, 0)
    this.controls.enablePan = true
    this.controls.enableDamping = true
    this.controls.update()
    this.controls.addEventListener('change', () => {
      this.onCameraChange({
        distance: this.controls.getDistance(),
        polarAngle: this.controls.getPolarAngle(),
        azimuthalAngle: this.controls.getAzimuthalAngle()
      })
    })

    const tick = () => {
      requestAnimationFrame(tick)

      const delta = this.clock.getDelta()

      this.mixers.forEach(mixer => mixer.update(delta))
      this.controls.update(delta)
      this.renderer.render(this.scene, this.camera)
    }

    tick()
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
        const model = gltf.scene
        model.position.set(1, 1, 0)
        model.scale.set(0.01, 0.01, 0.01)
        this.scene.add(model)

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
