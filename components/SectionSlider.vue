<script>
import Slider from '~/components/Slider.vue'

export default {
  components: { Slider },
  props: {
    transitionName: {
      type: String,
      default: 'section'
    },
    reverseTransitionName: {
      type: String,
      default: 'section-reverse'
    },
    transitionMode: {
      type: String,
      default: 'in-out'
    }
  },
  data () {
    return {
      activeSlideIndex: 0,
      transitioning: false
    }
  },
  computed: {
    slides () {
      return this.$slots.default.filter(node => node.tag !== undefined)
    },
    numberOfSlides () {
      return this.slides.length
    }
  },
  mounted () {
    document.addEventListener('wheel', this.onMouseWheel)
    document.addEventListener('keyup', this.onKeyUp)
  },
  beforeDestroy () {
    document.removeEventListener('wheel', this.onMouseWheel)
    document.removeEventListener('keyup', this.onKeyUp)
  },
  methods: {
    goToSlide (n) {
      if (this.transitioning || n < 0 || n >= this.numberOfSlides) {
        return
      }

      this.activeSlideIndex = n
    },
    onMouseWheel (event) {
      if (event.deltaY > 0) {
        this.goToSlide(this.activeSlideIndex + 1)

        return
      }

      this.goToSlide(this.activeSlideIndex - 1)
    },
    onKeyUp (event) {
      if (['ArrowDown', 'PageDown', ' '].includes(event.key)) {
        this.goToSlide(this.activeSlideIndex + 1)
      }

      if (['ArrowUp', 'PageUp'].includes(event.key)) {
        this.goToSlide(this.activeSlideIndex - 1)
      }
    }
  },
  render (createElement) {
    const self = this

    return createElement('Slider', {
      props: {
        activeSlideIndex: this.activeSlideIndex,
        transitionName: this.transitionName,
        reverseTransitionName: this.reverseTransitionName,
        transitionMode: this.transitionMode
      },
      on: {
        transitionStarted () {
          self.transitioning = true
        },
        transitionEnded () {
          self.transitioning = false
        }
      }
    }, this.$slots.default)
  }
}
</script>
