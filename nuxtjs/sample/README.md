# Nuxt JS Static Sample Site Example

This is an example website which uses Cloud CMS as a data source and generates a static site. 
It relies on the Cloud CMS App Server as a CDN to serve images, but this can be replaced with your own CDN.

## Prerequisites

The following global dependencies should be installed.

1. Run `npm install http-server -g`
2. Run `npm install nuxt -g`

## Building the Sample

Go into your `nuxtjs/sample` directory and do the following.

1. Add your `gitana.json` file. For information on how to retrieve this see: https://www.cloudcms.com/apikeys.html
2. Modify `nuxt.config.js` to use your project's `repositoryId`.
3. Run `npm install`
4. Run `nuxt generate` to generate your static site

## Running the Sample

You can now run your web site:

1. Switch to the `dist` directory, and run `http-server`.
2. Navigate to `http://localhost:8081`

This example is not intended for production use, but rather to demonstrate how Cloud CMS might integrate with your Nuxt JS application.
