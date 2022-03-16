<script>
export default {
  props: {
    tag: { type: String, default: 'div' },
    text: { type: [String, Number], default: null },
    mode: { type: String, default: 'line' },
    duration: { type: Number, default: 1000 },
    delay: { type: Number, default: 0 },
    easing: { type: String, default: 'easeInOutCubic' },
    offsetTime: { type: [Number, String], default: 0 },
    parameters: {
      type: Object,
      default: () => ({
        translateY: ['100%', 0]
      })
    },
    animateOnMounted: { type: Boolean, default: true },
    animateOnUpdate: { type: Boolean, default: true },
    animateOnVisibility: { type: Boolean, default: false },
    animateOnce: { type: Boolean, default: false },
    visibilityRoot: { type: [Element, String], default: null }
  },
  emits: ['started', 'ended'],
  data () {
    return {
      animated: false
    }
  },
  watch: {
    text () {
      if (this.animateOnUpdate) {
        this.$nextTick(() => this.animate())
      }
    }
  },
  mounted () {
    if (this.animateOnMounted) {
      this.animate()
    }

    const observer = new IntersectionObserver(this.handleInterception, {
      root: this.visibilityRoot
    })

    observer.observe(this.$el)
  },
  methods: {
    animate () {
      const timeline = this.$anime.timeline({
        duration: this.duration,
        delay: this.delay,
        easing: this.easing,
        begin: () => {
          this.$emit('started')
        },
        complete: () => {
          this.animated = true
          this.$emit('ended')
        }
      })

      const targets = this.$el.querySelectorAll('[data-item="true"]')

      targets.forEach((target, i) => {
        timeline.add({ ...this.parameters, targets: target }, this.offsetTime)
      })
    },
    handleInterception (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (this.animateOnVisibility && !this.animated) {
            this.animate()
          }
        }
      })
    }
  },
  render (createElement) {
    let splitSeparator = '<br>'

    if (this.mode === 'word') {
      splitSeparator = ' '
    }

    if (this.mode === 'char') {
      splitSeparator = ''
    }

    const htmlTextElements = this.text
      ? (this.text).toString().split(splitSeparator).map((part, i) => {
          return createElement('div', { class: 'overflow-hidden' }, [createElement('div', { attrs: { 'data-item': true } }, [part])])
        })
      : []

    return createElement(this.tag, this.$attrs, htmlTextElements)
  }
}
</script>
