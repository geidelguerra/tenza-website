<template>
  <div v-bind="$attrs" class="relative">
    <div
      ref="container"
      class="absolute top-0 bottom-0 left-0 right-0 overflow-hidden"
    >
      <slot />
    </div>
    <slot name="nav" v-bind="{activeElement, activeElementIndex, elements, numberOfElements, progress, scrollToElement}" />
  </div>
</template>
<script>
export default {
  props: {
    threshold: {
      type: [Number, Array],
      default: () => ([0, 0.5, 1])
    },
    elementSelector: {
      type: [Function],
      default: null
    },
    syncToRoute: Boolean,
    disabled: Boolean
  },
  data () {
    return {
      observer: null,
      targetElement: null,
      activeElement: null,
      isScrolling: false,
      elements: [],
      interceptionEntries: [],
      scrollProgress: 0
    }
  },
  computed: {
    activeElementIndex () {
      return this.elements.findIndex(elm => elm === this.activeElement)
    },
    numberOfElements () {
      return this.elements.length
    },
    progress () {
      return Math.round(this.activeElementIndex * 100 / (this.numberOfElements - 1))
    }
  },
  watch: {
    activeElement (val) {
      if (this.syncToRoute && val) {
        window.location = `#${val.id}`
      }

      this.$emit('activeElementChanged', val, this.activeElementIndex, this.numberOfElements)
    },
    activeElementIndex (val, oldVal) {
      this.$emit('activeIndexChanged', val, oldVal)
    },
    progress (val) {
      this.$emit('block-progress', val)
    }
  },
  mounted () {
    this.updateElements()
    this.createObserver()

    this.registerListeners()
  },
  beforeDestroy () {
    this.removeListeners()
  },
  methods: {
    updateScrollProgress () {
      this.scrollProgress = this.$refs.container.scrollTop / (this.$refs.container.scrollHeight - this.$refs.container.clientHeight)
      this.$emit('progress', this.scrollProgress)
    },
    updateElements () {
      this.elements = Array.from(this.$refs.container.children)
    },
    checkActiveElement () {
      const activeElements = this.interceptionEntries.filter(entry => entry.intersectionRatio >= 0.5)

      this.activeElement = activeElements.length > 0 ? activeElements[0].target : null
    },
    createObserver () {
      this.observer = new IntersectionObserver(this.onInterception, {
        root: this.$el,
        threshold: this.threshold
      })

      this.elements.forEach(elm => this.observer.observe(elm))
    },
    scrollToPreviousElement () {
      if (this.activeElementIndex - 1 > -1) {
        this.scrollToElement(this.elements[this.activeElementIndex - 1])
      }
    },
    scrollToNextElement () {
      if (this.activeElementIndex + 1 < this.elements.length) {
        this.scrollToElement(this.elements[this.activeElementIndex + 1])

        return
      }

      if (this.progress === 100) {
        this.$emit('bottom')
      }
    },
    scrollToFirst () {
      this.scrollToElement(this.elements[0])
    },
    scrollToLast () {
      this.scrollToElement(this.elements[this.elements.length - 1])
    },
    scrollToElement (element) {
      if (this.isScrolling || this.disabled) {
        return
      }

      this.isScrolling = true

      const self = this

      this.$scroll(this.$refs.container, {
        scrollTop: element.offsetTop,
        begin () {
          self.onScrollStarted()
        },
        update (anim) {
          self.updateScrollProgress()
        },
        complete () {
          self.isScrolling = false
          self.onScrollEnded()
        }
      })
    },
    onInterception (entries) {
      this.interceptionEntries = entries

      this.checkActiveElement()
    },
    registerListeners () {
      this.$el.addEventListener('mousewheel', this.onMouseWheel, true)
      document.addEventListener('keyup', this.onKeyUp)
    },
    removeListeners () {
      document.removeEventListener('keyup', this.onKeyUp)
      this.$el.removeEventListener('mousewheel', this.onMouseWheel)
    },
    onMouseWheel (event) {
      if (event.deltaY < 0) {
        this.scrollToPreviousElement()

        return
      }

      if (event.deltaY > 0) {
        this.scrollToNextElement()
      }
    },
    onKeyUp (event) {
      if (['ArrowUp', 'PageUp'].includes(event.key)) {
        this.scrollToPreviousElement()

        return
      }

      if (['ArrowDown', 'PageDown', ' '].includes(event.key)) {
        this.scrollToNextElement()

        return
      }

      if (['Home'].includes(event.key)) {
        this.scrollToFirst()
      }
    },
    onScrollStarted () {
      //
    },
    onScrollEnded () {
      //
    }
  }
}
</script>
