import Vue from 'vue'

Vue.use({
  install (Vue) {
    Vue.prototype.$scroll = function (target, { scrollTop, scrollLeft, ...options }) {
      return this.$anime({
        targets: target,
        scrollTop,
        scrollLeft,
        easing: 'easeInOutCubic',
        duration: 1000,
        ...options
      })
    }
  }
})
