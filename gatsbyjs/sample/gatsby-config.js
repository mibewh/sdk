const gitanaJson = require('./gitana.json');

module.exports = {
  siteMetadata: {
    title: `Quick Start Books`,
    author: `@cloudcms`,
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
    {
      resolve: `gatsby-source-cloudcms`,
      options: {
        keys: gitanaJson,
        repositoryId: `c517484d30f8f7b4dee8`,
        branchId: `fc0adef08016fa289978`
      }
    }
  ]
}
