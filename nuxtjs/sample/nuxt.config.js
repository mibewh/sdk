const pkg = require('./package');
// Reset this to allow server renderer to work
window = undefined;
var gitanaConfig = require('./gitana.json');


module.exports = {
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
      { src: "/js/bootstrap.min.js" },
      { src: "/js/bootstrap-hover-dropdown.min.js" },
      { src: "/js/echo.min.js" },
      { src: "/js/jquery.easing.min.js" },
      { src: "/js/wow.min.js" },
      { src: "/js/bootstrap-select.min.js" },
      { src: "/js/jquery-ui.min.js" },
      { src: "/js/scripts.js" },

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
    "@/static/css/main.css",
    "@/static/css/green.css",
    "@/static/css/animate.min.css",
    "@/static/css/elegant-fonts.css",
    "@/static/css/custom.css"
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
    ['cloudcms-nuxt', gitanaConfig]
  ],

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

  // hooks: {
  //   generate: {
  //     page({route, path, html}) {
  //
  //       var i = html.indexOf("data-node-id");
  //       if (i > -1)
  //       {
  //         var text = html.substring(i + 12);
  //         var i1 = text.indexOf("\"");
  //         var i2 = text.substring(i1 + 1).indexOf("\"");
  //         var nodeId = text.substring(i1 + 1, i2);
  //
  //         console.log("The page: " + path + " depends on a node ID: " + nodeId);
  //       }
  //     },
  //     done(nuxt, errors) {
  //       console.log('done');
  //     }
  //   },
  // },

  env: {
    //baseCDNurl: process.env.baseCDNurl || "http://localhost:2999",
    repositoryId: process.env.repositoryId ||  "8acd8b0c0b5c0beef7a0",
    branchId: process.env.branchId || "master"
  },
}
