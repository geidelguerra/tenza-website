import Vue from 'vue'

const PREFIX = '__TENZA_WEBSITE_LISTENERS__'

const listen = (selector, cb) => {
  let total = 0
  let count = 0

  const listener = (event) => {
    count++
    cb(count, total, event)
  }

  document.querySelectorAll(selector).forEach((node) => {
    if (node instanceof HTMLImageElement) {
      node[PREFIX + 'load'] = listener
      node.addEventListener('load', listener)
      total++
    }
  })
}

const clearListeners = (selector) => {
  document.querySelectorAll(selector).forEach((node) => {
    if (node instanceof Image) {
      const listener = node[PREFIX + 'load']

      if (!listener) {
        return
      }

      node.removeEventListener('load', listener)
    }
  })
}

Vue.use({
  install (Vue) {
    Vue.prototype.$images = { listen, clearListeners }
  }
})
