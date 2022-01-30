<template>
  <div class="overflow-hidden" @mousewheel="onMouseWheel">
    <slot />
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
    syncToRoute: Boolean
  },
  data () {
    return {
      observer: null,
      activeElement: null,
      isScrolling: false
    }
  },
  computed: {
    activeElementIndex () {
      return this.elements.findIndex(elm => elm === this.activeElement)
    },
    elements () {
      const elementSelector = this.elementSelector

      if (elementSelector instanceof Function) {
        return this.$slots.default.filter(elementSelector)
      }

      return this.$slots.default.filter(node => node.tag !== undefined).map(node => node.elm)
    },
    numberOfElements () {
      return this.elements.length
    }
  },
  watch: {
    activeElement (val) {
      if (this.syncToRoute) {
        window.location = `#${val.id}`
      }

      this.$emit('activeElementChanged', val, this.activeElementIndex, this.numberOfElements)
    },
    '$route.hash': 'handleRouteChange'
  },
  mounted () {
    this.createObserver()
    this.handleRouteChange()
  },
  methods: {
    handleRouteChange () {
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

      this.$scroll(this.$el, {
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
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.activeElement = entry.target

          // eslint-disable-next-line no-useless-return
          return
        }
      })
    },
    onMouseWheel (event) {
      if (this.isScrolling) {
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
