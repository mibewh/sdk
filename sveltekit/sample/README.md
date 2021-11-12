# SvelteKit Static Sample Site Example

This is an sample website which uses Cloud CMS as a data source and generates a static web site.  The static site
can either be run by itself on a static server, through the svelte development server, or [adapted to your environment](https://kit.svelte.dev/docs#adapters).

Finally, this sample demonstrates how to automatically track Page Renditions at build time.  Page Renditions record
which pieces of content are rendered on which pages.  This allows your editors to make changes to content and
see how to appears on different places within the web site.

This example is not intended for production use, but rather to demonstrate how Cloud CMS might integrate with your
own SvelteKit applications.

## Prerequisites

1. Run `npm install` within your `sveltekit/sample` directory.

## Configuration

Go into your `sveltekit/sample` directory and do the following.

1. Add your `gitana.json` file. For information on how to retrieve this see: https://www.cloudcms.com/apikeys.html

## Run

To run Sveltekit with a development server, run `npm run dev`. This will serve at http://localhost:3000

To make a static build, run `npm run build`. You can then run the sveltekit static server for the generated `build/` directory with `npm run preview`, which will serve at http://localhost:3000

## Preview Mode

This sample site provides means to instantly preview your Cloud CMS content as you make changes.f

If running Sveltekit on a server, you can provide the following query paramters to any route:

- repository - optional repository id for content
- branch - optional branch id for content

Doing so will enable preview mode, which will persist for the remainder of the browser session by default via a session cookie. These 
values will override the default repository/branch ids.

Requests that run in Preview Mode will fetch fresh content from the Cloud CMS API.  
This allows your editorial users to preview changes to their content on the live web site.


If you wish to preview a different working branch (such as an editorial draft branch), you can supply the `branch`
identifier like this:

```
http://localhost:3000?branch={{branch.id}}
```

Where `branch.id` is the ID of the branch you wish to preview.

## Page Renditions

When you run `npm run build`, the build process will automatically connect to your Cloud CMS Application and will populate Page Renditions for you for all prerendered pages. The rendition urls
generated in cloudcms default to having a base url `localhost`: to override this, add a `basePageUrl` like `http://localhost:3000` to your `gitana.json` file. 

When your Editors click "Preview" on a piece of content, they will be able to see all of the places in the web site
where that piece of content appears.  They can then navigate to the site using instant preview to see their changes
in place.