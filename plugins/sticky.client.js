import Vue from 'vue'
import debounce from 'lodash/debounce'

const CUSTOM_PROPERTY_NAME = '__VUE_STICKY__'

Vue.use({
  install (Vue) {
    Vue.directive('sticky', {
      bind (el) {
        const target = window

        const defaultStylePositionValue = el.style.position

        const listener = debounce(() => {
          const scrollTop = document.scrollingElement.scrollTop

          if (scrollTop >= el.offsetHeight) {
            el.style.position = 'fixed'
          } else {
            el.style.position = defaultStylePositionValue
          }
        }, 1)

        target.addEventListener('scroll', listener, true)

        const cleanup = () => {
          el.style.position = defaultStylePositionValue
          target.removeEventListener('scroll', listener, true)
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
