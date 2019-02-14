const Gitana = require('gitana');
const apolloLink = require('apollo-link-http');
const fetch = require('node-fetch');

const appServerUrl = "http://localhost:2999";

module.exports = {
  siteMetadata: {
    title: `Quick Start Books`,
    author: `@cloudcms`,
    baseCDNURL: appServerUrl
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      }
    },
    // {
    //   resolve: `gatsby-source-graphql`,
    //   options: {
    //     typeName: "CLOUDCMS",
    //     fieldName: "cloudcms",
    //     url: `${appServerUrl}/graphql`
    //   }
    // }
    {
      resolve: `gatsby-source-graphql`,
      options: {
        typeName: "CLOUDCMS",
        fieldName: "cloudcms",
        clientKey: "ceb5b58e-a28e-407c-9e56-5e4b61ae4173",
        clientSecret: "6X0yq+xqEEFa9Sf+DYo14HKB3JKXqOOIFXRXHp+kwn25MgpY6bpwk4c+X0kJJev1IobQdRrfuAGHTxZ0xEw5lcsbPZsCeF9AKB/Xpg3miHU=",
        username: "be3816d9-1dc4-40de-a20b-583377dfade7",
        password: "HeOU50XOZ5d/ItRpeFY20GQtPgLbY1ebvQrjdDFshIcYqwHHYylLgjNe6WM/zf7352lP0i0WLq42sSMyiof9eqqVy/y1MqHQ/6ifqYk3lyI=",
        baseURL: "http://localhost:8080",
        application: "91ab3ab369cd2c16e022",
        createLink: function(pluginOptions) {
          return new Promise(function(resolve, reject) {
            Gitana.connect({
              "clientKey": pluginOptions.clientKey,
              "clientSecret": pluginOptions.clientSecret,
              "username": pluginOptions.username,
              "password": pluginOptions.password,
              "baseURL": pluginOptions.baseURL,
              "application": pluginOptions.application
            }, function(err) {
              if (err) {
                reject(err);
              }
          
              const repository = this.datastore("content")._doc;
              const branch = "master";
          
              const headers = this.getDriver().getHttpHeaders();
              
              resolve(apolloLink.createHttpLink({
                uri: `${pluginOptions.baseURL}/repositories/${repository}/branches/${branch}/graphql`,
                headers: headers,
                fetch
              }));
            });
          });
        }
      }
    }
  ]
}
