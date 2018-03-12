module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' },
      { rel: 'preconnect', href: 'https://www.strava.com/login' }
    ]
  },
  router: {
    base: "/"
  },
  /*
  ** Global CSS
  */
  css: ['~/assets/css/main.css'],
  /*
  ** Add axios globally
  */
  build: {
    vendor: ['axios','vuetify','vue-table-component'],
    extractCSS: true,
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
       if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      } 
    }
  },

  plugins: [
      {src: '~plugins/vuetify'},
      {src: '~plugins/tableComponent.js', ssr: false},
      {src: '~plugins/tabsComponent.js', ssr: false}
      ],
  /*
  ** Load Vuetify CSS globally
  */
  css: ['~/assets/css/app.styl']
  
}

