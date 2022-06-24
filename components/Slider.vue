<script>
export default {
  props: {
    activeIndex: { type: Number, default: 0 }
  },
  computed: {
    children () {
      if (!this.$slots.default) {
        return []
      }

      return this.$slots.default.filter(node => node.tag !== undefined)
    }
  },
  render (createElement) {
    const children = this.children.map((node, index) => {
      return createElement('div', {
        class: {
          'absolute top-0 left-0 bottom-0 right-0 transition-all duration-[750ms]': true,
          'opacity-0 scale-[0.99]': index !== this.activeIndex,
          'z-10 opacity-100 scale-100': index === this.activeIndex
        }
      }, [node])
    })

    return createElement('div', {
      class: 'relative overflow-hidden'
    }, children)
  }
}
</script>
