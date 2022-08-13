import Vue from 'vue'
import debounce from 'lodash/debounce'

const CUSTOM_PROPERTY_NAME = '__VUE_SCROLL__'

const noop = function () {}

Vue.use({
  install (Vue) {
    Vue.directive('scroll', {
      bind (el, binding) {
        const cb = binding?.value?.onScroll || noop

        const listener = debounce(() => {
          const scrollTop = document.scrollingElement.scrollTop
          const scrollHeight = document.scrollingElement.scrollHeight
          let progress = 0

          if (document.scrollingElement.scrollTop >= el.offsetTop) {
            progress = (document.scrollingElement.scrollTop - el.offsetTop) / (el.scrollHeight - el.offsetTop)
          }

          // console.log(`element  scrollTop: ${el.scrollTop} scrollHeight: ${el.scrollHeight} offsetTop: ${el.offsetTop} offsetHeight: ${el.offsetHeight}`)
          // console.log(`document scrollTop: ${document.scrollingElement.scrollTop} scrollHeight: ${document.scrollingElement.scrollHeight} offsetTop: ${document.scrollingElement.offsetTop} offsetHeight: ${document.scrollingElement.offsetHeight}`)
          // console.log('progress: ', progress)

          cb(scrollTop, scrollHeight, progress)
        }, 10)

        listener()

        window.addEventListener('scroll', listener, true)

        const cleanup = () => {
          window.removeEventListener('scroll', listener, true)
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

    Vue.prototype.$scroll = function (target, options = {}) {
      return this.$anime({
        targets: target,
        scrollTop: options.scrollTop || 0,
        scrollLeft: options.scrollLeft || 0,
        easing: 'easeInOutCubic',
        duration: 1000,
        ...options
      })
    }

    Vue.prototype.$scrollTo = function (target, options = {}) {
      target = document.querySelector(target)

      return this.$anime({
        targets: options.container || document.scrollingElement,
        scrollTop: target.offsetTop,
        easing: 'easeInOutCubic',
        duration: 1000,
        ...options
      })
    }
  }
})
