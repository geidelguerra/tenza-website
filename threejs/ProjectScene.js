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
  MathUtils,
  DirectionalLightHelper,
  CameraHelper
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'

const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderConfig({ type: 'js' })
dracoLoader.setDecoderPath('/draco/gltf/')
dracoLoader.preload()

const noop = () => { }

const DEFAULT_MIN_DISTANCE = 40
const DEFAULT_MAX_DISTANCE = 77
// const DEFAULT_MIN_POLAR_ANGLE = MathUtils.degToRad(0)
// const DEFAULT_MAX_POLAR_ANGLE = MathUtils.degToRad(90)
const DEFAULT_DAMPING_FACTOR = 0.015
const DEFAULT_AUTO_ROTATE_SPEED = 2.0

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
    this.onCameraChangeCallback = options.onCameraChange || noop
    this.castShadow = options.castShadow === undefined ? false : options.castShadow
    this.showHelpers = options.showHelpers || false
    this.showStats = options.showStats || false
    this.autoRotate = options.autoRotate || false
    this.width = null
    this.height = null
    this.helpers = []
  }

  init (width, height) {
    this.width = width
    this.height = height

    this.renderer = new WebGLRenderer({ canvas: this.canvas, alpha: true, antialias: true })
    this.renderer.physicallyCorrectLights = true
    this.renderer.outputEncoding = sRGBEncoding
    this.renderer.setSize(width, height)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    if (this.castShadow) {
      this.renderer.shadowMap.enabled = true
      this.renderer.shadowMap.type = PCFSoftShadowMap
    }

    this.pmremGenerator = new PMREMGenerator(this.renderer)
    this.pmremGenerator.compileEquirectangularShader()

    this.scene = new Scene()

    this.camera = new PerspectiveCamera(30, width / height, 0.1, 1000)
    this.scene.add(this.camera)

    this.loader = new GLTFLoader()
    this.loader.setDRACOLoader(dracoLoader)

    this.initControls()

    const tick = () => {
      requestAnimationFrame(tick)

      const delta = this.clock.getDelta()

      this.mixers.forEach(mixer => mixer.update(delta))

      if (this.controls) {
        this.controls.update(delta)
      }

      if (this.camera) {
        this.renderer.render(this.scene, this.camera)
      }
    }

    tick()
  }

  resetCamera () {
    if (this.controls) {
      this.controls.reset()
    }
  }

  setSize (width, height) {
    this.width = width
    this.height = height
    this.renderer.setSize(width, height)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    if (this.camera) {
      this.camera.aspect = width / height
      this.camera.updateProjectionMatrix()
    }
  }

  useCamera (camera, positionOnly = false) {
    if (positionOnly) {
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
    } else {
      if (this.camera) {
        this.camera.removeFromParent()
      }

      this.camera = camera
      this.camera.aspect = this.width / this.height
      this.camera.updateProjectionMatrix()

      this.initControls()
    }
  }

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
    this.controls.enableDamping = true

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
        this.onModelLoaded(gltf)
        resolve()
      }, undefined, function (error) {
        reject(error)
      })
    })
  }

  updateHelpers () {
    this.helpers.forEach(obj => obj.removeFromParent())

    if (this.showHelpers) {
      this.addHelper(new AxesHelper(50))

      this.scene.traverse((obj) => {
        if (obj.type === 'DirectionalLight') {
          this.addHelper(new DirectionalLightHelper(obj, 5, 0x000000))

          if (obj.castShadow) {
            this.addHelper(new CameraHelper(obj.shadow.camera))
          }
        }
      })
    }
  }

  addHelper (obj) {
    this.scene.add(obj)
    this.helpers.push(obj)
  }

  updateScene () {
    this.updateHelpers()
    this.updateShadows()
  }

  updateShadows (obj) {
    this.scene.traverse((obj) => {
      if (obj.isLight) {
        obj.shadow.camera.near = 0.001
        obj.shadow.camera.far = 1000
        obj.shadow.camera.updateProjectionMatrix()

        if (obj.name === 'directional_shadow_Orientation') {
          obj.castShadow = this.castShadow
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
  }

  onCameraChange () {
    if (this.controls && this.camera) {
      const data = {
        distance: this.controls.getDistance(),
        polarAngle: MathUtils.radToDeg(this.controls.getPolarAngle()),
        azimuthalAngle: MathUtils.radToDeg(this.controls.getAzimuthalAngle()),
        x: this.camera.position.x,
        y: this.camera.position.y,
        z: this.camera.position.z
      }

      this.onCameraChangeCallback(data)
    }
  }

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
    this.updateScene()
  }
}
