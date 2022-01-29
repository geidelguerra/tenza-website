import Vue from 'vue'

Vue.use({
  install (Vue) {
    Vue.prototype.$scroll = function (target, { scrollTop, scrollLeft, ...options }) {
      this.$anime({
        targets: target,
        scrollTop,
        scrollLeft,
        easing: 'easeInOutExpo',
        duration: 700,
        ...options
      })
    }
  }
})
