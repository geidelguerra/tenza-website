import { getProjects } from './api'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  ssr: false,

  env: {
    debug: process.env.DEBUG === 'true' || process.env.NODE_ENV !== 'production',
    underConstruction: false
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Tenza Design',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/fonts.css',
    '~/assets/main.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/scroll.client.js',
    '~/plugins/images.client.js',
    '~/plugins/lottiePlayer.client.js',
    '~/plugins/sticky.client.js',
    '~/plugins/observer.client.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/svg',
    // https://github.com/ivodolenc/nuxt-animejs
    'nuxt-animejs',
    '@nuxt/postcss8'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    ['nuxt-rfg-icon', {
      static: true,
      staticPath: '/_favicons/',
      masterPicture: 'static/favicon.jpg'
    }]
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
        'postcss-pxtorem': {
          rootValue: 16,
          unitPrecision: 5,
          propList: [
            '*'
          ],
          selectorBlackList: ['html'],
          replace: true,
          mediaQuery: false,
          minPixelValue: 0,
          exclude: /node_modules/i
        }
      }
    }
  },

  generate: {
    async routes () {
      const routes = []
      const projects = await getProjects()

      projects.forEach((item) => {
        routes.push(`/projects/${item.id}`)
        routes.push(`/projects/${item.id}/model`)
      })

      return routes
    }
  }
}
