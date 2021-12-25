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
const DEFAULT_MIN_POLAR_ANGLE = MathUtils.degToRad(0)
const DEFAULT_MAX_POLAR_ANGLE = MathUtils.degToRad(90)
const DEFAULT_DAMPING_FACTOR = 0.025
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
    this.onCameraChange = options.onCameraChange || noop
    this.castShadow = options.castShadow || true
    this.showHelpers = options.showHelpers || false
    this.showStats = options.showStats || false
    this.autoRotate = options.autoRotate || false
  }

  init (width, height) {
    this.renderer = new WebGLRenderer({ canvas: this.canvas, alpha: true, antialias: true })
    this.renderer.physicallyCorrectLights = true
    this.renderer.outputEncoding = sRGBEncoding
    // this.renderer.toneMappingExposure = 0.5
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

    this.camera = new PerspectiveCamera(30, width / height, 0.1, 1000)
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
    this.controls.autoRotate = this.autoRotate
    this.controls.autoRotateSpeed = DEFAULT_AUTO_ROTATE_SPEED

    this.controls.saveState()
    this.controls.update()

    this.controls.addEventListener('change', () => {
      this.onCameraChange({
        distance: this.controls.getDistance(),
        polarAngle: MathUtils.radToDeg(this.controls.getPolarAngle()),
        azimuthalAngle: MathUtils.radToDeg(this.controls.getAzimuthalAngle()),
        x: this.camera.position.x,
        y: this.camera.position.y,
        z: this.camera.position.z
      })
    })

    this.onCameraChange({
      distance: this.controls.getDistance(),
      polarAngle: MathUtils.radToDeg(this.controls.getPolarAngle()),
      azimuthalAngle: MathUtils.radToDeg(this.controls.getAzimuthalAngle()),
      x: this.camera.position.x,
      y: this.camera.position.y,
      z: this.camera.position.z
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

        model.traverse((obj) => {
          // eslint-disable-next-line no-console
          console.log('Name:', obj.name, 'Type:', obj.type)

          // If scene has a camera use its position
          if (obj.name === 'camera') {
            // eslint-disable-next-line no-console
            console.log('Camera pos:', obj.position)
            this.camera.position.set(
              obj.position.x,
              obj.position.y,
              obj.position.z
            )

            if (obj.children.length > 0 && obj.children[0].userData !== null) {
              const userData = obj.children[0].userData

              if (userData.minDistance) {
                this.controls.minDistance = userData.minDistance * 2
              }

              if (userData.maxDistance) {
                this.controls.maxDistance = userData.maxDistance * 2
              }
            }

            this.controls.saveState()
            this.controls.update()
          }

          // Setup shadows
          if (obj.isMesh) {
            obj.castShadow = this.castShadow
            obj.receiveShadow = this.castShadow

            if (obj.material.map) {
              obj.material.map.anisotropy = 16
            }
          }

          if (obj.name === 'directional_shadow') {
            obj.children[0].castShadow = this.castShadow
            // obj.children[0].shadow.mapSize.width = 1024 * 2
            // obj.children[0].shadow.mapSize.height = 1024 * 2
            // obj.children[0].shadow.camera.near = 0.5
            // obj.children[0].shadow.camera.far = 1000
            // obj.children[0].shadow.camera.top = 100
            // obj.children[0].shadow.camera.left = 100
            // obj.children[0].shadow.camera.bottom = -100
          }

          // Add helpers
          if (this.showHelpers) {
            switch (obj.type) {
              case 'DirectionalLight':
                this.scene.add(new DirectionalLightHelper(obj, 5, 0x000000))

                if (obj.castShadow) {
                  this.scene.add(new CameraHelper(obj.shadow.camera))
                }
                break
              case 'PointLight':
                // this.scene.add(new PointLightHelper(obj, 5))
                break
            }
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
