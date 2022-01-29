<script>
export default {
  props: {
    activeSlideIndex: {
      type: Number,
      default: 0
    },
    transitionName: {
      type: String,
      required: true
    },
    reverseTransitionName: {
      type: String,
      default: null
    },
    transitionMode: {
      type: String,
      default: 'in-out'
    }
  },
  data () {
    return {
      internalTransitionName: this.transitionName
    }
  },
  computed: {
    activeSlide () {
      return this.activeSlideIndex >= 0 && this.activeSlideIndex < this.numberOfSlides ? this.slides[this.activeSlideIndex] : null
    },
    slides () {
      if (!this.$slots.default) {
        return []
      }

      return this.$slots.default.filter(node => node.tag !== undefined)
    },
    numberOfSlides () {
      return this.slides.length
    }
  },
  watch: {
    activeSlideIndex (val, oldVal) {
      if (this.reverseTransitionName) {
        this.internalTransitionName = val > oldVal ? this.transitionName : this.reverseTransitionName
      }
    }
  },
  render (createElement) {
    const self = this

    const slides = this.slides.map((node, index) => {
      return createElement('div', {
        key: index,
        class: 'absolute top-0 left-0 w-full h-full'
      }, [node])
    }).filter((node, index) => index === this.activeSlideIndex)

    return createElement('transition', {
      props: {
        name: this.internalTransitionName,
        mode: this.transitionMode
      },
      on: {
        beforeEnter (event) {
          self.$emit('transitionStarted')
        },
        afterEnter (event) {
          self.$emit('transitionEnded')
        }
      }
    }, slides)
  }
}
</script>
