import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin'
import pkg from './package'
require('dotenv').config()

export default {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: ['~/assets/style/vuetify.styl'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/vuetify',
    '~/plugins/vee-validate',
    '~/plugins/vue-filter'
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/auth',
    '@nuxtjs/dotenv',
    '@nuxtjs/toast',
    [
      'nuxt-i18n',
      {
        locales: [
          {
            code: 'ja',
            iso: 'ja',
            file: 'ja.js'
          }
        ],
        defaultLocale: 'ja',
        lazy: true,
        langDir: 'locales/'
      }
    ]
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
   ** auth configuration
   */
  auth: {
    redirect: {
      login: '/users/sign_in',
      logout: '/',
      callback: '/users/auth/callback',
      home: '/'
    },
    strategies: {
      doorkeeper: {
        _scheme: '~/lib/auth-module/lib/schemes/oauth2-doorkeeper.js',
        _name: 'doorkeeper',
        authorization_endpoint: `${
          process.env.EXTERNAL_API_BASE_URL
        }/auth/oauth/authorize`,
        access_token_endpoint: `${
          process.env.EXTERNAL_API_BASE_URL
        }/auth/oauth/token`,
        userinfo_endpoint: `${process.env.EXTERNAL_API_BASE_URL}/api/v1/me`,
        scope: [],
        client_id: process.env.DOORKEEPER_CLIENT_ID,
        client_secret: process.env.DOORKEEPER_CLIENT_SECRET
      }
    }
  },

  /*
   ** toast configuration
   */
  toast: {
    position: 'top-right',
    duration: 5000
  },

  /*
   ** Build configuration
   */
  build: {
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ['~assets/style/variables.styl']
      }
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  manifest: {
    name: pkg.name,
    short_name: pkg.name,
    author: pkg.author,
    description: pkg.description,
    lang: 'ja'
  },
  workbox: {
    dev: true
  }
}
