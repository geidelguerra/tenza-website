import Vue from 'vue'

// const CUSTOM_PROPERTY_NAME = '__VUE_VISIBLE__'

Vue.use({
  install (Vue) {
    Vue.directive('observe', {
      bind (el, bindings) {
        const callback = bindings?.value?.callback || function () {}

        const targets = [el]

        const observer = new IntersectionObserver(callback, {
          root: bindings?.value?.root,
          rootMargin: bindings?.value?.rootMargin,
          threshold: bindings?.value?.threshold || [0, 0.5, 1]
        })

        targets.forEach(target => observer.observe(target))
      }
    })
  }
})
