const Gitana = require('gitana');
const apolloLink = require('apollo-link-http');
const fetch = require('node-fetch');

const gitanaConfig = require("./gitana.json");
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
    {
      resolve: `gatsby-source-graphql`,
      options: {
        typeName: "CLOUDCMS",
        fieldName: "cloudcms",
        url: `${appServerUrl}/graphql`
      }
    }
    // For directly connecting to the API:
    //
    // {
    //   resolve: `gatsby-source-graphql`,
    //   options: {
    //     typeName: "CLOUDCMS",
    //     fieldName: "cloudcms",
    //     clientKey: gitanaConfig.clientKey,
    //     clientSecret: gitanaConfig.clientSecret,
    //     username: gitanaConfig.username,
    //     password: gitanaConfig.password,
    //     baseURL: gitanaConfig.baseURL,
    //     application: gitanaConfig.application,
    //     createLink: function(pluginOptions) {
    //       return new Promise(function(resolve, reject) {
    //         Gitana.connect({
    //           "clientKey": pluginOptions.clientKey,
    //           "clientSecret": pluginOptions.clientSecret,
    //           "username": pluginOptions.username,
    //           "password": pluginOptions.password,
    //           "baseURL": pluginOptions.baseURL,
    //           "application": pluginOptions.application
    //         }, function(err) {
    //           if (err) {
    //             reject(err);
    //           }
          
    //           const repository = this.datastore("content")._doc;
    //           const branch = "master";
          
    //           const headers = this.getDriver().getHttpHeaders();
              
    //           resolve(apolloLink.createHttpLink({
    //             uri: `${pluginOptions.baseURL}/repositories/${repository}/branches/${branch}/graphql`,
    //             headers: headers,
    //             fetch
    //           }));
    //         });
    //       });
    //     }
    //   }
    // }
  ]
}
