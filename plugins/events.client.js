import Vue from 'vue'

Vue.use({
  install (Vue) {
    Vue.prototype.$images = {
      loaded (cb) {
        cb = cb || function () {}

        const images = Array.from(document.querySelectorAll('img'))
        let pendingCount = 0
        let loadedCount = 0

        const updateCount = () => {
          loadedCount++

          if (loadedCount === images.length) {
            cb()
          }
        }

        images.forEach((img, i) => {
          if (img.complete) {
            updateCount()
          } else {
            pendingCount++
            img.addEventListener('load', () => updateCount())
          }
        })

        return pendingCount
      }
    }

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
