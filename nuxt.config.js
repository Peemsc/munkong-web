import envConfig from './env_config'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'munkongONLINE ขายออนไลน์ระดับพระกาฬ',
    htmlAttrs: {
      lang: 'th'
    },
    meta: [
      { charset: 'utf-8' },
      { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'facebook-domain-verification', content: 'r02wm40w1hw9rm0kitf4ypffqjpgis' },
      { name: 'google-site-verification', content: 'BGppYXl8ms3Jr7tj24_nhbgqU26udm4KesM-rRT3vP8' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', to: '/favicon.ico' },
      // { rel: 'icon', type: 'image/x-icon', to: '/favicon.svg' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap' },
    ],
    script: [
      { src: "/js/jquery-3.4.1.min.js?v=1" },
      { src: "/js/popper.min.js?v=1" },
      { src: "/js/bootstrap.min.js?v=1" },
      { src: "/js/ie11CustomProperties.js?v=1" },
      { src: "/js/wow.js?v=1" },
      {  src:"/js/swiper.js"},
      { src: "/js/jquery.fancybox.js" },
      { src: "/js/jquery.appear.js?v=1" },
      { src: "/js/custom.js?v=1" },
      { src: "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.5.1/gsap.min.js" }
    ]
  },
  env: {
    lineSecretId: process.env.LINE_CHANEL_SECRET ||  "482418910e77395a6a28227d3d8114d0",
    lineClientId: process.env.LINE_CLIEND_ID || '1656831815',
    baseURL: process.env.BASE_URL || 'https://www.munkongonline.com',
    apiURL: process.env.API_URL || 'https://munkong-api.gramick.com',
    midKBANK: process.env.MID_KBANK || '401049990003001',
    publicKeyKBANK: process.env.PUBLIC_KEY_KBANK || 'pkey_test_21252SopN4DgJzxQ9LsvQUzGGSh4dNE3uk8Gj',
    jwtSecret: process.env.JWT_SECRET || 'a61b3ac2ade911ba93a3cb3b25d4889ff8e99e80b98fba4b0a9fb8b1b020033c80222972545c9d05dde2b9eed981981207dd8045fb1f98fc1d7326f71758fe87'
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/bootstrap.min.css',
    // '@/assets/css/animate.css',
    '@/assets/css/swiper.css',
    '@/assets/css/jquery.fancybox.css',
    '@/assets/css/global.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/filter.js' },
    { src: '~/plugins/luxon.js' },
    { src: '~/plugins/vee-validate.js', ssr: true },
    { src: '~/plugins/vue-awesome-swiper', ssr: false },
    { src: '~/plugins/format', ssr: false },
    { src: '~/plugins/vue-datepicker', ssr: false },
    { src: '~/plugins/vue-lazyload', ssr: false},
    { src: '~/plugins/vue-fb-customer-chat.js', ssr: false },
    { src: '~/plugins/gtm', ssr: true},
    // { src: '~/plugins/vue-social-sharing', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/firebase',
    '@nuxtjs/i18n',
    'vue-social-sharing/nuxt',
    '@nuxtjs/gtm',
  ],

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: 'api/customer/auth/login', method: 'post', propertyName: 'data.token' },
          user: { url: 'api/customer/auth/me', method: 'get', propertyName: 'data' },
          logout: false
        }
      }
    },
    redirect: {
      login: '/auth/sign-in',
      logout: '/',
      callback: '/auth/sign-in',
    }
  },

  firebase: {
    config: {
      apiKey: "AIzaSyCCvc1-4xXPHt8i9oDxGhpUn5K8NHT_rlY",
      authDomain: "munkongonline-prod.firebaseapp.com",
      projectId: "munkongonline-prod",
      storageBucket: "munkongonline-prod.appspot.com",
      messagingSenderId: "563452196876",
      appId: "1:563452196876:web:8bd593dee7b38a2d731629",
      measurementId: "G-NKM43J13EL"
    },
    services: {
      auth: true,
    }
  },

  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en.js'
      },
      {
        code: 'th',
        file: 'th.js'
      },
    ],
    lazy: true,
    langDir: '~/lang/',
    defaultLocale: 'th',
  },
  target: 'server',
  server: {
    port: 8080,
    host: '0.0.0.0'
  },

  axios: {
    // proxy: true,
    baseURL: process.env.API_URL || 'https://munkong-api.gramick.com'
    // baseURL: process.env.API_URL || 'http://localhost:3010'
  },



  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vee-validate/dist/rules']
  },

  // Google Tag Manager
  gtm: {
    id: 'GTM-5NTN66R',
    scriptDefer: true,
    pageTracking: true,
  },

  publicRuntimeConfig: {
    gtm: {
      enabled: true, /* see below */
      debug: false,

      id: process.env.GOOGLE_TAG_MANAGER_ID || 'GTM-5NTN66R',
      layer: 'dataLayer',
      variables: {},

      pageTracking: true,
      pageViewEventName: 'nuxtRoute',

      autoInit: true,
      respectDoNotTrack: true,

      scriptId: 'gtm-script',
      scriptDefer: false,
      scriptURL: 'https://www.googletagmanager.com/gtm.js',
      crossOrigin: false,

      noscript: true,
      noscriptId: 'gtm-noscript',
      noscriptURL: 'https://www.googletagmanager.com/ns.html'
    }
  },
}
