import {
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  Clock,
  sRGBEncoding,
  PMREMGenerator,
  AnimationMixer
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment'

const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderConfig({ type: 'js' })
dracoLoader.setDecoderPath('/draco/gltf/')
dracoLoader.preload()

export class ProjectScene {
  constructor (canvas) {
    this.canvas = canvas
    this.renderer = null
    this.pmremGenerator = null
    this.scene = null
    this.camera = null
    this.controls = null
    this.loader = null
    this.mixers = []
    this.clock = new Clock()
  }

  init (width, height) {
    this.renderer = new WebGLRenderer({ canvas: this.canvas, alpha: true })
    this.renderer.setSize(width, height)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.outputEncoding = sRGBEncoding

    this.pmremGenerator = new PMREMGenerator(this.renderer)

    this.scene = new Scene()
    // this.scene.background = new Color(0xBFE3DD)
    this.scene.environment = this.pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture

    this.camera = new PerspectiveCamera(75, width / height, 0.1, 1000)
    this.camera.position.set(5, 2, 8)
    this.scene.add(this.camera)

    this.loader = new GLTFLoader()
    this.loader.setDRACOLoader(dracoLoader)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.target.set(0, 0.5, 0)
    this.controls.enablePan = false
    this.controls.enableDamping = true
    this.controls.update()

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

  loadModel (url) {
    this.mixers = []

    return new Promise((resolve, reject) => {
      this.loader.load(url, (gltf) => {
        const model = gltf.scene
        model.position.set(1, 1, 0)
        model.scale.set(0.01, 0.01, 0.01)
        this.scene.add(model)

        const mixer = new AnimationMixer(model)
        mixer.clipAction(gltf.animations[0]).play()

        this.mixers.push(mixer)

        resolve()
      }, undefined, function (error) {
        reject(error)
      })
    })
  }
}
