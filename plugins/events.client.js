import Vue from 'vue'

Vue.use({
  install (Vue) {
    Vue.prototype.$events = {
      listenAll (selector, eventName, cb) {
        const elements = Array.from(document.querySelectorAll(selector))

        let count = 0

        elements.forEach((el) => {
          el.addEventListener(eventName, (event) => {
            count++

            cb(count, elements.length, el, event)
          })
        })
      }
    }
  }
})
