/* eslint-disable no-console */
import Vue from 'vue'
import { Tween, update } from '@tweenjs/tween.js'

function animate () {
  requestAnimationFrame(animate)

  update()
}

Vue.use({
  install (app) {
    app.prototype.$tween = function (object) {
      return new Tween(object)
    }

    animate()
  }
})
