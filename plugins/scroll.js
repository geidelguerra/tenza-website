import Vue from 'vue'

Vue.use({
  install (app) {
    app.prototype.$scroll = function (target, options = {}) {
      app.$tween()
    }
  }
})
