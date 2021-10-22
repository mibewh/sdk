# Nuxt JS Static Sample Site Example

This is an example website which uses Cloud CMS as a data source and generates a static site. It relies on the Cloud CMS App Server as a CDN to serve images, but this can be replaced with your own cdn.

To run, in the nuxtjs/sample directory:
1. Add your `gitana.json` file. For information on how to retrieve this see: https://www.cloudcms.com/apikeys.html
2. Run `npm install`
3. Run `npm install http-server -g`
4. Run `npm install nuxt-cli -g`
5. Run `nuxt generate` to generate your static site
7. Switch to the `dist` directory, and run `http-server`.
8. Navigate to http://localhost:8081

This example is not intended for production use, but rather to demonstrate how Cloud CMS might integrate with your Nuxt JS application.