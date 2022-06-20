import Vue from 'vue'

// const CUSTOM_PROPERTY_NAME = '__VUE_VISIBLE__'

Vue.use({
  install (Vue) {
    Vue.directive('observer', {
      bind (el, bindings) {
        const callback = bindings?.value?.callback || function (entries) {}

        const targets = (bindings?.value?.targets || [])

        const observer = new IntersectionObserver(callback, {
          root: bindings?.value?.root,
          rootMargin: bindings?.value?.rootMargin,
          threshold: bindings?.value?.threshold
        })

        targets.forEach(target => observer.observe(target))
      }
    })
  }
})
