# Nuxt JS Static Sample Site Example

This is an sample website which uses Cloud CMS as a data source and generates a static web site.  The static site
can either be run by itself or you can run it inside of Nuxt itself.

This sample further demonstrates how to utilize Preview Mode to allow your editors to preview changes to content
on their editoiral branches.

Finally, this sample demonstrates how to automatically track Page Renditions at build time.  Page Renditions record
which pieces of content are rendered on which pages.  This allows your editors to make changes to content and
see how to appears on different places within the web site.

This example is not intended for production use, but rather to demonstrate how Cloud CMS might integrate with your
own Nuxt JS applications.

## Prerequisites

We recommend using the latest LTS for Node.js, as recommended by Nuxt.
To build this sample, you will need to have Nuxt.js installed.

1. Run `npm install nuxt -g` to install Nuxt globally.
2. Run `npm install` within your `nuxtjs/sample` directory.

## Configuration

Go into your `nuxtjs/sample` directory and do the following.

1. Add your `gitana.json` file. For information on how to retrieve this see: https://www.cloudcms.com/apikeys.html


## Running the Sample (Static)

To run your static site using Nuxt's server, run the following:

```
nuxt generate
nuxt start
```

Now open a browser to `http://localhost:3000`.

## Running the Sample (with  Server)

You can also build your nuxt site to be run on a dynamic server. This is required when using preview mode (see below) and in order for new content changes to be seen without rebuilding the site.

To run the dev server, just run `nuxt`

To build and run, do: 

```
nuxt build
nuxt start
```

## Integration to Cloud CMS

### Cloud CMS Nuxt Module

This sample site pulls in the [https://github.com/gitana/cloudcms-nuxt](Cloud CMS Nuxt Module) to provide build and
render time integration to the Cloud CMS API.

### Cloud CMS JavaScript Driver

The Cloud CMS Nuxt Module instantiates the [https://github.com/gitana/cloudcms-javascript-driver](Cloud CMS JavaScript Driver)
using the credentials provided in your `gitana.json` file.  This driver is then available to your Nuxt files via the
`context.$cloudcms` variable. You also get access to `context.$branch`, which is an object representing your current project branch (default is master). 
You can change the branch by adding a `branchId` to your project.

## Preview Mode

This sample site supports Nuxt's Preview Mode via the Cloud CMS Nuxt Module. 

If you run this sample site using `nuxt start`, then you have the optional to make requests that run in "Preview Mode".  
Requests that run in Preview Mode will fetch fresh content from the Cloud CMS API.  
This allows your editorial users to preview changes to their content on the live web site.

To enable Preview Mode, you simple add the `preview` request parameter, like this:

```
http://localhost:3000?preview
```

The request will store a cookie into the browser called `cms_preview`.  This puts the browser session itself into
preview mode such that any further clicks will be retrieved in preview mode as well.

If you wish to preview a different working branch (such as an editorial draft branch), you can supply the `branch`
identifier like this:

```
http://localhost:3000?preview&branch={{branch.id}}
```

Where `branch.id` is the ID of the branch you wish to preview.

Cloud CMS provides editorial integration from workspaces to preview servers.  As such, this sample site can be configured
as a Cloud CMS Preview Endpoint using the URL as shown.

```
http://localhost:3000?preview&branch={{branch.id}}
```

When preview mode is enabled, variables `repositoryId` and `branchId` become available in your context, and the `cloudcms-nuxt` plugin
will automatically switch to the preview branch, so that new content will be queried when rendering your application.

You can configure cloudcms to provide preview links by setting up a  [preview server](https://www.cloudcms.com/documentation/publishing/preview-servers.html)! 
Follow the instructions to setup a URL preview server with http://localhost:3000 as the url, then when you click "View On [My Server]" above a content item, you can view how that content will look in-context on your site.

