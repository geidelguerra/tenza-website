<template>
  <div v-bind="$attrs" class="relative" @mousewheel="onMouseWheel">
    <div ref="container" class="absolute top-0 bottom-0 left-0 right-0 overflow-hidden">
      <slot />
    </div>
    <slot name="nav" v-bind="{activeElement, activeElementIndex, elements, numberOfElements, progress, scrollToElement}" />
  </div>
</template>
<script>
export default {
  props: {
    threshold: {
      type: Number,
      default: 1
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
      activeElement: null,
      isScrolling: false,
      elements: []
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
    '$route.hash': 'handleRouteChange'
  },
  mounted () {
    this.updateElements()
    this.createObserver()
    this.handleRouteChange()
  },
  methods: {
    updateElements () {
      this.elements = Array.from(this.$refs.container.children)
    },
    handleRouteChange () {
      if (!this.syncToRoute) {
        return
      }

      const { path, hash } = this.$route

      if (path === '' || hash === '') {
        return
      }

      const id = hash.trimStart('#')
      const elm = this.elements.find(elm => elm.id === id)

      if (elm) {
        this.scrollToElement(elm)
      }
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
        const nextElement = this.elements[this.activeElementIndex - 1]
        this.scrollToElement(nextElement)
      }
    },
    scrollToNextElement () {
      if (this.activeElementIndex + 1 < this.elements.length) {
        const nextElement = this.elements[this.activeElementIndex + 1]
        this.scrollToElement(nextElement)
      }
    },
    scrollToElement (element) {
      const self = this

      this.$scroll(this.$refs.container, {
        scrollTop: element.offsetTop,
        begin () {
          self.isScrolling = true
        },
        complete () {
          self.isScrolling = false
        }
      })
    },
    onInterception (entries) {
      const activeElements = entries.filter(entry => entry.isIntersecting)

      this.activeElement = activeElements.length > 0 ? activeElements[0].target : null
    },
    onMouseWheel (event) {
      if (this.isScrolling || this.disabled) {
        return
      }

      if (event.deltaY < 0) {
        this.scrollToPreviousElement()

        // eslint-disable-next-line no-useless-return
        return
      }

      if (event.deltaY > 0) {
        this.scrollToNextElement()

        // eslint-disable-next-line no-useless-return
        return
      }
    }
  }
}
</script>
