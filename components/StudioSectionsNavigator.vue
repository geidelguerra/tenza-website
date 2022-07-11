<template>
  <div class="lg:h-[452px] flex">
    <ul class="w-full text-right lg:pr-[52px] flex flex-col justify-between">
      <template v-for="(item, idx) in items">
        <li :key="idx">
          <a
            class="select-none font-bold text-[14px] transition-all duration-200 block hover:text-[#111]"
            :class="hash === `#${item.id}` ? 'text-[#111]' : 'text-[#ccc]'"
            :href="`#${item.id}`"
            @click.prevent="navigate(item.id)"
          >{{ item.dataset.title }}</a>
        </li>
      </template>
    </ul>
    <ProgressBar :progress="progress" />
  </div>
</template>

<script>
import ProgressBar from '~/components/ProgressBar.vue'

export default {
  components: { ProgressBar },
  props: {
    items: { type: Array, default: () => [] }
  },
  data () {
    return {
      hash: null,
      progress: 0,
      observer: null,
      animating: false
    }
  },
  watch: {
    items: 'registerObservables'
  },
  mounted () {
    this.observer = new IntersectionObserver(this.onIntercept, {
      threshold: [0, 0.5, 1]
    })

    this.onPopState()
    this.registerObservables()

    window.addEventListener('popstate', this.onPopState)
  },
  beforeDestroy () {
    window.removeEventListener('popstate', this.onPopState)
  },
  methods: {
    registerObservables () {
      this.observer.disconnect()

      this.items.forEach(item => this.observer.observe(item))
    },
    updateProgress () {
      if (!window.location.hash) {
        this.progress = 0

        return
      }

      const id = window.location.hash.replace(/^#/, '')
      const index = this.items.findIndex(item => item.id === id)

      if (index !== -1) {
        this.progress = index / (this.items.length - 1)
      }
    },
    updateURL (id) {
      window.history.replaceState(null, null, id ? `#${id}` : window.location.pathname)

      this.onPopState()
    },
    navigate (id) {
      const element = document.getElementById(id)

      if (element) {
        this.animating = true

        const self = this

        this.$scroll(document.scrollingElement, {
          scrollTop: element.offsetTop + element.offsetHeight,
          complete () {
            self.animating = false
          }
        })
      }

      this.updateURL(id)
    },
    onPopState () {
      this.hash = window.location.hash
      this.updateProgress()
    },
    onIntercept (entries) {
      if (this.animating) {
        return
      }

      while (entries.length > 0) {
        const entry = entries.shift()

        if (entry.intersectionRatio >= 0.5) {
          this.updateURL(entry.target.id)

          return
        }
      }
    }
  }
}
</script>
