import Vue from 'vue'

const CUSTOM_PROPERTY_NAME = '__VUE_CLICK_OUTSIDE__'

const noop = function () {}

Vue.use({
  install (Vue) {
    Vue.directive('click-outside', {
      bind (el, binding) {
        const cb = binding?.value?.callback || noop

        const listener = (event) => {
          if (el !== event.target && !el.contains(event.target)) {
            cb(event)
          }
        }

        window.addEventListener('click', listener)

        const cleanup = () => {
          window.removeEventListener('click', listener)
        }

        el[CUSTOM_PROPERTY_NAME] = { cleanup }
      },
      unbind (el) {
        if (el[CUSTOM_PROPERTY_NAME].cleanup !== undefined) {
          el[CUSTOM_PROPERTY_NAME].cleanup()
        }

        delete el[CUSTOM_PROPERTY_NAME]
      }
    })
  }
})
