const pkg = require('./package')
const axios = require('axios');


module.exports = {
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
    script: [
      { src: "https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.0/jquery.min.js" },
      { src: "/assets/js/bootstrap.min.js" },
      { src: "/assets/js/bootstrap-hover-dropdown.min.js" },
      { src: "/assets/js/echo.min.js" },
      { src: "/assets/js/jquery.easing.min.js" },
      { src: "/assets/js/wow.min.js" },
      { src: "/assets/js/bootstrap-select.min.js" },
      { src: "/assets/js/jquery-ui.min.js" },
      { src: "/assets/js/scripts.js" },

    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: "stylesheet", href: "http://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300italic,400italic,500italic,500,700,700italic,900,900italic" },
      { rel: "stylesheet", href: "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" },
      { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.9.4/css/bootstrap-select.min.css" },
      { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.0/jquery-ui.min.css" },
      { rel: "stylesheet", href: "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    "@/assets/css/main.css",
    "@/assets/css/green.css",
    // "@/assets/css/bootstrap.min.css",
    // "@/assets/css/bootstrap-select.min.css",
    // "@/assets/css/font-awesome.min.css",
    // "@/assets/css/owl.carousel.css",
    // "@/assets/css/owl.transitions.css",
    "@/assets/css/animate.min.css",
    // "@/assets/css/jquery-ui.min.css",
    "@/assets/css/elegant-fonts.css",
    "@/assets/css/custom.css"
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    baseURL: 'http://localhost:2999'
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      
    }
  },

  generate: {
    routes: function() {
      return axios.get('http://localhost:2999/api/books')
        .then(response => {
          var bookList = Object.values(response.data);
          return bookList.map(book => '/book/' + book._doc);
        });
    }
  }
}
